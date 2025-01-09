export interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

export type PackageType = 'platinum' | 'gold' | 'silver' | string;