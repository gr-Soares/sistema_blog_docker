import Header from '@/components/header'
import PostForm from '@/components/postForm'

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Novo Post</h1>
        <PostForm />
      </main>
    </div>
  )
}