import { Topic } from './topics';
import { Post } from './posts';

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const mockTopics: Topic[] = [
  {
    id: '1',
    name: 'Topic 1',
    description: 'First topic for discussion',
  },
  {
    id: '2',
    name: 'Topic 2',
    description: 'Second topic for discussion',
  },
  {
    id: '3',
    name: 'Topic 3',
    description: 'Third topic for discussion',
  },
];

export const mockPosts: Post[] = [
  // Posts for Topic 1
  {
    id: '1',
    title: 'First Post in Topic 1',
    content: 'This is the content of the first post in topic 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    topicId: '1',
    userId: '1',
    createdAt: '2026-01-20T10:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z',
  },
  {
    id: '2',
    title: 'Second Post in Topic 1',
    content: 'This is the content of the second post in topic 1. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    topicId: '1',
    userId: '2',
    createdAt: '2026-01-21T14:30:00Z',
    updatedAt: '2026-01-21T14:30:00Z',
  },
  {
    id: '3',
    title: 'Third Post in Topic 1',
    content: 'This is the content of the third post in topic 1. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    topicId: '1',
    userId: '1',
    createdAt: '2026-01-22T09:15:00Z',
    updatedAt: '2026-01-22T09:15:00Z',
  },
  // Posts for Topic 2
  {
    id: '4',
    title: 'First Post in Topic 2',
    content: 'This is the content of the first post in topic 2. Laboris nisi ut aliquip ex ea commodo consequat.',
    topicId: '2',
    userId: '2',
    createdAt: '2026-01-19T11:20:00Z',
    updatedAt: '2026-01-19T11:20:00Z',
  },
  {
    id: '5',
    title: 'Second Post in Topic 2',
    content: 'This is the content of the second post in topic 2. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    topicId: '2',
    userId: '1',
    createdAt: '2026-01-23T16:45:00Z',
    updatedAt: '2026-01-23T16:45:00Z',
  },
  {
    id: '6',
    title: 'Third Post in Topic 2',
    content: 'This is the content of the third post in topic 2. Dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
    topicId: '2',
    userId: '3',
    createdAt: '2026-01-24T13:00:00Z',
    updatedAt: '2026-01-24T13:00:00Z',
  },
  // Posts for Topic 3
  {
    id: '7',
    title: 'First Post in Topic 3',
    content: 'This is the content of the first post in topic 3. Sunt in culpa qui officia deserunt mollit anim id est laborum.',
    topicId: '3',
    userId: '3',
    createdAt: '2026-01-18T08:30:00Z',
    updatedAt: '2026-01-18T08:30:00Z',
  },
  {
    id: '8',
    title: 'Second Post in Topic 3',
    content: 'This is the content of the second post in topic 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    topicId: '3',
    userId: '2',
    createdAt: '2026-01-25T10:10:00Z',
    updatedAt: '2026-01-25T10:10:00Z',
  },
  {
    id: '9',
    title: 'Third Post in Topic 3',
    content: 'This is the content of the third post in topic 3. Incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis nostrud.',
    topicId: '3',
    userId: '1',
    createdAt: '2026-01-25T15:25:00Z',
    updatedAt: '2026-01-25T15:25:00Z',
  },
];

export const mockComments: Comment[] = [
  // Comments for Post 1
  {
    id: '1',
    postId: '1',
    userId: '2',
    content: 'Great post! I totally agree with your point.',
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-01-20T11:00:00Z',
  },
  {
    id: '2',
    postId: '1',
    userId: '3',
    content: 'This is very insightful. Thanks for sharing!',
    createdAt: '2026-01-20T12:30:00Z',
    updatedAt: '2026-01-20T12:30:00Z',
  },
  // Comments for Post 2
  {
    id: '3',
    postId: '2',
    userId: '1',
    content: 'Interesting perspective. Could you elaborate more?',
    createdAt: '2026-01-21T15:00:00Z',
    updatedAt: '2026-01-21T15:00:00Z',
  },
  // Comments for Post 4
  {
    id: '4',
    postId: '4',
    userId: '3',
    content: 'I have a different opinion on this matter.',
    createdAt: '2026-01-19T12:00:00Z',
    updatedAt: '2026-01-19T12:00:00Z',
  },
  {
    id: '5',
    postId: '4',
    userId: '1',
    content: 'Well written! Looking forward to more posts like this.',
    createdAt: '2026-01-19T14:00:00Z',
    updatedAt: '2026-01-19T14:00:00Z',
  },
  // Comments for Post 7
  {
    id: '6',
    postId: '7',
    userId: '2',
    content: 'Can you provide some examples?',
    createdAt: '2026-01-18T09:30:00Z',
    updatedAt: '2026-01-18T09:30:00Z',
  },
];

export function getPostsByTopicMock(topicId: string): Post[] {
  return mockPosts.filter(post => post.topicId === topicId);
}

export function getPostByIdMock(postId: string): Post | undefined {
  return mockPosts.find(post => post.id === postId);
}

export function getCommentsByPostMock(postId: string): Comment[] {
  return mockComments.filter(comment => comment.postId === postId);
}
