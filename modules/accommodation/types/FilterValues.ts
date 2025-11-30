export type FilterValues = {
  capacity: number | null;
  bedroomCount: number; // Ensure this is always a number
  isInstant: boolean;
  categories: string[];
  notSharedFeatures: string[];
  pool: {
    exists: boolean;
    hasWarmWater: boolean;
    type: string[];
  };
  textureType: string[];
  featuresCategory: string[];
  parking: { type: string[]; capacity: number };
};