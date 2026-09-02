export type CareCategory =
  | 'all'
  | 'vet'
  | 'emergency'
  | 'ambulance'
  | 'ngo'
  | 'boarding'
  | 'grooming'
  | 'diagnostics';

export type SpeciesType = 'Dogs' | 'Cats' | 'Birds' | 'Rabbits' | 'Exotics' | 'Community Animals';

export interface Doctor {
  name: string;
  designation: string;
  experience: string;
  degree: string;
  specialization?: string;
  image?: string;
}

export interface ProviderReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  petType?: string;
  verifiedPatient?: boolean;
  avatarUrl?: string;
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  type: 'Veterinary Clinic' | 'Veterinarian' | 'Emergency Veterinary Care' | 'Animal Ambulance' | 'NGO / Rescue' | 'Boarding';
  category: 'vet' | 'emergency' | 'ambulance' | 'ngo' | 'boarding';
  location: string;
  address: string;
  landmark?: string;
  pincode: string;
  latitude: number;
  longitude: number;
  distance: number; // in km
  rating: number;
  reviewCount: number;
  phone: string;
  emergencyPhone?: string;
  openingHours: string;
  isOpenNow: boolean;
  closesAt?: string;
  emergencyAvailable: boolean;
  consultationFee: number;
  services: string[];
  species: string[];
  verified: boolean;
  imageUrl: string;
  logoUrl?: string;
  about: string;
  doctors: Doctor[];
  reviews: ProviderReview[];
  facilities: string[];
  emergencyNote?: string;
}

export interface AbnormalValue {
  testName: string;
  value: string | number;
  unit?: string | null;
  referenceRange?: string | null;
  explanation: string;
}

export interface NormalValue {
  testName: string;
  value: string | number;
  unit?: string | null;
  referenceRange?: string | null;
}

export interface AIReportResult {
  id: string;
  createdAt: string;
  fileName: string;
  petName: string;
  species: string;
  age?: string | null;
  breed?: string | null;
  reportType: string;
  date?: string | null;
  summary: string;
  urgencyLevel: 'Low' | 'Moderate' | 'High / Urgent';
  keyFindings: string[];
  abnormalValues: AbnormalValue[];
  normalValues: NormalValue[];
  recommendedQuestions: string[];
  disclaimer: string;
  confidenceScore?: number;
}

export interface FilterState {
  searchQuery: string;
  category: CareCategory;
  openNow: boolean;
  maxDistance: number | null; // e.g. 5, 10, 25, null (all)
  emergencyOnly: boolean;
  species: string[];
  selectedService: string | null;
  sortBy: 'recommended' | 'distance' | 'rating' | 'fee_low' | 'fee_high';
}

export interface PetProfile {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  gender: 'Male' | 'Female';
  avatarUrl: string;
  microchipId?: string;
  lastVaccination?: string;
  bloodGroup?: string;
  knownConditions?: string[];
}
