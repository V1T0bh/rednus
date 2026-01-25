import { apiRequest } from './config';

// Type definitions
export interface Topic {
  id: string;
  name: string;
  description?: string;
  // Add your topic fields here
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
  // TODO: Implement get all topics API call
  // return apiRequest<Topic[]>('/topics');
  throw new Error('Not implemented');
}

export async function getTopic(topicId: string): Promise<Topic> {
  // TODO: Implement get single topic API call
  // return apiRequest<Topic>(`/topics/${topicId}`);
  throw new Error('Not implemented');
}

export async function createTopic(data: CreateTopicRequest): Promise<Topic> {
  // TODO: Implement create topic API call
  // return apiRequest<Topic>('/topics', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
  throw new Error('Not implemented');
}

export async function updateTopic(topicId: string, data: UpdateTopicRequest): Promise<Topic> {
  // TODO: Implement update topic API call
  // return apiRequest<Topic>(`/topics/${topicId}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(data),
  // });
  throw new Error('Not implemented');
}

export async function deleteTopic(topicId: string): Promise<void> {
  // TODO: Implement delete topic API call
  throw new Error('Not implemented');
}
