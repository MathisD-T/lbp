import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceItem } from '../types';
import { 
  Hammer, 
  Home, 
  Warehouse, 
  Bath, 
  Umbrella, 
  LayoutDashboard, 
  DoorOpen, 
  Building2,
  ArrowRight
} from 'lucide-react';

const services: (ServiceItem & { image: string })[] = [
  {
    id: 'roofing',
    title: 'Toiture',
    description: 'Installation et réparation de toitures (bardeaux, tôle, membrane). Protection durable garantie.',
    icon: Umbrella,
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'doors-windows',
    title: 'Portes et Fenêtres',
    description: 'Installation de produits haute efficacité énergétique. Esthétique moderne et isolation supérieure.',
    icon: DoorOpen,
    image: 'https://images.unsplash.com/photo-1506180370005-559ccb7a69bc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'siding',
    title: 'Revêtement Extérieur',
    description: 'Vinyle, CanExel, bois ou aluminium. Donnez un look neuf et prestigieux à votre propriété.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'basement',
    title: 'Finition de Sous-sol',
    description: 'Transformation de sous-sols en espaces de vie : cinéma maison, chambres, bureaux.',
    icon: LayoutDashboard,
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'bathroom',
    title: 'Salle de Bain',
    description: 'Rénovation clé en main : plomberie, céramique, douches italiennes et vanités sur mesure.',
    icon: Bath,
    image: 'https://images.unsplash.com/photo-1552321901-5b909f3e37f6?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'garage',
    title: 'Construction de Garage',
    description: 'Garages détachés ou attachés, agrandissements et aménagement de rangement.',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1563274640-e220a0614f16?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'patio',
    title: 'Patio & Terrasses',
    description: 'Construction de patios en bois traité, cèdre ou composite pour vos étés.',
    icon:  Hammer,
    image: 'https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'commercial',
    title: 'Rénovation Commerciale',
    description: 'Aménagement de bureaux et commerces. Respect des normes et efficacité pour votre business.',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop'
  }
];

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark">
      {/* Services Hero */}
      <div className="pt-40 pb-20 px-4 container mx-auto text-center">
        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs block mb-4">Notre Savoir-Faire</span>
        <h1 className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tight">Services</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          Une approche 360° de la construction. De la fondation à la finition, nous maîtrisons chaque étape.
        </p>
      </div>

      {/* Modern Grid */}
      <div className="container mx-auto px-4 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group relative h-[400px] overflow-hidden bg-surface border border-gray-900"
            >
              {/* Image Background */}
              <img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark/50 to-dark"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-auto opacity-50 group-hover:opacity-100 transition-opacity transform -translate-y-4 group-hover:translate-y-0 duration-500">
                  <service.icon size={40} className="text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold font-heading mb-3 text-white group-hover:text-primary transition-colors">{service.title}</h3>
                
                <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {service.description}
                  </p>
                  <Link to={`/estimate?service=${service.title}`}>
                    <span className="inline-flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">
                      Demander une soumission <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};