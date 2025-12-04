import emailjs from '@emailjs/browser';
import { ContactData, EstimateData } from '../types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ESTIMATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ESTIMATE as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const FORMSUBMIT_EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL as string;

const ensureEmailJsConfigured = (template: string) => {
  if (!SERVICE_ID || !template || !PUBLIC_KEY) {
    throw new Error('EmailJS non configuré : SERVICE_ID, TEMPLATE_ID ou PUBLIC_KEY manquant.');
  }
};

export const sendContactEmail = async (data: ContactData): Promise<void> => {
  if (!FORMSUBMIT_EMAIL) {
    throw new Error('Formsubmit non configuré : VITE_FORMSUBMIT_EMAIL manquant.');
  }

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('phone', data.phone);
  formData.append('subject', data.subject);
  formData.append('message', data.message);
  formData.append('_subject', `Contact - ${data.subject || 'N/A'}`);
  formData.append('_template', 'table');
  formData.append('_captcha', 'false');

  const res = await fetch(`https://formsubmit.co/${encodeURIComponent(FORMSUBMIT_EMAIL)}`, {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Échec de l'envoi du message : ${res.status} ${errText}`);
  }
};

export const sendEstimateEmail = (data: EstimateData): Promise<void> => {
  ensureEmailJsConfigured(TEMPLATE_ESTIMATE);
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ESTIMATE,
    {
      ...data,
      fullName: `${data.firstName} ${data.lastName}`.trim()
    },
    { publicKey: PUBLIC_KEY }
  ).then(() => undefined);
};
