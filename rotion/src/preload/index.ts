/* eslint-disable @typescript-eslint/ban-ts-comment */
import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '@shared/constants/ipc'
import {
  CreateDocumentResponse,
  DeleteDocumentRequest,
  FetchAllDocumentsResponse,
  FetchDocumentRequest,
  FetchDocumentResponse,
  OnNewDocumentRequest,
  SaveDocumentRequest,
} from '@shared/types/ipc'

declare global {
  export interface Window {
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
  onNewDocumentRequest: (callback: OnNewDocumentRequest) => {
    ipcRenderer.on(IPC.DOCUMENTS.CREATE, callback)

    return () => {
      ipcRenderer.off(IPC.DOCUMENTS.CREATE, callback)
    }
  },
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
