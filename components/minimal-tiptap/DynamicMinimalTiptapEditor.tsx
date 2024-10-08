import dynamic from 'next/dynamic'

const DynamicMinimalTiptapEditor = dynamic(() => import('./minimal-tiptap'), {
  ssr: false,
  loading: () => <p>Cargando Editor...</p>
})

export default DynamicMinimalTiptapEditor