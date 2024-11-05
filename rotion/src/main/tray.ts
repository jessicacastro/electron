import { app, Menu, nativeImage, Tray } from 'electron'
import path from 'node:path'

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath(
    path.resolve(__dirname, '..', '..', 'resources', 'rotionTemplate.png'),
  )

  const tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Rotion', enabled: false },
    { type: 'separator' },
    { type: 'checkbox', label: 'Ativar modo dark' },
    { label: 'Rotion' },
    { label: 'Rotion' },
    { label: 'Rotion' },
    { label: 'Rotion' },
  ])

  tray.setToolTip('Rotion')
  tray.setContextMenu(contextMenu)
})
