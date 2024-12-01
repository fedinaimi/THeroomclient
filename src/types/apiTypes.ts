export interface Chapter {
    _id: string;
    name: string;
    image: string;
    playerNumber: number;
    time: number;
    difficulty: 'easy' | 'medium' | 'hard';
    description: string;
    place: string;
  }
  
  export interface Scenario {
    _id: string;
    name: string;
    category: string;
    chapters: string[];
    createdAt: string;
  }
  
  export interface Reservation {
    _id?: string; // Facultatif
    chapterId?: string; // Facultatif
    date?: string; // Facultatif
    playerCount?: number; // Facultatif
    user?: string; // Facultatif
    scenario: string;
    chapter: string;
    timeSlot: string;
    name: string;
    email: string;
    phone: string;
    language: string;
    status: string;
  }
  
  