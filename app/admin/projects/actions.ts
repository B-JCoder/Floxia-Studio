'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function getProjects() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*, onboarding_clients(company_name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects || []
}

export async function updateProjectStatus(id: string, status: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { error } = await supabase
    .from('projects')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error('Error updating project status:', error)
    return { error: error.message }
  }

  revalidatePath('/admin/projects')
  return { success: true }
}

export async function getProject(id: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: project, error } = await supabase
    .from('projects')
    .select('*, onboarding_clients(*)')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching project:', error)
    return null
  }

  return project
}

export async function getProjectMilestones(projectId: string) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: milestones, error } = await supabase
    .from('milestones')
    .select('*')
    .eq('project_id', projectId)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching milestones:', error)
    return []
  }

  return milestones || []
}
