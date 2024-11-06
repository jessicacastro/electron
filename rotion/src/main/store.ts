import { Conf } from 'electron-conf'
import { Document } from '@shared/types/ipc'
import { is } from '@electron-toolkit/utils'

type StoreType = {
  documents: Record<string, Document>
}

export const store = new Conf<StoreType>({
  name: is.dev ? 'config' : 'store',
  defaults: {
    documents: {},
  },
})
