import emailjs from '@emailjs/browser';
import { ContactData, EstimateData } from '../types';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT as string;
const TEMPLATE_ESTIMATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ESTIMATE as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const ensureConfigured = (template: string) => {
  if (!SERVICE_ID || !template || !PUBLIC_KEY) {
    throw new Error('EmailJS non configuré : SERVICE_ID, TEMPLATE_ID ou PUBLIC_KEY manquant.');
  }
};

export const sendContactEmail = (data: ContactData): Promise<void> => {
  ensureConfigured(TEMPLATE_CONTACT);
  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_CONTACT,
    {
      name: data.name,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    },
    { publicKey: PUBLIC_KEY }
  ).then(() => undefined);
};

export const sendEstimateEmail = (data: EstimateData): Promise<void> => {
  ensureConfigured(TEMPLATE_ESTIMATE);
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
