document.body.onload = () => {
    let webview = document.getElementById("myWebview")
    let title = document.getElementById("window-title-text")
    const removeCarousel = function () {
        function clearInner(node) {
            while (node.hasChildNodes()) {
                clear(node.firstChild);
            }
        }

        function clear(node) {
            while (node.hasChildNodes()) {
                clear(node.firstChild);
            }
            node.parentNode.removeChild(node);
            console.log(node, "cleared!");
        }

        let carousel = document.getElementsByClassName("front-page-carousel");
        clearInner(carousel?.item(0));
        carousel?.item(0)?.remove();

        let bits = document.body.querySelector("button[data-a-target='top-nav-get-bits-button']")?.parentElement;
        clearInner(bits);
        bits?.remove();
    }.toString().slice(14, -3)

    webview.addEventListener("page-title-updated", () => {
        title.innerText = webview.getTitle()
    })

    webview.addEventListener("dom-ready", () => {
        webview.executeJavaScript(removeCarousel)
    })
}