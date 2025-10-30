export interface Annoucements {
  id: number;
  headline?: string;
  message: string;
  cta?: string | number;
}

export interface Event {
  id: number;
  title?: string;
  date?: string;
  description?: string;
  location?: string;
}