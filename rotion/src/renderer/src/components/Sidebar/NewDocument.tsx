import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'

export const NewDocument = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isPending: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation({
      mutationFn: async () => {
        const response = await window.api.createDocument()

        return response.data
      },
      onSuccess: (newDocument) => {
        // This is an alternative to invalidating the query but will do a new request for the API (not cool in big applications)
        // queryClient.invalidateQueries({
        //   queryKey: ['documents'],
        // })

        // This is the best way to update the cache without doing a new request
        queryClient.setQueryData(['documents'], (documentsList: Document[]) => {
          return [...documentsList, newDocument]
        })

        console.log(newDocument)

        navigate(`/documents/${newDocument.id}`)
      },
    })

  return (
    <button
      onClick={() => createDocument()}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-0 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
