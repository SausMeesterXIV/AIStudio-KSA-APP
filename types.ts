
export interface User {
  id: string;
  name: string;
  nickname?: string; // New field for display name
  role: string; // Display role e.g. "Hoofdleiding"
  avatar: string;
  balance: number;
  roles: string[]; // Functional roles e.g. ["Drank", "Financiën"]
  status?: 'online' | 'offline';
}

export interface Drink {
  id: string | number;
  name: string;
  price: number;
  icon?: string; // Icon is now optional
  isTemporary?: boolean;
  validUntil?: string; // ISO date string
}

export interface FryItem {
  id: string;
  name: string;
  price: number;
  category: 'frieten' | 'snacks' | 'sauzen';
  description?: string;
}

export interface CartItem extends FryItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  date: Date;
  status: 'pending' | 'completed';
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: string;
  startTime: string;
  endTime?: string;
  responsible?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  amount: number; // positive for drinks added
  type: 'drink' | 'food';
  timestamp: string;
  details: string;
}

export interface Notification {
  id: number;
  type: 'official' | 'nudge' | 'agenda' | 'order';
  sender: string;
  role: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  action: string;
  icon: string;
  color: string;
}