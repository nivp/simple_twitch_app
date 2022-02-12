const { app, BrowserWindow, session } = require('electron')
const { ElectronChromeExtensions } = require('electron-chrome-extensions')
require('@electron/remote/main').initialize()
const buildChromeContextMenu = require('electron-chrome-context-menu').default


const createWindow = () => {
    const mySession = session.defaultSession
    // mySession.loadExtension(__dirname + '\\extensions\\ublock_origin', { allowFileAccess: true })
    mySession.loadExtension(__dirname + '\\extensions\\BetterTTV')//Video-Ad-Block--for-Twitch
    mySession.loadExtension(__dirname + '\\extensions\\Video-Ad-Block--for-Twitch')

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
        },
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

app.on('web-contents-created', (event, webContents) => {
    webContents.on('context-menu', (e, params) => {
        const menu = buildChromeContextMenu({
            params,
            webContents,
            openLink: (url, disposition) => {
                webContents.loadURL(url)
            }
        })

        menu.popup()

        const mySession = session.defaultSession
        mySession.loadExtension(__dirname + '\\extensions\\ublock_origin', { allowFileAccess: true })
    })
})