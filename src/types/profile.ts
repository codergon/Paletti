export type Hue = {
  color?: string;
  shades?: string[];
  id?: string;
  name?: string | (string | boolean)[];
};

export type Collection = {
  [key: string]: Hue;
};
