import { createClient } from "@supabase/supabase-js";
const url = "https://example.supabase.co";
const key = "dummy";
const supabase = createClient(url, key);
export {
  supabase
};
