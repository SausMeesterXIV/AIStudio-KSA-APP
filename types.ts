export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  balance: number;
}

export interface Drink {
  id: string;
  name: string;
  price: number;
  icon: string;
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