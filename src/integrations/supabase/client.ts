// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sxtpkcxdbswfrystzzep.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4dHBrY3hkYnN3ZnJ5c3R6emVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTA5MTUsImV4cCI6MjA2ODM4NjkxNX0.VT_HDYBjqCLyw5GfYlKmljUYGniy6tDM0nnOHYTtoWo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});