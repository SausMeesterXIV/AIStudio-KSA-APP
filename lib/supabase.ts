import { createClient } from '@supabase/supabase-js';

// Vervang deze met jouw eigen Supabase URL en Anon Key
// In een echt project gebruik je import.meta.env.VITE_SUPABASE_URL
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://jouw-project.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'jouw-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);