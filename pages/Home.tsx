import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveRight, Star } from 'lucide-react';
import { Button } from '../components/UI';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section - Editorial Style */}
      <section className="relative h-screen flex flex-col justify-end pb-20 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" 
            alt="Construction moderne" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="flex items-center gap-4 text-white font-bold tracking-[0.3em] uppercase mb-6 text-xs md:text-sm">
                <span className="w-12 h-[2px] bg-white"></span>
                Construction & Rénovation
              </h2>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold text-primary mb-8 leading-[0.9] tracking-tighter">
                BÂTIR
              </h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col md:flex-row gap-8 items-start md:items-end justify-between border-t border-white/20 pt-8"
            >
              <p className="text-gray-300 text-lg max-w-xl font-light leading-relaxed">
                Avec nous, l’imagination peut devenir réalité. Nous vous rendons un produit final à la hauteur de vos attentes.
              </p>
              <div className="flex gap-4">
                <Link to="/estimate">
                  <Button variant="white" size="lg">Démarrer un projet</Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg">Nos oeuvres</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="bg-primary overflow-hidden py-4 rotate-1 scale-105 shadow-[0_0_50px_rgba(132,204,22,0.3)] relative z-30">
        <div className="whitespace-nowrap flex gap-12 text-black font-bold font-heading text-xl uppercase tracking-widest justify-center">
          <span>Rénovation Complète</span> • <span>Agrandissement</span> • <span>Gestion de Projet</span> • <span>Commercial</span> • <span>Résidentiel</span> • <span>Finition Intérieure</span>
        </div>
      </div>

      {/* Intro Section - Asymmetric */}
      <section className="py-32 bg-dark relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="w-full lg:w-1/2 relative">
               <div className="aspect-[3/4] overflow-hidden rounded-sm">
                 <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Interior Detail" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
               </div>
               <div className="absolute -bottom-10 -right-10 bg-surface p-8 max-w-xs border border-gray-800 shadow-2xl hidden md:block">
                 <Star className="text-primary mb-4" size={32} fill="currentColor" />
                 <p className="text-sm text-gray-400">"Une attention aux détails qui frôle l'obsession. C'est ce qui fait notre signature."</p>
               </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-4 block">Notre Philosophie</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">
                Au delà de la <br/> simple construction.
              </h2>
              <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                <p>
                  Nous ne nous contentons pas d'assembler des matériaux. Nous sculptons des environnements. Chaque projet est une toile vierge où la technique rencontre l'esthétique.
                </p>
                <p>
                  Dans un monde où la rapidité prime souvent sur la qualité, nous avons fait le choix audacieux de l'excellence sans compromis. Votre vision mérite cette rigueur.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-4xl font-heading font-bold text-white mb-2">15+</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Années d'excellence</p>
                </div>
                <div>
                  <h3 className="text-4xl font-heading font-bold text-white mb-2">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Satisfaction Client</p>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-gray-800">
                <Link to="/about" className="group flex items-center gap-4 text-white hover:text-primary transition-colors">
                  <span className="font-heading font-bold uppercase tracking-wider">Découvrir l'agence</span>
                  <MoveRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Large Horizontal Cards */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold">Expertises</h2>
            <Link to="/services" className="hidden md:flex items-center gap-2 text-primary uppercase text-sm font-bold tracking-widest hover:text-white transition-colors">
              Tous nos services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              {
                title: "Résidentiel Haut de Gamme",
                desc: "Transformation d'espaces de vie, agrandissements majeurs et rénovations intégrales.",
                img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2600&auto=format&fit=crop"
              },
              {
                title: "Espaces Commerciaux",
                desc: "Bureaux, boutiques et restaurants conçus pour optimiser la performance et l'image de marque.",
                img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2300&auto=format&fit=crop"
              },
              {
                title: "Agrandissement",
                desc: "Projets d'agrandissement complexes et ajouts d'étages pour maximiser votre espace.",
                img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2600&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative h-[400px] overflow-hidden cursor-pointer">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center">
                  <span className="text-primary font-bold text-lg mb-4">0{idx + 1}</span>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 group-hover:translate-x-4 transition-transform duration-500">{item.title}</h3>
                  <p className="text-gray-300 max-w-xl text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {item.desc}
                  </p>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <span className="inline-flex items-center gap-2 text-white border-b border-primary pb-1">En savoir plus <ArrowRight size={16}/></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Minimalist */}
      <section className="py-32 bg-dark text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[20vw] font-heading font-bold text-white leading-none">PROJET</span>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Vous avez la vision.<br/>Nous avons l'expertise.</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto font-light">
            Ne laissez pas vos rêves sur papier. Discutons de la manière dont nous pouvons concrétiser vos ambitions.
          </p>
          <Link to="/estimate">
            <Button size="lg" className="hover:scale-105">Demander une estimation</Button>
          </Link>
        </div>
      </section>
    </>
  );
};