import { ipcMain } from 'electron'

ipcMain.handle('fetch-documents', async () => {
  return [
    { id: 1, title: 'Ignite' },
    { id: 2, title: 'Discovery' },
    { id: 3, title: 'Rocketseat' },
    { id: 4, title: 'Docs' },
    { id: 5, title: 'Next.js' },
  ]
})
