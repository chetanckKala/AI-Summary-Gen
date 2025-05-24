let generate = document.querySelector ("#gen")
let copy = document.querySelector ("#copy")
let result = document.querySelector ("#summary")


generate.addEventListener ("click", () =>
{
    let summaryOption = document.querySelector ("#summaryOptions").value 
    result.style.display = "block"
    
    // 1 -> get user's api key
    chrome.storage.sync.get (["apiKey"], (response1)=>
    {
        if (!response1)
        {
            result.textContent = "Go to options and add Gemini API Key"
            return
        }

        // 2 -> ask content.js for page text
        chrome.tabs.query ({active : true, currentWindow : true}, (tabs) =>
        {
            chrome.tabs.sendMessage (
            tabs[0].id, 
            {type : "GET_ARTICLE_TEXT"}, 
            async (response2) =>
            {
                if (!response2)
                {
                    result.textContent = "No text available"
                    return
                }
                
                // 3 -> send text and options to background.js
                try {
                    result.textContent = "Generating summary...";
                    let summary = await getSummary (response2.text, summaryOption, response1.apiKey)
                    const summaryFormat = formatGeminiResponse (summary)
                    result.innerHTML = summaryFormat
                }

                catch (err) { result.textContent = "Gemini Error : " + err.message}
                
            })
        })
    })
})

copy.addEventListener ("click", ()=>
{
    let summaryText = result.innerTExt

    navigator.clipboard.writeText (summaryText).then (() => {
        copy.innerHTML = `<i class="fa-solid fa-square-check" style="color: #2780c4"></i> Copied!`

        setTimeout(() => {copy.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`}, 1000);
    })
})


function formatGeminiResponse(text) {
    // Escape HTML special characters
    const escapeHTML = str => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    let html = escapeHTML(text);

    // Convert Markdown-style bold (**text**) to <strong>text</strong>
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Bold labels like "Main Focus:", "Key Points:", etc.
    html = html.replace(/^([ \t]*)([\w\s]+?):/gm, '$1<strong>$2:</strong>');

    // Convert lines starting with "-" or "*" into list items
    html = html.replace(/^\s*[\-\*]\s+(.*)$/gm, '<li>$1</li>');

    // If <li> tags exist, wrap them in <ul>
    if (html.includes('<li>')) {
        html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    }

    // Convert double newlines into paragraph breaks
    html = html.replace(/\n\s*\n/g, '</p><p>');

    // Replace remaining newlines with line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
}

async function getSummary (text, type, apiKey)
{   
    console.log (type)
    const promptMap = {
        brief :    `Provide a brief summary of the text in 3-4 lines : \n\n${text}  `,
        detailed : `Provide a detailed summary of the text : \n\n${text}   `,
        bullet :   `Provide a summary of the text in 5-7 bullet points, start each point with a '-'  : \n\n${text}  `
    }

    const prompt = promptMap[type] || promptMap.brief

    console.log (apiKey)

    const res = await fetch( `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify ({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })


    if (!res.ok)
    {
        let error = await res.json()
        console.log (error)
        return error
    }

    const data = await res.json();

    // console.log (data)
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}