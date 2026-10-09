import type { Metadata } from 'next';

import NoteForm from '@/components/NoteForm/NoteForm';

import css from './CreateNote.module.css';

const ogImage = {
  url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  width: 1200,
  height: 800,
  alt: 'Create a new note in NoteHub',
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub.',

  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub',
    url: `${baseUrl}/notes/action/create`,
    images: [ogImage],
  },
};

export default function CreateNote() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create note</h1>

      <NoteForm />
    </div>
  );
}