import { Post, PostCreate, PostUpdate } from './types';

// No navegador, usa URL relativa (proxy via Nginx)
// No servidor, usa URL completa para SSR
const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side - usa URL completa
    return 'http://localhost/api'
  } else {
    // Client-side - usa URL relativa (via Nginx)
    return '/api';
  }
};

export const api = {
  // GET - Listar posts
  async getPosts(skip: number = 0, limit: number = 10): Promise<Post[]> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/?skip=${skip}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar posts');
    }
    return response.json();
  },

  // GET - Buscar post por ID
  async getPost(id: number): Promise<Post> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/${id}`);
    if (!response.ok) {
      throw new Error('Post não encontrado');
    }
    return response.json();
  },

  // POST - Criar post
  async createPost(postData: PostCreate): Promise<Post> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar post');
    }
    return response.json();
  },

  // PUT - Atualizar post
  async updatePost(id: number, postData: PostUpdate): Promise<Post> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar post');
    }
    return response.json();
  },

  // DELETE - Deletar post
  async deletePost(id: number): Promise<void> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar post');
    }
  },

  // GET - Buscar posts por autor
  async getPostsByAuthor(author: string): Promise<Post[]> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/author/${author}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar posts do autor');
    }
    return response.json();
  },

  // GET - Buscar posts por título
  async searchPosts(title: string): Promise<Post[]> {
    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/posts/search/${title}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar posts');
    }
    return response.json();
  }
};