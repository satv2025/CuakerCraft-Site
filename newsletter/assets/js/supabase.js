import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ⚠️ REEMPLAZÁ ESTO CON TU PROYECTO SUPABASE
const SUPABASE_URL = "https://rhvqbvppybeanjfbizcz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJodnFidnBweWJlYW5qZmJpemN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTE3NDIsImV4cCI6MjA3OTkyNzc0Mn0.XI9B66ka3e8o2ClBJHeI43G5XvmKuN_TAMWE2z--CKI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);