import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qrvzksosgrgsoibsisyk.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFydnprc29zZ3Jnc29pYnNpc3lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5OTI4NTMsImV4cCI6MjEwNjU2ODg1M30.6b_xpOEFWd4Gj9rK4d0lk3IPYqV7CyF0HQxv05CRipo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
