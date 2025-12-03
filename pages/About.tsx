import React from 'react';
import { ShieldCheck, HeartHandshake, Clock, HardHat, Quote } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-dark min-h-screen">
      {/* Header */}
      <div className="pt-40 pb-20 px-4 container mx-auto text-center border-b border-gray-900">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">Les Beaux Projets</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          Plus qu'une entreprise de construction, un partenaire dans la création de votre patrimoine.
        </p>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="w-full lg:w-1/2">
             <div className="relative">
               <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop" 
                alt="Construction site" 
                className="w-full h-auto grayscale rounded-sm"
              />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary flex items-center justify-center rounded-full p-8 hidden md:flex">
                 <p className="text-black font-heading font-bold text-center leading-tight">DEPUIS<br/><span className="text-4xl">2008</span></p>
              </div>
             </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">L'art de bien bâtir.</h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed border-l-2 border-primary pl-6">
              Notre équipe compétente travaille minutieusement à la réalisation de chacun de vos projets pour vous rendre un résultat impeccable.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Les Beaux Projets est une entreprise spécialisée en rénovation et construction ayant comme valeurs la qualité de ses réalisations, le respect des budgets, des échéanciers ainsi que du souci de ses clients. L’entreprise saura répondre à vos besoins à travers ses bureaux situés à Québec et à Charlevoix. Notre équipe passionnée est fière de réaliser vos projets depuis 2010 et continue de contribuer au bien-être de ses clients année après année. Nous sommes impatients de pouvoir réaliser vos projets futurs!
            </p>
            <p className="text-gray-400 leading-relaxed">
              Nous sélectionnons nos projets pour garantir une attention totale. Si nous ne pouvons pas le faire parfaitement, nous ne le faisons pas.
            </p>
          </div>
        </div>
      </div>

      {/* Values Strip */}
      <div className="bg-surface py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Rigueur", text: "Tolérance zéro pour l'imprécision." },
              { icon: HeartHandshake, title: "Transparence", text: "Des devis clairs comme de l'eau de roche." },
              { icon: Clock, title: "Ponctualité", text: "Votre temps est aussi précieux que le nôtre." },
              { icon: HardHat, title: "Sécurité", text: "Des chantiers propres et sécuritaires." }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full border border-gray-800 flex items-center justify-center text-gray-500 mb-6 group-hover:border-primary group-hover:text-primary transition-all duration-300">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Quote */}
      <div className="py-32 container mx-auto px-4 text-center">
        <Quote size={48} className="text-primary mx-auto mb-8 opacity-50" />
        <h2 className="text-2xl md:text-4xl font-heading font-light italic text-white max-w-4xl mx-auto leading-relaxed mb-8">
          "La qualité n'est jamais un accident ; c'est toujours le résultat d'un effort intelligent."
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-1 bg-gray-800"></div>
          <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">L'équipe de direction</p>
          <div className="w-12 h-1 bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
};