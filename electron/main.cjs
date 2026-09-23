const { app, BrowserWindow, ipcMain, screen, shell } = require('electron')
const path = require('node:path')

const moveStates = new WeakMap()

function enableAutoLaunch() {
  if (process.platform !== 'win32') return
  app.setLoginItemSettings({
    openAtLogin: true,
    path: process.execPath,
    args: app.isPackaged ? [] : [app.getAppPath()],
  })
}

function createDesktopShortcut() {
  if (process.platform !== 'win32') return
  const target = process.execPath
  shell.writeShortcutLink(path.join(app.getPath('desktop'), 'TaskFlow.lnk'), {
    target,
    args: app.isPackaged ? '' : `"${app.getAppPath()}"`,
    cwd: app.getAppPath(),
    description: 'TaskFlow 桌面任务板',
    icon: target,
    iconIndex: 0,
  })
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 760,
    minWidth: 380,
    minHeight: 480,
    frame: false,
    transparent: true,
    resizable: true,
    show: false,
    skipTaskbar: true,
    backgroundColor: '#00000000',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })

  mainWindow.once('ready-to-show', () => {
    const workArea = screen.getPrimaryDisplay().workArea
    const width = Math.min(Math.max(Math.round(workArea.width / 3), 380), 560)
    mainWindow.setBounds({
      x: workArea.x + workArea.width - width,
      y: workArea.y,
      width,
      height: workArea.height,
    })
    mainWindow.show()
  })
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
}

app.whenReady().then(() => {
  enableAutoLaunch()
  createDesktopShortcut()
  createWindow()
})

ipcMain.on('window-move-start', (event, point) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender)
  if (!targetWindow || !Number.isFinite(point?.x) || !Number.isFinite(point?.y)) return
  const [x, y] = targetWindow.getPosition()
  moveStates.set(targetWindow, { offsetX: point.x - x, offsetY: point.y - y })
})

ipcMain.on('window-move', (event, point) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender)
  const state = targetWindow && moveStates.get(targetWindow)
  if (!state || !Number.isFinite(point?.x) || !Number.isFinite(point?.y)) return
  targetWindow.setPosition(Math.round(point.x - state.offsetX), Math.round(point.y - state.offsetY))
})

ipcMain.on('window-move-end', (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender)
  if (targetWindow) moveStates.delete(targetWindow)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
