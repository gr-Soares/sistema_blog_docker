'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Post } from '@/lib/types'

interface PostFormProps {
  initialData?: Partial<Post>
  isEdit?: boolean
}

export default function PostForm({ initialData = {}, isEdit = false }: PostFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    content: initialData.content || '',
    author: initialData.author || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const apiUrl = isEdit 
        ? `http://localhost/api/posts/${initialData.id}`
        : 'http://localhost/api/posts/'

      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar post')
      }

      toast.success(isEdit ? 'Post atualizado com sucesso!' : 'Post criado com sucesso!')
      router.push('/posts')
      router.refresh()
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o título do post"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
          Autor
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o nome do autor"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-600 text-gray-700 mb-2">
          Conteúdo
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Digite o conteúdo do post"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 px-4 rounded transition-colors"
        >
          {isSubmitting ? 'Salvando...' : (isEdit ? 'Atualizar Post' : 'Criar Post')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/posts')}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}