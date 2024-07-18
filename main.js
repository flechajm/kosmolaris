const { app, BrowserWindow, nativeImage, shell } = require('electron')

const appIcon = nativeImage.createFromPath('icon.ico')

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
        resizable: false,
        contextIsolation: true,
        icon: appIcon,
    })

    win.loadFile('index.html')
    win.setMenu(null);
    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    app.quit()
})

