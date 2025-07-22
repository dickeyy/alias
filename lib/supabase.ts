import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
    "https://tvuqsddnghluubucrmxo.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2dXFzZGRuZ2hsdXVidWNybXhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxNDg3MTEsImV4cCI6MjA2ODcyNDcxMX0._DkpUbdzv-quEIe1qwrXUB5mYUJTARdecQTmoa8285s"
);

export { supabase };
