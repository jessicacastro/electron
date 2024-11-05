import { BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'
import { IPC } from '@shared/constants/ipc'

export const createTray = (window: BrowserWindow) => {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '..', '..', 'resources', 'rotionTemplate.png'),
  )

  const tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Rotion app', enabled: false },
    {
      label: 'Criar novo documento',
      click: () => window.webContents.send(IPC.DOCUMENTS.CREATE),
    },
    { type: 'separator' },
    { label: 'Documentos recentes', enabled: false },
    {
      label: 'Discover',
      accelerator: 'CmdOrCtrl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Ignite',
      accelerator: 'CmdOrCtrl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Backend',
      accelerator: 'CmdOrCtrl+3',
      acceleratorWorksWhenHidden: false,
    },
    { type: 'separator' },
    { label: 'Sair do rotion', role: 'quit' },
  ])

  tray.setToolTip('Rotion')
  tray.setContextMenu(contextMenu)
}
