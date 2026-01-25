import { apiRequest } from './config';

// Type definitions
export interface Topic {
  id: string;
  name: string;
  description?: string;
}

export interface CreateTopicRequest {
  name: string;
  description?: string;
}

export interface UpdateTopicRequest {
  name?: string;
  description?: string;
}

// Topic API functions
export async function getTopics(): Promise<Topic[]> {
  var data = await apiRequest<{ topics?: any[] } | any[]>('/topics');
  
  var rawTopics: any[] = Array.isArray((data as any)?.topics) ? (data as any).topics : Array.isArray(data) ? data : [];

  return rawTopics.map((t: any) => ({
    id: t.ID?.toString() ?? t.id ?? '0',
    name: t.Name ?? t.name ?? t.label ?? t.Label ?? "UNDEFINED TOPIC",
  }));
}

export async function getTopic(topicId: string): Promise<Topic> {
  const data = await apiRequest<{ topic?: any }>(`/topics/${topicId}`);
  
  const t = (data as any).topic;
  
  return {
    id: t.ID?.toString() ?? '0',
    name: t.Label ?? t.Name ?? 'Untitled',
    description: t.Description ?? '',
  };
}

export async function createTopic(data: CreateTopicRequest): Promise<Topic> {
  const response = await apiRequest<{ topic?: any }>('/topics', {
    method: 'POST',
    body: JSON.stringify({ Label: data.name }),
  });
  
  const t = (response as any).topic;
  
  return {
    id: t.ID?.toString() ?? '0',
    name: t.Label ?? t.Name ?? 'Untitled',
    description: t.Description ?? '',
  };
}

export async function updateTopic(topicId: string, data: UpdateTopicRequest): Promise<Topic> {
  const response = await apiRequest<{ topic?: any }>(`/topics/${topicId}`, {
    method: 'PUT',
    body: JSON.stringify({ Label: data.name }),
  });
  
  const t = (response as any).topic;
  
  return {
    id: t.ID?.toString() ?? '0',
    name: t.Label ?? t.Name ?? 'Untitled',
    description: t.Description ?? '',
  };
}

export async function deleteTopic(topicId: string): Promise<void> {
  await apiRequest<void>(`/topics/${topicId}`, {
    method: 'DELETE',
  });
}
