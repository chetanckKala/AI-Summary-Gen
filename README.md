# 📄 AI Summary Generator – Chrome Extension

## 🧠 What is this?

**AI Summary Generator** is a Chrome extension that provides instant, AI-powered summaries of any web article, blog, or news post — right in your browser.

Whether you're researching, skimming news, or reviewing long content, this extension helps you **save time** by giving you a concise summary using **OpenAI GPT**.

---

## ✨ Features

* 🧠 **AI-generated summaries** of online articles
* 📄 Supports blogs, news, essays, documentation, etc.
* ⚡ One-click summarization from the Chrome toolbar
* 🪄 Clean and user-friendly popup UI
* 💾 Saves your previously generated summaries
* 🌐 Works on most websites (HTML-based content)

---

## 📸 How It Works

1. You visit any article or blog.
2. Click on the **AI Summary Generator** icon in the toolbar.
3. The extension reads the main content of the page.
4. It sends the content to the **OpenAI API** (GPT-3.5 or GPT-4).
5. A readable, bullet-style summary appears in the popup.
6. Optionally, you can copy, save, or export the summary.

---

## 🔧 How to Use / Install (Locally)

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer Mode** (top-right corner)
4. Click **"Load Unpacked"** and select the project folder
5. Click the toolbar icon on any article to generate a summary

---

## 🧪 Tech Stack

* **Chrome Extensions API (Manifest V3)**
* **JavaScript (Vanilla)**
* **OpenAI GPT-3.5 / GPT-4 API**
* **DOM scraping & content extraction**
* Optional: `chrome.storage` for local saving

---

## 🧠 Example Output

**Original Article:** 1200 words
**Summary:**

* The author discusses the evolution of web3 technology...
* Key trends include decentralization, blockchain scaling...
* Conclusion: Adoption depends on solving UX and scalability...

---

## 🔐 API Key

To use the OpenAI API:

1. Get your API key from [https://platform.openai.com](https://platform.openai.com)
2. Add it to your project in a `config.js` or inject it using environment variables (for security)
3. **⚠️ Never hardcode your API key in a public GitHub repo!**

---

## 🛠️ Coming Soon

* 📝 Summary formats: bullet, paragraph, headline
* 📚 Save summaries per URL
* 🔄 Retry & refine options
* 🌗 Dark mode popup UI
* 🧑‍💼 Enterprise article parser support (Medium, Substack, Dev.to)

---
