'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getInvoices() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*, onboarding_clients(company_name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching invoices:', error)
    return []
  }

  return invoices || []
}

export async function createInvoice(data: any) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase.from('invoices').insert([data])

  if (error) {
    console.error('Error creating invoice:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/invoices')
  return { success: true }
}
