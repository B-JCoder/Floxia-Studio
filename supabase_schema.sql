-- Supabase Schema for Floxia Studio Dashboard

-- 1. Admin Users (Team Management)
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all users" ON admin_users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Only admins can insert/update users" ON admin_users FOR ALL USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid() AND role = 'admin')
);

-- 2. Leads (From Contact Form)
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    budget TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'In Progress', 'Converted', 'Dead')),
    lifecycle_stage TEXT NOT NULL DEFAULT 'Lead' CHECK (lifecycle_stage IN ('Lead', 'Client', 'Completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anonymous users" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read/update for authenticated users only" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- 3. Onboarding Clients (From Onboarding Form)
CREATE TABLE IF NOT EXISTS onboarding_clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    industry TEXT,
    current_revenue TEXT,
    target_goals TEXT,
    amazon_store_link TEXT,
    status TEXT NOT NULL DEFAULT 'Reviewing' CHECK (status IN ('Reviewing', 'Approved', 'Rejected')),
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL, -- Optional link to original lead
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE onboarding_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for anonymous users" ON onboarding_clients FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read/update for authenticated users only" ON onboarding_clients FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Enable update for authenticated users only" ON onboarding_clients FOR UPDATE USING (auth.role() = 'authenticated');

-- 4. Projects (Linked to converted clients)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    client_id UUID REFERENCES onboarding_clients(id) ON DELETE CASCADE,
    budget NUMERIC,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'On Hold', 'Completed')),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- 5. Tasks (Assigned to Team Members)
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'Todo' CHECK (status IN ('Todo', 'In Progress', 'In Review', 'Done')),
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON tasks FOR ALL USING (auth.role() = 'authenticated');

-- 6. Future Goals
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    target_value NUMERIC NOT NULL,
    current_value NUMERIC DEFAULT 0,
    metric_type TEXT NOT NULL, -- e.g., 'Revenue', 'Leads', 'Projects'
    deadline DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'On Track' CHECK (status IN ('On Track', 'At Risk', 'Achieved', 'Missed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON goals FOR ALL USING (auth.role() = 'authenticated');

-- 7. Document Metadata
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    file_path TEXT NOT NULL, -- Path in Supabase Storage
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all for authenticated users" ON documents FOR ALL USING (auth.role() = 'authenticated');

-- Note: You also need to create a Storage Bucket named 'documents' in the Supabase Dashboard.
-- Set the bucket to "Public" if you want to share links easily, or keep it private and use signed URLs.
