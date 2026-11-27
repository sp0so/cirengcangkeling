// Supabase Services Wrapper
// Handles both connected Supabase client and graceful fallback

import { createClient } from '../supabase/client';

export function getClientSafe() {
  try {
    return createClient();
  } catch (err) {
    console.warn('Supabase client initialization skipped (environment variables missing or invalid). Operating in local storage mode with empty initial state.');
    return null;
  }
}

export async function checkSupabaseConnection(): Promise<boolean> {
  const supabase = getClientSafe();
  if (!supabase) return false;

  try {
    const { error } = await supabase.from('business_profiles').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
}
