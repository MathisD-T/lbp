import { LucideIcon } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  description: string;
  images?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}

export interface ContactData {
  name: string;
  phone: string;
  subject: string;
  message: string;
}

export interface EstimateData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredContact: string;
  address: string;
  city: string;
  postalCode: string;
  propertyType: string;
  propertyStatus: string;
  constructionYear: string;
  serviceType: string;
  budget: string;
  timeframe: string;
  hasPlans: string;
  description: string;
  source: string;
}
