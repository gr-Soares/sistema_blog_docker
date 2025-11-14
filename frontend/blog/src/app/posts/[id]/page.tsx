'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/header'
import Loading from '@/components/loading'
import Link from 'next/link'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { Post } from '@/lib/types'

export default function PostDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      loadPost()
    }
  }, [params.id])

  const loadPost = async () => {
    try {
      const postData = await api.getPost(Number(params.id))
      setPost(postData)
    } catch (error) {
      toast.error('Erro ao carregar post')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Loading />
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Post não encontrado</h1>
            <Link href="/posts" className="text-blue-500 hover:text-blue-600">
              Voltar para a lista de posts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              <Link
                href="/posts"
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
              >
                Voltar
              </Link>
            </div>

            <div className="flex justify-between items-center mb-8 text-sm text-gray-500">
              <span>
                Por: <strong className="text-gray-700">{post.author}</strong>
              </span>
              <span>
                Publicado em: {formatDate(post.created_at)}
              </span>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {post.updated_at && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  <strong>Atualizado em:</strong> {formatDate(post.updated_at)}
                </p>
              </div>
            )}

            <div className="mt-8 flex space-x-4">
              <Link
                href={`/posts/edit/${post.id}`}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors"
              >
                Editar Post
              </Link>
              <Link
                href="/posts"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
              >
                Ver Todos os Posts
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}