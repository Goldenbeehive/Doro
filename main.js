const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const electronReload = require('electron-reload')
electronReload('./')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
    ipcMain.on('focus', () => {
        if (win) {
            win.focus();
        }
    });

}


app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})