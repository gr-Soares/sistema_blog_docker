'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/header'
import PostForm from '@/components/postForm'
import Loading from '@/components/loading'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { Post } from '@/lib/types'

export default function EditPostPage() {
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
            <h1 className="text-2xl font-bold text-gray-800">Post não encontrado</h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Editar Post</h1>
        <PostForm initialData={post} isEdit={true} />
      </main>
    </div>
  )
}