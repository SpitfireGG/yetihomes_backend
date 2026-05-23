"use client"
import dynamic from 'next/dynamic'
import { useTheme } from "next-themes"
import { useRef } from "react"
import { API_URL } from '@/utils/main'

const Editor = dynamic(
  () => import('@tinymce/tinymce-react').then(m => m.Editor) as any,
  { ssr: false }
)

type Props = {
  value?: string
  onChange?: (content: string) => void
}

export default function TinymceEditor({ value, onChange }: Props) {
  const editorRef = useRef<any>(null)
  const { theme } = useTheme()

  const EditorComponent = Editor as any

  return (
    <EditorComponent
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      licenseKey="gpl"
      value={value}
      onInit={(_, editor) => (editorRef.current = editor)}
      onEditorChange={(content: string) => onChange?.(content)}
      init={{
        height: 400,
        menubar: true,

        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          // 'imagetools',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'help',
          'wordcount',
        ],

        toolbar:
          'undo redo | image | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist | removeformat',

        automatic_uploads: true,

        image_dimensions: true,
        image_advtab: true,
        image_caption: true,
        image_title: true,

        object_resizing: true,

        images_upload_handler: async (blobInfo) => {
          const formData = new FormData()
          formData.append('image', blobInfo.blob(), blobInfo.filename())

          const res = await fetch(`${API_URL}/api/image-uploads`, {
            method: 'POST',
            body: formData,
          })

          const json = await res.json()

          return `${API_URL}/uploads/${json.data.path}`
        },

        content_style: `
    img {
      max-width: 100%;
      height: auto;
    }
  `,
      }}

    />
  )
}
