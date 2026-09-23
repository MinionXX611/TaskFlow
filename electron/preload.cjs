const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('desktopWindow', {
  startMove(point) {
    ipcRenderer.send('window-move-start', point)
  },
  move(point) {
    ipcRenderer.send('window-move', point)
  },
  endMove() {
    ipcRenderer.send('window-move-end')
  },
})
