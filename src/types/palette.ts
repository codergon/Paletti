export type Hue = {
  id: string;
  color: string;
  userId?: string;
  shades?: string[];
  createdAt: number;
  name: string | (string | boolean)[];
  displayName: string | (string | boolean)[];
};

export type StatusMsg = {
  message: string;
  type: 'success' | 'error';
} | null;

export type PaletteType = {
  id: string;
  name: string;
  colors: Hue[];
  pinned?: boolean;
  createdAt: number;
  lastUpdated: number;
};

export interface SubPaletteType {
  id: string;
  name?: string;
  colors?: Hue[];
  pinned?: boolean;
  createdAt?: number;
  lastUpdated?: number;
}

export type Collection = PaletteType[];
