export type Document = {
  id: string
  title: string
  content?: string
}

/**
 * Requests (params for each request made in the IPC handlers)
 */

// only id of document
export type FetchDocumentRequest = {
  id: string
}

export type DeleteDocumentRequest = {
  id: string
}

export type SaveDocumentRequest = Document

/**
 * Responses (type of the returns inside the IPC handlers)
 */
export type FetchAllDocumentsResponse = {
  data: Document[]
}

export type FetchDocumentResponse = {
  data: Document
}

export type CreateDocumentResponse = {
  data: Document
}

export type OnNewDocumentRequest = () => void
