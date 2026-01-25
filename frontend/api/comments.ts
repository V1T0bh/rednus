import { apiRequest } from './config';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  authorName?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content?: string;
}

// Comment API functions
export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  var data = await apiRequest<{ comments?: any[] } | any[]>(`/posts/${postId}/comments`);
  
  var rawComments: any[] = Array.isArray((data as any)?.comments) ? (data as any).comments : Array.isArray(data) ? data : [];

  return rawComments.map((c: any) => ({
    id: c.ID?.toString() ?? '0',
    postId: c.PostID?.toString() ?? postId,
    userId: c.UserID?.toString() ?? '0',
    content: c.Content ?? '',
    authorName: c.AuthorName ?? '',
    createdAt: c.CreatedAt ?? '',
    updatedAt: c.UpdatedAt ?? '',
  }));
}

export async function createComment(postId: string, data: CreateCommentRequest): Promise<Comment> {
  const response = await apiRequest<{ comment?: any }>(`/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ Content: data.content }),
  });

  const c = (response as any).comment;
  
  return {
    id: c.ID?.toString() ?? '0',
    postId: c.PostID?.toString() ?? postId,
    userId: c.UserID?.toString() ?? '0',
    content: c.Content ?? '',
    authorName: c.AuthorName ?? '',
    createdAt: c.CreatedAt ?? '',
    updatedAt: c.UpdatedAt ?? '',
  };
}

// Note: updateComment is not supported by the backend API

export async function deleteComment(commentId: string): Promise<void> {
  await apiRequest<void>(`/comments/${commentId}`, {
    method: 'DELETE',
  });
}
