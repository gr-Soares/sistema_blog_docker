'use client'

import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import Header from '@/components/header'
import Loading from '@/components/loading'
import PostCard from '@/components/postCard'
import { Post } from '@/lib/types'


export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const postsData = await api.getPosts()
      setPosts(postsData)
    } catch (error) {
      toast.error('Erro ao carregar posts')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      loadPosts()
      return
    }

    try {
      setLoading(true)
      const searchResults = await api.searchPosts(searchTerm)
      setPosts(searchResults)
    } catch (error) {
      toast.error('Erro ao buscar posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId))
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Todos os Posts</h1>
          <span className="text-gray-600">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} encontrados
          </span>
        </div>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar posts por título..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={loadPosts}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Limpar
            </button>
          </div>
        </form>

        <div className="grid gap-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum post encontrado.</p>
            </div>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </main>
    </div>
  )
}