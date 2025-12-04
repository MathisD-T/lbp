import { ProjectItem } from '../types';

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || '';

const absolutify = (url: string) =>
  url?.startsWith('/uploads') ? `${API_URL}${url}` : url;

export const fetchProjects = async (): Promise<ProjectItem[]> => {
  try {
    if (!API_URL) throw new Error('Aucune API configurée');
    const res = await fetch(`${API_URL}/api/projects`);
    if (!res.ok) {
      throw new Error('Réponse non valide');
    }
    const data: ProjectItem[] = await res.json();

    return data.map((p) => ({
      ...p,
      imageUrl: absolutify(p.imageUrl),
      images: p.images?.map(absolutify) || []
    }));
  } catch (err) {
    console.warn('Backend indisponible, fallback liste vide.', err);
    return [];
  }
};

export const createProject = async (
  project: Omit<ProjectItem, 'id'>,
  files: File[],
  token?: string,
  coverFile?: File | null
): Promise<ProjectItem> => {
  if (!API_URL) {
    throw new Error('Aucune API configurée pour la création.');
  }
  const form = new FormData();
  form.append('title', project.title);
  form.append('category', project.category);
  form.append('location', project.location);
  form.append('description', project.description);
  if (project.imageUrl) {
    form.append('imageUrl', project.imageUrl);
  }
  files.forEach(f => form.append('images', f));
  if (coverFile) {
    form.append('cover', coverFile);
  }

  const res = await fetch(`${API_URL}/api/projects`, {
    method: 'POST',
    headers: {
      'x-admin-token': token || ADMIN_TOKEN
    },
    body: form
  });

  if (!res.ok) {
    throw new Error('Création impossible');
  }

  const created: ProjectItem = await res.json();

  return {
    ...created,
    imageUrl: absolutify(created.imageUrl),
    images: created.images?.map(absolutify) || []
  };
};

export const removeProject = async (id: string, token?: string): Promise<void> => {
  if (!API_URL) {
    throw new Error('Aucune API configurée pour la suppression.');
  }
  const res = await fetch(`${API_URL}/api/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'x-admin-token': token || ADMIN_TOKEN
    }
  });

  if (!res.ok && res.status !== 204) {
    throw new Error('Suppression impossible');
  }
};
