console.log ("content script running")


function getArticleText ()
{
  console.log ("get article text : ")
  const article = document.querySelector("article")
  console.log ("article : ", article)
  if (article)
  { return article.innerText }

  let paragraph = Array.from (document.querySelectorAll("p"))
  console.log ("paragraph : ", paragraph)
  if (paragraph.length != 0)
  { return paragraph.map (p => p.innerText).join("\n") }

  let div = Array.from (document.querySelectorAll("div"))
  console.log ("div : ",div)
  return div.map (s => s.innerText).join("\n")
}

chrome.runtime.onMessage.addListener ((req, sender, sendResponse) => {
  if (req.type == "GET_ARTICLE_TEXT")
  {
    const text = getArticleText()
    sendResponse ({text})
  }
})
