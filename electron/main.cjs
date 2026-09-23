const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 720,
    height: 620,
    minWidth: 480,
    minHeight: 420,
    frame: false,
    alwaysOnTop: true,
    backgroundColor: '#f8fafc',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  mainWindow.setAlwaysOnTop(true, 'floating')
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
