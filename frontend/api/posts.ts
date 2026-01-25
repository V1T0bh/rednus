import { apiRequest } from './config';

// Type definitions
export interface Post {
  id: string;
  title: string;
  content: string;
  topicId: string;
  userId: string;
  authorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

// Post API functions
export async function getPosts(): Promise<Post[]> {
  var data = await apiRequest<{ post?: any[] } | any[]>('/posts');
  
  var rawPosts: any[] = Array.isArray((data as any)?.post) ? (data as any).post : Array.isArray(data) ? data : [];

  return rawPosts.map((t: any) => ({
    id: t.ID?.toString() ?? '0',
    title: t.Title ?? 'Untitled',
    content: t.Description ?? '',
    topicId: t.TopicID?.toString() ?? '0',
    userId: t.UserID?.toString() ?? '0',
    authorName: t.AuthorName ?? '',
    createdAt: t.CreatedAt ?? '',
    updatedAt: t.UpdatedAt ?? '',
  }));
}

export async function getPost(postId: string): Promise<Post> {
  var data = await apiRequest<{ post?: any } | any[]>(`/posts/${postId}`);

  var rawPosts: any[] = (data as any).post ? [(data as any).post] : Array.isArray(data) ? data : [];

  rawPosts = rawPosts.map((t: any) => ({
    id: t.ID?.toString() ?? '0',
    title: t.Title ?? 'Untitled',
    content: t.Description ?? '',
    topicId: t.TopicID?.toString() ?? '0',
    userId: t.UserID?.toString() ?? '0',
    authorName: t.AuthorName ?? '',
    createdAt: t.CreatedAt ?? '',
    updatedAt: t.UpdatedAt ?? '',
  }));

  return rawPosts[0] ? rawPosts[0] : {} as Post;
}

export async function createPost(topicId: string, data: CreatePostRequest): Promise<Post> {
  const response = await apiRequest<{ post?: any }>(`/topics/${topicId}/posts/`, {
    method: 'POST',
    body: JSON.stringify({
      Title: data.title,
      Description: data.content,
    }),
  });

  const p = (response as any).post;
  
  return {
    id: p.ID?.toString() ?? '0',
    title: p.Title ?? 'Untitled',
    content: p.Description ?? '',
    topicId: p.TopicID?.toString() ?? topicId,
    userId: p.UserID?.toString() ?? '0',
    authorName: p.AuthorName ?? '',
    createdAt: p.CreatedAt ?? '',
    updatedAt: p.UpdatedAt ?? '',
  };
}

export async function updatePost(postId: string, data: UpdatePostRequest): Promise<Post> {
  const response = await apiRequest<{ post?: any }>(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      Title: data.title,
      Description: data.content,
    }),
  });

  const p = (response as any).post;
  
  return {
    id: p.ID?.toString() ?? '0',
    title: p.Title ?? 'Untitled',
    content: p.Description ?? '',
    topicId: p.TopicID?.toString() ?? '0',
    userId: p.UserID?.toString() ?? '0',
    authorName: p.AuthorName ?? '',
    createdAt: p.CreatedAt ?? '',
    updatedAt: p.UpdatedAt ?? '',
  };
}

export async function deletePost(postId: string): Promise<void> {
  await apiRequest<void>(`/posts/${postId}`, {
    method: 'DELETE',
  });
}

export async function getPostsByTopic(topicId: string): Promise<Post[]> {
  var data = await apiRequest<{ post?: any[] } | any[]>(`/topics/${topicId}/posts`);
  
  var rawPosts: any[] = Array.isArray((data as any)?.post) ? (data as any).post : Array.isArray(data) ? data : [];

  return rawPosts.map((t: any) => ({
    id: t.ID?.toString() ?? '0',
    title: t.Title ?? 'Untitled',
    content: t.Description ?? '',
    topicId: t.TopicID?.toString() ?? topicId,
    userId: t.UserID?.toString() ?? '0',
    authorName: t.AuthorName ?? '',
    createdAt: t.CreatedAt ?? '',
    updatedAt: t.UpdatedAt ?? '',
  }));
}
