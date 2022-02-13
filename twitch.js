document.body.onload = () => {
    let webview = document.getElementById("myWebview")
    console.log(webview)
    let title = document.getElementById("window-title-text")
    webview.addEventListener("load-commit", () => {
        title.innerText = webview.getTitle()
    })
}