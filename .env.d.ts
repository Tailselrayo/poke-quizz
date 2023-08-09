declare global{
    namespace NodeJS{
        interface ProcessEnv{
           NEXT_PUBLIC_POKEAPI_URL:string;
           NEXT_PUBLIC_POKESPRITE_URL:string;
           NEXT_PUBLIC_SUPABASE_PASSWORD:string;
           NEXT_PUBLIC_SUPABASE_URL:string;
           NEXT_PUBLIC_SUPABASE_ANON_KEY:string;
           NEXT_PUBLIC_BADGESPRITE_URL:string;
        }
    }
}
export {}