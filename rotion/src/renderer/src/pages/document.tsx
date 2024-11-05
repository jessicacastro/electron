import { useParams } from 'react-router-dom'
import { Editor } from '../components/Editor'
import { ToC } from '../components/ToC'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const Document = () => {
  const { id } = useParams<{ id: string }>()
  const sanitizedId = useMemo(() => id && id.replace(/}$/, ''), [id])

  const { data, isFetching } = useQuery({
    queryKey: ['document', sanitizedId],
    enabled: !!sanitizedId,
    queryFn: async () => {
      const response = await window.api.fetchDocument({ id: sanitizedId! })

      return response.data
    },
  })

  const initialContent = useMemo(() => {
    if (data) {
      return `<h1>${data.title}</h1>${data.content ?? '<p></p>'}`
    }

    return ''
  }, [data])

  return (
    <main className="flex-1 flex py-12 px-10 gap-8">
      <aside className="hidden lg:block sticky top-0">
        <span className="text-rotion-300 font-semibold text-xs">
          TABLE OF CONTENT
        </span>

        <ToC.Root>
          <ToC.Link>Arquitetura back-end</ToC.Link>
          <ToC.Section>
            <ToC.Link>Banco de dados</ToC.Link>
            <ToC.Link>Mensageria</ToC.Link>
          </ToC.Section>

          <ToC.Link>Tecnologias</ToC.Link>
          <ToC.Section>
            <ToC.Link>Nest.js</ToC.Link>
            <ToC.Link>GraphQL</ToC.Link>
            <ToC.Link>Prisma</ToC.Link>
            <ToC.Link>Apache Kafka</ToC.Link>
          </ToC.Section>

          <ToC.Link>Estrutura do código</ToC.Link>
          <ToC.Section>
            <ToC.Link>Fundamentos</ToC.Link>
            <ToC.Section>
              <ToC.Link>Inversão de dependências</ToC.Link>
              <ToC.Link>Domínio</ToC.Link>
              <ToC.Link>Entities</ToC.Link>
              <ToC.Link>Value Objects</ToC.Link>
              <ToC.Link>AggregateRoots</ToC.Link>
              <ToC.Link>Eventos de domínio</ToC.Link>
              <ToC.Link>Watched Lists</ToC.Link>
            </ToC.Section>
          </ToC.Section>
        </ToC.Root>
      </aside>

      <section className="flex flex-1 flex-col items-center">
        {!isFetching && data && <Editor content={initialContent} />}
      </section>
    </main>
  )
}
