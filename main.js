process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true

const { app, BrowserWindow, nativeImage, shell, ipcMain, ipcRenderer } = require('electron')
const path = require('node:path')
const appIcon = nativeImage.createFromPath('icon.ico')

const appId = 3284610;
const steamworks = require('steamworks.js')
const client = steamworks.init(appId);

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
        resizable: false,
        icon: appIcon,
        nodeIntegration: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js"),
        },
    })

    win.setMenu(null)
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    win.loadFile('index.html');

    ipcMain.on("unlock-achievement", (event, id) => {
        client.achievement.activate(id);
    });

    ipcMain.on('player-name', (event) => {
        event.sender.send('player-name', client.localplayer.getName());
    });

    ipcMain.on("set-status", (event, status) => {
        client.localplayer.setRichPresence('common_current', status.commonCurrent);
        client.localplayer.setRichPresence('common_total', status.commonTotal);
        client.localplayer.setRichPresence('special_current', status.specialCurrent);
        client.localplayer.setRichPresence('special_total', status.specialTotal);
        client.localplayer.setRichPresence('steam_display', "#StatusWithScore");
    });
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit()
})

steamworks.electronEnableSteamOverlay()
