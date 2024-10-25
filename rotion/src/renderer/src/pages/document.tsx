import { Link } from 'react-router-dom'

export const Document = () => {
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      Documento
      <Link to="/" className="ml-4 text-rotion-500 hover:text-rotion-400">
        Acessar blank
      </Link>
    </main>
  )
}
