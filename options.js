document.addEventListener ("DOMContentLoaded", ()=>
{
    console.log ("option script running")
    chrome.storage.sync.get (["apiKey"], (result) =>
    {
        if (result)
            document.querySelector("#apiKey").value = result.apiKey
    })

    let form = document.querySelector ("#apiForm")

    form.addEventListener ("submit", (e)=>
    {
        e.preventDefault()
        let apiKey = document.querySelector ("#apiKey").value.trim()

        if (!apiKey)
            return;

        chrome.storage.sync.set ({apiKey: apiKey}, () =>
        {
            console.log ("api key saved")
            document.querySelector ("#msg").style.display = "block"
            setTimeout(() => window.close(), 1000)
        })
    })
})