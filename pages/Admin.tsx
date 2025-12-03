import React, { useEffect, useState } from 'react';
import { Button, Input, TextArea, Select } from '../components/UI';
import { Lock, Plus, Trash2, LogOut, Layout, MapPin, PencilLine } from 'lucide-react';
import { fetchProjects, createProject, removeProject } from '../services/store';
import { ProjectItem } from '../types';

const CATEGORIES = [
  'Toiture',
  'Portes et Fenêtres',
  'Revêtement Extérieur',
  'Finition de Sous-sol',
  'Salle de Bain',
  'Construction de Garage',
  'Patio & Terrasses',
  'Rénovation Commerciale'
];
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || '';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newProject, setNewProject] = useState({
    title: '',
    category: CATEGORIES[0],
    location: '',
    description: '',
    imageUrl: ''
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const loadProjects = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await fetchProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setLoadError('Impossible de charger les projets.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('lbp_admin') === 'true') {
      setIsAuthenticated(true);
    }
    loadProjects();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ADMIN_TOKEN) {
      setError('Aucun token admin configuré (VITE_ADMIN_TOKEN).');
      return;
    }
    if (password === ADMIN_TOKEN) {
      setIsAuthenticated(true);
      sessionStorage.setItem('lbp_admin', 'true');
      setError('');
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lbp_admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;
    try {
      setDeletingId(id);
      await removeProject(id, ADMIN_TOKEN);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert('Suppression impossible pour le moment.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        // Edition rapide: supprimer puis réinsérer (API n'a pas de PUT)
        await removeProject(editingId, ADMIN_TOKEN);
        const created = await createProject({ ...newProject, id: undefined } as any, files ? Array.from(files) : [], ADMIN_TOKEN, coverFile);
        if (created) {
          setProjects(prev => prev.map(p => (p.id === editingId ? created : p)));
        }
      } else {
        const created = await createProject(newProject as any, files ? Array.from(files) : [], ADMIN_TOKEN, coverFile);
        if (created) {
          setProjects(prev => [created, ...prev]);
        }
      }
    setIsAdding(false);
    setEditingId(null);
      setNewProject({
        title: '',
        category: CATEGORIES[0],
        location: '',
        description: '',
        imageUrl: ''
      });
      setFiles(null);
      setCoverFile(null);
    } catch (err) {
      console.error(err);
      alert('Création/édition impossible pour le moment.');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-surface p-8 rounded-2xl border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white">Administration</h1>
            <p className="text-gray-400 text-sm mt-2">Accès réservé à l'équipe Les Beaux Projets</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Mot de passe"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button fullWidth type="submit">Se connecter</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Tableau de bord</h1>
            <p className="text-gray-400">Gérez vos réalisations et contenus</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'primary'} size="sm">
              {isAdding ? 'Annuler' : 'Nouveau projet'} <Plus size={18} className={isAdding ? 'rotate-45' : ''} />
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        {isAdding && (
          <div className="bg-surface p-8 rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(132,204,22,0.1)] mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Layout className="text-primary" /> Ajouter une réalisation
            </h2>
            <form onSubmit={handleAddProject} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Titre du projet"
                id="title"
                value={newProject.title}
                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
              <Select
                label="Catégorie"
                id="category"
                value={newProject.category}
                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>

              <Input
                label="Ville / Localisation"
                id="location"
                value={newProject.location}
                onChange={e => setNewProject({ ...newProject, location: e.target.value })}
                required
              />
              <div className="md:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">Image principale (upload)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  className="text-sm text-gray-300"
                  required={!editingId}
                />
                <p className="text-xs text-gray-500 mt-1">Choisissez un fichier pour l'image principale.</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-heading font-bold uppercase tracking-widest text-gray-500 block mb-2">Images supplémentaires (upload)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFiles(e.target.files)}
                  className="text-sm text-gray-300"
                />
                <p className="text-xs text-gray-500 mt-1">Ces images seront stockées localement et servies via /uploads.</p>
              </div>

              <div className="md:col-span-2">
                <TextArea
                  label="Description"
                  id="description"
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Publier le projet'}
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-surface rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h2 className="font-bold text-lg">Projets en ligne ({projects.length})</h2>
          </div>

          {loadError && <div className="p-6 text-red-400">{loadError}</div>}

          {isLoading ? (
            <div className="p-6 text-gray-400">Chargement des projets...</div>
          ) : (
            <div className="divide-y divide-gray-800">
              {projects.map((project) => (
                <div key={project.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-white/5 transition-colors group">
                  <div className="w-full md:w-32 h-24 rounded-lg overflow-hidden shrink-0 relative bg-gray-900">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Image';
                      }}
                    />
                  </div>

              <div className="flex-grow text-center md:text-left">
                <h3 className="font-bold text-xl text-white mb-1">{project.title}</h3>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-400">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                    {project.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {project.location}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsAdding(true);
                        setEditingId(project.id);
                        setNewProject({
                          title: project.title,
                          category: project.category,
                          location: project.location,
                          description: project.description,
                          imageUrl: project.imageUrl
                        });
                      }}
                      className="p-3 rounded-full hover:bg-primary/20 text-gray-400 hover:text-primary transition-all"
                      title="Modifier"
                    >
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-3 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-500 transition-all"
                      title="Supprimer"
                      disabled={deletingId === project.id}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
              ))}

              {projects.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  Aucun projet pour le moment.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
