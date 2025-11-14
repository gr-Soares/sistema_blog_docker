import Link from 'next/link'
import Header from '../components/header'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Bem-vindo ao Meu Blog
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Um blog simples desenvolvido com Next.js e FastAPI.
          </p>
          
          <div className="space-x-4">
            <Link
              href="/posts"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Ver Todos os Posts
            </Link>
            <Link
              href="/posts/create"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Criar Novo Post
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}