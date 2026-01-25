import { apiRequest } from './config';

// Type definitions
export interface Post {
  id: string;
  title: string;
  content: string;
  topicId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
  // Add your post fields here
}

export interface CreatePostRequest {
  title: string;
  content: string;
  topicId: string;
}

export interface UpdatePostRequest {
  title?: string;
  content?: string;
}

// Post API functions
export async function getPosts(topicId?: string): Promise<Post[]> {
  // TODO: Implement get all posts API call
  // If topicId is provided, filter by topic
  // const endpoint = topicId ? `/topics/${topicId}/posts` : '/posts';
  // return apiRequest<Post[]>(endpoint);
  throw new Error('Not implemented');
}

export async function getPost(postId: string): Promise<Post> {
  // TODO: Implement get single post API call
  // return apiRequest<Post>(`/posts/${postId}`);
  throw new Error('Not implemented');
}

export async function createPost(data: CreatePostRequest): Promise<Post> {
  // TODO: Implement create post API call
  // return apiRequest<Post>('/posts', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
  throw new Error('Not implemented');
}

export async function updatePost(postId: string, data: UpdatePostRequest): Promise<Post> {
  // TODO: Implement update post API call
  // return apiRequest<Post>(`/posts/${postId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // });
  throw new Error('Not implemented');
}

export async function deletePost(postId: string): Promise<void> {
  // TODO: Implement delete post API call
  // return apiRequest<void>(`/posts/${postId}`, {
  //   method: 'DELETE',
  // });
  throw new Error('Not implemented');
}

export async function getPostsByTopic(topicId: string): Promise<Post[]> {
  // TODO: Implement get posts by topic API call
  // return apiRequest<Post[]>(`/topics/${topicId}/posts`);
  throw new Error('Not implemented');
}
