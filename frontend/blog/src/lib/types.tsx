export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string | null;
}

export interface PostCreate {
  title: string;
  content: string;
  author: string;
}

export interface PostUpdate {
  title?: string;
  content?: string;
  author?: string;
}