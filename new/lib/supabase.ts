import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://pinkxvufkzcuffnrxsgd.supabase.co', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbmt4dnVma3pjdWZmbnJ4c2dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA3MTgxOTgsImV4cCI6MjAxNjI5NDE5OH0.YPt83GxNrBa64ubdh8vzGbCHvCUFINAqdy2uVNZ6wCI")

export default supabase