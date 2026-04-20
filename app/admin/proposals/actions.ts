'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getProposals() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*, leads(first_name, last_name, email)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching proposals:', error)
    return []
  }

  return proposals || []
}

export async function createProposal(formData: any) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { lead_id, title, total_amount, content } = formData

  const { error } = await supabase.from('proposals').insert([{ 
    lead_id, 
    title, 
    total_amount,
    content,
    status: 'Draft'
  }])

  if (error) {
    console.error('Error creating proposal:', error)
    return { error: error.message }
  }
  
  revalidatePath('/admin/proposals')
  return { success: true }
}
