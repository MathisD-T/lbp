import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, Plus, CheckCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEstimateEmail } from '../services/email';
import { Button } from '../components/UI';

export const Estimate: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const defaultService = searchParams.get('service');

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    type: '',
    budget: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    timeframe: '',
    hasPlans: '',
    message: ''
  });

  useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, type: defaultService }));
    }
  }, [defaultService]);

  const totalSteps = 3;

  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelect = (value: string) => {
    handleChange('type', value);
    setTimeout(() => setStep(2), 200);
  };

  const handleBudgetSelect = (value: string) => {
    handleChange('budget', value);
    setTimeout(() => setStep(3), 200);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Mapping to legacy data structure for compatibility
      const submissionData = {
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' ') || '',
        phone: formData.phone,
        email: formData.email,
        preferredContact: 'email',
        address: formData.address,
        city: formData.address,
        postalCode: '',
        propertyType: '',
        propertyStatus: '',
        constructionYear: '',
        serviceType: formData.type,
        budget: formData.budget,
        timeframe: formData.timeframe,
        hasPlans: formData.hasPlans,
        description: formData.message,
        source: ''
      };

      await sendEstimateEmail(submissionData as any);
      setIsSubmitted(true);
      window.scrollTo(0,0);
    } catch (err) {
      console.error(err);
      setError("Envoi impossible pour le moment. Merci de réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg px-4 relative z-10"
        >
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-black mx-auto mb-8 shadow-[0_0_30px_rgba(132,204,22,0.5)]">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl font-heading font-bold mb-6 text-white uppercase">Demande Reçue</h2>
          <p className="text-gray-400 mb-10 text-lg font-light leading-relaxed">
            Merci {formData.name.split(' ')[0]}. Votre projet est entre de bonnes mains. 
            Notre équipe d'estimation analysera votre demande et vous contactera sous 24 à 48 heures.
          </p>
          <Link to="/">
            <Button variant="white" size="lg">Retour à l'accueil</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-dark flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container px-6 max-w-5xl mx-auto relative z-10">
        
        {/* Header Step */}
        <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-6">
           <div>
             <span className="block font-sans text-primary text-xs uppercase tracking-widest mb-2 font-bold">Soumission</span>
             <h2 className="font-heading font-bold text-3xl text-white uppercase">Étape 0{step}</h2>
           </div>
           <div className="font-sans text-gray-500 text-xs uppercase tracking-widest font-bold">
             Sur 0{totalSteps}
           </div>
        </div>

        <div className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/5 text-white flex gap-4 items-start">
          <div className="mt-1 text-primary">
            <Info size={24} />
          </div>
          <div className="space-y-2 text-sm md:text-base text-gray-200">
            <p className="font-heading font-bold uppercase tracking-widest text-xs text-primary">Infos utiles pour une soumission rapide</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>Nom complet, courriel et téléphone pour vous joindre.</li>
              <li>Type de projet (rénovation, neuf, cuisine, agrandissement, etc.).</li>
              <li>Budget estimé et échéancier souhaité.</li>
              <li>Adresse du projet ou secteur approximatif.</li>
              <li>Brève description : superficie, pièces concernées, matériaux envisagés.</li>
              <li>Si possible, mentionnez s'il existe des plans, croquis ou photos de référence.</li>
            </ul>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
           <AnimatePresence mode="wait">
             {/* Step 1: Type */}
             {step === 1 && (
               <motion.div 
                 key="step1"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-16 leading-tight uppercase">
                   Nature du <span className="text-stroke-white text-transparent">Projet</span>
                 </h1>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {['Rénovation', 'Neuf', 'Commercial', 'Cuisine', 'Agrandissement', 'Autre'].map((item) => (
                     <button
                       key={item}
                       onClick={() => handleTypeSelect(item)}
                       className={`group relative p-8 text-left border transition-all duration-300 overflow-hidden ${formData.type === item ? 'border-primary bg-primary text-black' : 'border-white/20 hover:border-white text-white'}`}
                     >
                       <div className="flex justify-between items-start">
                          <span className="font-heading font-bold text-xl uppercase">{item}</span>
                          <Plus className={`opacity-0 group-hover:opacity-100 transition-opacity ${formData.type === item ? 'opacity-100' : ''}`} size={20} />
                       </div>
                     </button>
                   ))}
                 </div>
               </motion.div>
             )}

             {/* Step 2: Budget */}
             {step === 2 && (
               <motion.div 
                 key="step2"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-16 leading-tight uppercase">
                   Budget <span className="text-stroke-white text-transparent">Estimé</span>
                 </h1>
                 <div className="space-y-0 divide-y divide-white/10 border-y border-white/10">
                   {['25k - 50k', '50k - 100k', '100k - 250k', '250k - 500k', '500k +'].map((budget) => (
                     <div 
                       key={budget}
                       onClick={() => handleBudgetSelect(budget)}
                       className={`group cursor-pointer flex items-center justify-between py-8 px-4 hover:bg-white/5 transition-colors ${formData.budget === budget ? 'bg-white/5' : ''}`}
                     >
                       <span className={`font-heading text-3xl md:text-6xl font-bold uppercase transition-colors ${formData.budget === budget ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`}>{budget}</span>
                       <div className={`w-8 h-8 md:w-12 md:h-12 border rounded-full flex items-center justify-center transition-colors ${formData.budget === budget ? 'border-primary bg-primary text-black' : 'border-gray-800 group-hover:border-white text-transparent'}`}>
                          <Check size={20} className={formData.budget === budget ? 'opacity-100' : 'opacity-0'} />
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}

             {/* Step 3: Contact */}
             {step === 3 && (
               <motion.div 
                 key="step3"
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
               >
                 <h1 className="font-heading font-bold text-5xl md:text-7xl text-white mb-16 leading-tight uppercase">
                   Vos <span className="text-stroke-white text-transparent">Coordonnées</span>
                 </h1>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl">
                   <div className="space-y-12">
                     <div className="group relative">
                        <input 
                          type="text" 
                          id="name"
                          required
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans"
                          placeholder=" "
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <label htmlFor="name" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Nom Complet
                        </label>
                     </div>
                     <div className="group relative">
                        <input 
                          type="email" 
                          id="email"
                          required
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans"
                          placeholder=" "
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                        <label htmlFor="email" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Courriel
                        </label>
                     </div>
                     <div className="group relative">
                        <input 
                          type="tel" 
                          id="phone"
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans"
                          placeholder=" "
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                        <label htmlFor="phone" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Téléphone
                        </label>
                     </div>
                     <div className="group relative">
                        <input 
                          type="text" 
                          id="address"
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans"
                          placeholder=" "
                          value={formData.address}
                          onChange={(e) => handleChange('address', e.target.value)}
                        />
                        <label htmlFor="address" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Adresse ou secteur du projet
                        </label>
                     </div>
                     <div className="group relative">
                        <input 
                          type="text" 
                          id="timeframe"
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans"
                          placeholder=" "
                          value={formData.timeframe}
                          onChange={(e) => handleChange('timeframe', e.target.value)}
                        />
                        <label htmlFor="timeframe" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Échéancier souhaité
                        </label>
                     </div>
                   </div>
                   <div className="space-y-10">
                      <div className="group relative">
                        <label className="text-gray-500 text-xs uppercase tracking-widest font-bold block mb-3">Plans / photos disponibles ?</label>
                        <div className="flex gap-4">
                          {['Oui', 'Non'].map(choice => (
                            <button
                              key={choice}
                              type="button"
                              onClick={() => handleChange('hasPlans', choice)}
                              className={`px-4 py-3 border rounded-full text-sm font-bold uppercase tracking-widest transition-colors ${formData.hasPlans === choice ? 'border-primary bg-primary text-black' : 'border-white/20 text-white hover:border-white'}`}
                            >
                              {choice}
                            </button>
                          ))} 
                        </div>
                      </div>
                      <div className="group relative">
                        <textarea 
                          id="message"
                          required
                          className="peer w-full bg-transparent border-b border-white/20 py-4 text-xl text-white focus:outline-none focus:border-primary transition-colors font-sans h-40 resize-none"
                          placeholder=" "
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                        ></textarea>
                        <label htmlFor="message" className="absolute left-0 top-4 text-gray-500 text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-not-placeholder-shown:-top-6 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-primary uppercase font-bold tracking-widest pointer-events-none">
                          Détails du projet (Beaucoup de détails)
                        </label>
                      </div>
                   </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="flex items-center gap-6 mt-20">
             {step > 1 && (
               <button onClick={handlePrev} className="group flex items-center gap-2 text-gray-500 hover:text-white transition-colors uppercase font-bold tracking-widest text-xs px-6 py-4 border border-white/10 hover:border-white rounded-full">
                 <ArrowLeft size={16} /> Retour
               </button>
             )}
             
           {step === totalSteps && (
             <button 
               onClick={handleSubmit}
               disabled={isSubmitting}
               className="bg-white text-black px-10 py-4 font-heading font-bold text-sm uppercase tracking-widest hover:bg-primary transition-colors duration-300 flex items-center gap-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(132,204,22,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
             >
               {isSubmitting ? 'Envoi...' : 'Confirmer le projet'} <ArrowRight size={16} />
             </button>
           )}
          </div>

          {error && (
            <p className="text-red-400 mt-6 text-sm">{error}</p>
          )}

       </form>
      </div>
    </div>
  );
};
