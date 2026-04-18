'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getDashboardData() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const [
    { data: leads },
    { data: projects },
    { data: tasks },
    { count: totalLeads },
    { count: activeProjects },
  ] = await Promise.all([
    supabase.from('leads').select('*').order('created_at', { ascending: false }),
    supabase.from('projects').select('*').order('created_at', { ascending: false }),
    supabase.from('tasks').select('*').order('due_date', { ascending: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'Active'),
  ])

  return {
    leads: leads || [],
    projects: projects || [],
    tasks: tasks || [],
    metrics: {
      totalLeads: totalLeads || 0,
      activeProjects: activeProjects || 0,
    }
  }
}

export async function updateLeadStatus(id: string, status: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  await supabase.from('leads').update({ status }).eq('id', id)
  revalidatePath('/admin/dashboard')
}

export async function updateProjectStatus(id: string, status: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  await supabase.from('projects').update({ status }).eq('id', id)
  revalidatePath('/admin/dashboard')
}

export async function updateTaskStatus(id: string, status: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  await supabase.from('tasks').update({ status }).eq('id', id)
  revalidatePath('/admin/dashboard')
}

export async function createLead(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const first_name = formData.get('first_name') as string
  const last_name = formData.get('last_name') as string
  const email = formData.get('email') as string
  const service = formData.get('service') as string
  const budget = formData.get('budget') as string
  
  const { error } = await supabase.from('leads').insert([{ first_name, last_name, email, service, budget }])
  if (error) return { error: error.message }
  
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function createProject(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const name = formData.get('name') as string
  const budget = formData.get('budget') as string
  const status = formData.get('status') as string
  const deadline = formData.get('deadline') as string
  
  const { error } = await supabase.from('projects').insert([{ 
    name, 
    budget, 
    status: status || 'Active', 
    deadline: deadline || null 
  }])
  if (error) return { error: error.message }
  
  revalidatePath('/admin/dashboard')
  return { success: true }
}

export async function createTask(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const title = formData.get('title') as string
  const priority = formData.get('priority') as string
  const status = formData.get('status') as string
  const due_date = formData.get('due_date') as string
  
  const { error } = await supabase.from('tasks').insert([{ 
    title, 
    priority: priority || 'Medium', 
    status: status || 'Pending', 
    due_date: due_date || null 
  }])
  if (error) return { error: error.message }
  
  revalidatePath('/admin/dashboard')
  return { success: true }
}
