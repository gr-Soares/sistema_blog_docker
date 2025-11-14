import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Meu Blog
          </Link>
          <nav className="flex space-x-4">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Início
            </Link>
            <Link href="/posts" className="hover:text-blue-200 transition-colors">
              Posts
            </Link>
            <Link href="/posts/create" className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded transition-colors">
              Novo Post
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}