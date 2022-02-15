const { app, BrowserWindow, session, shell } = require('electron')
const { ElectronChromeExtensions } = require('electron-chrome-extensions')
require('@electron/remote/main').initialize()
const buildChromeContextMenu = require('electron-chrome-context-menu').default

app.on('ready', () => {
    const win = new BrowserWindow({
        title: "Simple Twitch App",
        width: 1440,
        height: 842,
        session: session.defaultSession,
        webPreferences: {
            webviewTag: true,
            nodeIntegration: true,
            contextIsolation: false,
            nativeWindowOpen: true,
        },
        frame: false,
        icon: __dirname + "/twitch.png",
    })

    require('@electron/remote/main').enable(win.webContents)

    app.on('web-contents-created', async (event, webContents) => {
        const extensions = new ElectronChromeExtensions({
            session: session.defaultSession,
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
    
        extensions.addTab(win.webContents, win)

        session.defaultSession.loadExtension(__dirname + '\\extensions\\BetterTTV')
        session.defaultSession.loadExtension(__dirname + '\\extensions\\Video-Ad-Block--for-Twitch')


        if (webContents.getType() === 'webview') {
            webContents.setWindowOpenHandler(({ url }) => {
                require('electron').shell.openExternal(url)
                return { action: 'deny' }
            })
        }

        webContents.on('context-menu', async (e, params) => {
            const menu = buildChromeContextMenu({
                params,
                webContents,
                openLink: (url, disposition) => {
                    webContents.loadURL(url)
                }
            })
            session.defaultSession.loadExtension(__dirname + '\\extensions\\ublock_origin', { allowFileAccess: true })

            menu.popup()
        })
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    win.loadURL(`file://${__dirname}/twitch.html`)
})