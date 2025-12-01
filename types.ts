export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export enum PackageType {
  BASIC = 'BASIC',
  HIGH_VOLUME = 'HIGH_VOLUME'
}

export interface SpiderPackage {
  id: PackageType;
  name: string;
  price: number;
  spidersPerDay: string;
  features: string[];
  recommendedFor: string;
}