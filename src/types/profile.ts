export type Hue = {
  id: string;
  color: string;
  user_id: string;
  shades: string[];
  date_created: number;
  name: string | (string | boolean)[];
  display_name: string | (string | boolean)[];
};

export type StatusMsg = {
  message: string;
  type: 'success' | 'error';
} | null;

export type Collection = Hue[];
