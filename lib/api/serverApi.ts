import { cookies } from 'next/headers';
/*import type { AxiosResponse } from 'axios';*/
import { api } from './api';
import type { Note, NoteTag } from '@/types/note';
import type { User } from '@/types/user';

export type NoteSortBy = 'created' | 'updated' | null;

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
/*
export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserRequest {
  username: string;
}

interface SessionResponse {
  success: boolean;
}
*/
async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();

  return cookieStore.toString();
}

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get<FetchNotesResponse>('/notes', { 
    params, 
    headers: {
      Cookie: cookieHeader,
    }
  });

  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    }
  });

  return response.data;
};
/*
export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const response = await api.post<Note>('/notes', note);

  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
};

export const register = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>('/auth/register', credentials);

  return response.data;
}

export const login = async (credentials: AuthCredentials): Promise<User> => {
  const response = await api.post<User>('/auth/login', credentials);

  return response.data;
}

export const logout = async (): Promise<void> => {
  await api.post<User>('/auth/logout');
}

export const updateMe = async(user: UpdateUserRequest): Promise<User> => {
  const response = await api.patch<User>('/users/me', user);

  return response.data;
}
*/
export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get('/auth/session', {
    headers: {
      Cookie: cookieHeader,
    }
  });

  return response;
}

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const response = await api.get<User>('/users/me', {
    headers: {
      Cookie: cookieHeader,
    }
  });

  return response.data;
}
