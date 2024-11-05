import { Conf } from 'electron-conf'
import { Document } from '@shared/types/ipc'

type StoreType = {
  documents: Record<string, Document>
}

export const store = new Conf<StoreType>({
  defaults: {
    documents: {},
  },
})
