import ReactMarkdown from 'react-markdown'

interface Props {
  children: string
}

function Markdown({ children }: Props) {
  return (
    <div className="prose">
      <ReactMarkdown>{children}</ReactMarkdown>
    </div>
  )
}

export default Markdown
