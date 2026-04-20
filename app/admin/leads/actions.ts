'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getLeads() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: leads, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return leads || []
}

export async function getLead(id: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: lead, error } = await supabase
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching lead:', error)
    return null
  }

  return lead
}

export async function updateLeadStatus(id: string, status: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating lead status:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/leads')
  return { success: true }
}

export async function createLead(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const email = formData.get('email') as string
  const service = formData.get('service') as string
  const budget = formData.get('budget') as string
  const status = formData.get('status') as string || 'New'
  
  const { error } = await supabase.from('leads').insert([{ 
    first_name, 
    last_name, 
    email, 
    service, 
    budget,
    status
  }])

  if (error) {
    console.error('Error creating lead:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/leads')
  return { success: true }
}
