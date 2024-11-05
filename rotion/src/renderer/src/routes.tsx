import { Route } from 'react-router-dom'
import { Router } from '../../lib/electron-router-dom'
import { Blank } from './pages/blank'
import { Document } from './pages/document'
import { DefaultLayout } from './pages/layouts/default'

export const Routes = () => {
  return (
    <Router
      main={
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Blank />} />
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      }
    />
  )
}
