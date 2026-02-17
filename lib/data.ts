
import { User } from '../types';

// The currently logged in user (for headers etc)
export const CURRENT_USER_ID = '1';

// Central source of truth for all users in the app
export const MOCK_USERS: User[] = [
  { 
    id: '1', 
    name: 'Jan Janssens', 
    nickname: 'De Lange',
    role: 'Hoofdleiding', 
    avatar: 'https://i.pravatar.cc/150?u=jan', 
    roles: ['Hoofdleiding', 'Financiën'], 
    balance: 25.00,
    status: 'online'
  },
  { 
    id: '2', 
    name: 'Lukas Vermeulen', 
    nickname: 'Luuk',
    role: 'Leiding', 
    avatar: 'https://i.pravatar.cc/150?u=lukas', 
    roles: ['Financiën'], 
    balance: -42.50,
    status: 'online'
  },
  { 
    id: '3', 
    name: 'Sarah De Smet', 
    // No nickname set for Sarah to test fallback
    role: 'Penningmeester', 
    avatar: 'https://i.pravatar.cc/150?u=sarah', 
    roles: ['Sfeerbeheer', 'Drank'], 
    balance: -12.00,
    status: 'offline'
  },
  { 
    id: '4', 
    name: 'Thomas De Vries', 
    nickname: 'Vrieze',
    role: 'Leiding Knapen', 
    avatar: 'https://i.pravatar.cc/150?u=thomas', 
    roles: [], 
    balance: -4.50,
    status: 'offline'
  },
  { 
    id: '5', 
    name: 'Emma Luyten', 
    nickname: 'Ems',
    role: 'Leiding', 
    avatar: 'https://i.pravatar.cc/150?u=emma', 
    roles: ['Materiaal'], 
    balance: -15.00,
    status: 'offline'
  },
  { 
    id: '6', 
    name: 'Jonas De Bruyne', 
    nickname: 'Jones',
    role: 'Sfeermanager', 
    avatar: 'https://i.pravatar.cc/150?u=jonas', 
    roles: ['Sfeerbeheer'], 
    balance: 8.50,
    status: 'online'
  },
  { 
    id: '7', 
    name: 'Lisa Peeters', 
    role: 'Leiding', 
    avatar: 'https://i.pravatar.cc/150?u=lisa', 
    roles: ['Sfeerbeheer'], 
    balance: -2.00,
    status: 'offline'
  },
  { 
    id: '8', 
    name: 'Kobe Mertens', 
    nickname: 'Kobeh',
    role: 'Leiding Sloebers', 
    avatar: 'https://i.pravatar.cc/150?u=kobe', 
    roles: [], 
    balance: -8.00,
    status: 'online'
  },
  { 
    id: '9', 
    name: "Marie D'hondt", 
    role: 'Leiding Jonghernieuwers', 
    avatar: 'https://i.pravatar.cc/150?u=marie', 
    roles: [], 
    balance: -12.00,
    status: 'offline'
  },
  { 
    id: '10', 
    name: 'Lars Peeters', 
    nickname: 'Lorre',
    role: 'Materiaalmeester', 
    avatar: 'https://i.pravatar.cc/150?u=lars', 
    roles: ['Materiaal'], 
    balance: 0.00,
    status: 'online'
  }
];

export const getCurrentUser = () => MOCK_USERS.find(u => u.id === CURRENT_USER_ID) || MOCK_USERS[0];
