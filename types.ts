
import { translations } from './translations';

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
  nameKey: keyof typeof translations['zh-CN'];
  price: number;
  spidersPerDayKey: keyof typeof translations['zh-CN'] | string; // Special case for numbers
  featuresKeys: (keyof typeof translations['zh-CN'])[];
  recommendedForKey: keyof typeof translations['zh-CN'];
}
