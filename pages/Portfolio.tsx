import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/UI';
import { ProjectItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../services/store';

const categories = [
  'Tous',
  'Toiture',
  'Portes et Fenêtres',
  'Revêtement Extérieur',
  'Finition de Sous-sol',
  'Salle de Bain',
  'Construction de Garage',
  'Patio & Terrasses',
  'Rénovation Commerciale'
];

export const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [filter, setFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les projets pour le moment.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const filteredProjects = filter === 'Tous' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-dark min-h-screen">
      
      {/* Editorial Header */}
      <div className="pt-40 pb-16 px-4 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-800 pb-12">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">Portfolio</span>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tight text-white">
              NOS <span className="text-stroke-white text-transparent">ŒUVRES</span>
            </h1>
          </div>
          <p className="text-gray-400 max-w-sm text-right mt-6 md:mt-0 font-light hidden md:block">
            Une collection de projets où l'excellence technique rencontre l'esthétique intemporelle.
          </p>
        </div>
      </div>

      {/* Minimalist Filters */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm md:text-base uppercase tracking-widest font-bold transition-all relative py-2 ${
                filter === cat 
                  ? 'text-primary' 
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div 
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid - Large Format */}
      <div className="container mx-auto px-4 pb-32">
        {loading && (
          <div className="text-center text-gray-400 py-20">Chargement des réalisations...</div>
        )}

        {error && !loading && (
          <div className="text-center text-red-400 py-6">{error}</div>
        )}

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project.id}
                className="group relative cursor-pointer overflow-hidden aspect-[4/3] bg-surface"
                onClick={() => setSelectedProject(project)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Hover Reveal Content */}
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-primary text-xs font-bold uppercase tracking-widest mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          {project.category}
                        </span>
                        <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm flex items-center gap-2 opacity-80">
                          <MapPin size={14} /> {project.location}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white hover:text-black">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredProjects.length === 0 && !loading && (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Immersive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 md:px-8 py-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-surface overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/20 hover:bg-primary backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-black transition-all duration-300 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/3 h-64 md:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden"></div>
                <div className="h-full">
                  <Carousel images={selectedProject.images?.length ? [selectedProject.imageUrl, ...selectedProject.images] : [selectedProject.imageUrl]} />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col bg-surface border-l border-gray-800 overflow-y-auto">
                <div className="mt-auto mb-auto">
                  <span className="inline-block px-3 py-1 border border-primary/30 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-6">
                    {selectedProject.category}
                  </span>
                  
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-white leading-tight">
                    {selectedProject.title}
                  </h2>
                  
                  <div className="space-y-6 mb-12">
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                      <MapPin className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Localisation</span>
                        <span className="text-white">{selectedProject.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg border border-white/5">
                      <Calendar className="text-primary mt-1 shrink-0" size={20} />
                      <div>
                        <span className="block text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Date d'ajout</span>
                        <span className="text-white">Récent</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-12">
                    <h3 className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-4">À propos du projet</h3>
                    <p className="text-gray-300 leading-relaxed text-lg font-light">
                      {selectedProject.description}
                    </p>
                  </div>

                  <Button onClick={() => setSelectedProject(null)} fullWidth variant="outline">
                    Fermer le projet
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (count === 0) return null;

  const current = images[index] || '';

  return (
    <div className="relative w-full h-full">
      <img
        src={current || 'https://via.placeholder.com/800x600?text=Image'}
        alt={`Slide ${index + 1}`}
        className="w-full h-full object-cover"
      />
      {count > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Précédent"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            aria-label="Suivant"
          >
            ›
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-primary' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
