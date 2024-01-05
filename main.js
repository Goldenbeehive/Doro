const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const electronReload = require('electron-reload')
electronReload('./')
const SCREEN_WIDTH = 500
const SCREEN_HEIGHT = 125

const createWindow = () => {
    const win = new BrowserWindow({
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
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
    ipcMain.on('close', () => {
        if (win) {
            win.close();
        }
    });
    ipcMain.on('max', () => {
        if (win) {
            if(win.isMaximized()){
                win.setSize(SCREEN_WIDTH,SCREEN_HEIGHT)
                win.center()
            }else{
                win.maximize();
            }
        }
    });
    ipcMain.on('min', () => {
        if (win) {
            win.minimize();
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