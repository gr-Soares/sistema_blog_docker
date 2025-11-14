'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Post } from '@/lib/types'
import { api } from '@/lib/api'

interface PostCardProps {
  post: Post
  onDelete: (postId: number) => void
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este post?')) {
      return
    }

    setIsDeleting(true)
    try {
      await api.deletePost(post.id)
      toast.success('Post deletado com sucesso!')
      onDelete(post.id)
    } catch (error) {
      toast.error('Erro ao deletar post')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Por: <strong>{post.author}</strong>
        </span>
        <span className="text-sm text-gray-500">
          {formatDate(post.created_at)}
        </span>
      </div>

      <div className="flex space-x-2">
        <Link
          href={`/posts/${post.id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded transition-colors"
        >
          Ver Detalhes
        </Link>
        <Link
          href={`/posts/edit/${post.id}`}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
        >
          Editar
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 px-4 rounded transition-colors"
        >
          {isDeleting ? 'Deletando...' : 'Deletar'}
        </button>
      </div>
    </div>
  )
}