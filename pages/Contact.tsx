import React, { useState } from 'react';
import { Button, Input, TextArea } from '../components/UI';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { sendContactEmail } from '../services/email';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    contactPhone: '',
    contactSubject: '',
    contactMessage: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('');
    setError('');

    sendContactEmail({
      name: formData.contactName,
      phone: formData.contactPhone,
      subject: formData.contactSubject,
      message: formData.contactMessage
    })
      .then(() => {
        setStatusMessage('Message envoyé, nous vous contactons rapidement.');
        setFormData({
          contactName: '',
          contactPhone: '',
          contactSubject: '',
          contactMessage: ''
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible d'envoyer votre message pour le moment.");
      })
      .finally(() => setIsSending(false));
  };

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12 text-center">Contactez-nous</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-8">
            <div className="bg-surface p-8 rounded-2xl border border-gray-800">
              <h3 className="text-2xl font-bold font-heading mb-6 text-white">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Téléphone</span>
                    <a href="tel:+14183243232" className="text-lg font-semibold hover:text-primary transition-colors">+1 (418) 324-3232</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Courriel</span>
                    <a href="mailto:info@lesbeauxprojets.com" className="text-lg font-semibold hover:text-primary transition-colors">info@lesbeauxprojets.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Adresse</span>
                    <p className="text-lg font-semibold">2020 Bd de Comporté, <br/>La Malbaie, QC, G5A 1N1</p>
                  </div>
                </div>

                 <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-400 mb-1">Heures d'ouverture</span>
                    <p className="text-gray-200">Lundi - Jeudi: 8h00 - 17h00</p>

                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-800 w-full h-64 rounded-2xl overflow-hidden relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1377853.5170614235!2d-72.11727102216402!3d47.58490501806876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cbf6fdc1777cd35%3A0x4665e425f3bc01f5!2sCharlevoix%2C%20QC!5e0!3m2!1sfr!2sca!4v1764790120666!5m2!1sfr!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/70 px-4 py-2 rounded text-sm text-primary font-bold backdrop-blur-sm">
                  Zone desservie : Charlevoix et environs
                </span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-surface p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold font-heading mb-6 text-white">Envoyez un message</h3>
            {statusMessage && (
              <div className="mb-4 text-green-400 text-sm">{statusMessage}</div>
            )}
            {error && (
              <div className="mb-4 text-red-400 text-sm">{error}</div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input id="contactName" label="Nom complet" placeholder="Votre nom" required value={formData.contactName} onChange={handleChange} />
                <Input id="contactPhone" label="Téléphone" placeholder="Votre numéro" required value={formData.contactPhone} onChange={handleChange} />
              </div>
              <Input id="contactSubject" label="Sujet" placeholder="Information générale" required value={formData.contactSubject} onChange={handleChange} />
              <TextArea id="contactMessage" label="Message" placeholder="Comment pouvons-nous vous aider ?" required value={formData.contactMessage} onChange={handleChange} />
              <Button type="submit" fullWidth disabled={isSending}>
                {isSending ? 'Envoi en cours...' : 'Envoyer'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
