const { app, BrowserWindow, session } = require('electron')
const { ElectronChromeExtensions } = require('electron-chrome-extensions')
require('@electron/remote/main').initialize()


const createWindow = () => {
    const mySession = session.defaultSession
    // mySession.loadExtension(__dirname + '\\extensions\\ublock_origin')
    mySession.loadExtension(__dirname + '\\extensions\\BetterTTV')

    const extensions = new ElectronChromeExtensions({
        session: mySession,
        createTab(details) {
            // Optionally implemented for chrome.tabs.create support
        },
        selectTab(tab, browserWindow) {
            // Optionally implemented for chrome.tabs.update support
        },
        removeTab(tab, browserWindow) {
            // Optionally implemented for chrome.tabs.remove support
        },
        createWindow(details) {
            // Optionally implemented for chrome.windows.create support
        }
    })

    const win = new BrowserWindow({
        title: "Simple Twitch App",
        width: 1440,
        height: 842,
        session: mySession,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false,
        },
        frame: false,
        icon: __dirname + "/twitch.png",
    })

    // win.setMenu(null)

    extensions.addTab(win.webContents, win)
    require('@electron/remote/main').enable(win.webContents)

    // win.loadURL("https://www.twitch.tv") //https://chrome.google.com/webstore/detail/betterttv/ajopnjidmegmdimjlfnijceegpefgped
    win.loadURL(`file://${__dirname}/twitch.html`)
}

app.whenReady().then(() => {
    createWindow()
})