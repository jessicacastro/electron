import { app, BrowserWindow, globalShortcut } from 'electron'
import { IPC } from '@shared/constants/ipc'

export const createShortcuts = (window: BrowserWindow) => {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+N', () => {
      window.webContents.send(IPC.DOCUMENTS.CREATE)
    })
  })

  app.on('browser-window-blur', () => {
    globalShortcut.unregisterAll()
  })
}
