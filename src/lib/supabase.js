// lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// replace these with your Supabase credentials
const SUPABASE_URL = "https://asvqzdvifkriljxrlrhd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdnF6ZHZpZmtyaWxqeHJscmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5OTkyMzUsImV4cCI6MjA3MzU3NTIzNX0.c4VGE9LZvtoUX-eVchsBN_DIbbfFuye04_Weiuewc_g";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
