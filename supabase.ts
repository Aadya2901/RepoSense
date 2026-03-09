import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rdbazefpvlwjnopqbpcx.supabase.co";
const supabaseKey = "sb_publishable_Ij3XA_rOYIIpM0DISnA6Xg_WkuGmI3h";

export const supabase = createClient(supabaseUrl, supabaseKey);