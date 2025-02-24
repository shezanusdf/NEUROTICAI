import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface BrandingSettings {
  id: string;
  account_id: string;
  logo_url: string;
  position: string;
  size_percentage: number;
  opacity: number;
  custom_colors: {
    primary?: string;
    secondary?: string;
  };
}

export async function getBrandingForAccount(accountId: string) {
  const { data, error } = await supabase
    .from('branding_settings')
    .select('*')
    .eq('account_id', accountId)
    .single()
  
  if (error) throw error
  return data as BrandingSettings
}
