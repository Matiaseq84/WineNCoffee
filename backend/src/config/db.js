import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config() //carga las variables del .env

export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);