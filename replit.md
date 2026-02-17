# KSA Beheer

## Overview
KSA Beheer is a management app for KSA Aalter, a Belgian youth organization. It helps leaders (leiding) manage drink tracking (strepen), fries ordering, agenda/events, notifications, and team roles.

## Tech Stack
- React 19 with TypeScript
- Vite dev server on port 5000
- Tailwind CSS (via CDN)
- Supabase client (configured but using mock data currently)

## Project Structure
- `App.tsx` - Main app with routing and state management
- `index.tsx` - React entry point
- `index.html` - HTML shell with Tailwind config
- `types.ts` - TypeScript interfaces
- `lib/data.ts` - Mock user data
- `lib/supabase.ts` - Supabase client setup
- `screens/` - All screen components (Home, Strepen, Fries, Agenda, Settings, etc.)
- `components/` - Shared components (BottomNav, ChevronBack)
- `vite.config.ts` - Vite configuration

## Key Features
- Drink tracking (Strepen) with balance management
- Fries ordering system with session management
- Event/agenda management
- Notification system (official, nudge, agenda types)
- Team drink management (stock, billing, invoices)
- Role management

## Running
- `npm run dev` starts the Vite dev server on port 5000
