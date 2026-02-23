export interface User {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  role: 'Hoofdleiding' | 'Sfeerbeheer' | 'Drank' | 'Financiën' | 'Materiaal' | 'Leiding' | 'Kookploeg';
  balance: number;
  status: 'online' | 'offline';
  quickDrinkId?: string;
}

export interface Quote {
  id: string;
  text: string;
  authorName: string;
  likes: string[]; // Array of user IDs who liked it
  dislikes: string[]; // Array of user IDs who disliked it
  timestamp: Date;
}

export interface Notification {
  id: number;
  type: 'official' | 'agenda' | 'nudge';
  sender: string;
  role: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  action?: string;
  icon?: string;
  color?: string;
}

export interface Drink {
  id: string | number;
  name: string;
  price: number;
  isTemporary?: boolean;
  validUntil?: string;
}

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  totalPrice: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface StockItem {
  id: number;
  name: string;
  category: string;
  count: number;
  unit: string;
  exp: string;
  urgent: boolean;
  icon: string;
  label: string;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  startTime: string;
  description?: string;
  type: string;
  responsible?: string;
}

export interface CountdownItem {
  id: string;
  title: string;
  targetDate: Date;
}

export interface Streak {
  id: string;
  userId: string;
  drinkId: string | number;
  drinkName: string;
  price: number;
  timestamp: Date;
}
