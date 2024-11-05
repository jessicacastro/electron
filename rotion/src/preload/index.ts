/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { IPC } from '@shared/constants/ipc'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  SaveDocumentRequest,
} from '@shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

const api = {
  fetchDocuments: (): Promise<FetchAllDocumentsResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.FETCH_ALL),
  fetchDocument: (req: FetchDocumentRequest): Promise<FetchDocumentResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.FETCH, req),
  createDocument: (): Promise<CreateDocumentResponse> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.CREATE),
  saveDocument: (req: SaveDocumentRequest): Promise<void> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.SAVE, req),
  deleteDocument: (req: DeleteDocumentRequest): Promise<void> =>
    ipcRenderer.invoke(IPC.DOCUMENTS.DELETE, req),
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
