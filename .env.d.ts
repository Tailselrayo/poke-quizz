declare global{
    namespace NodeJS{
        interface ProcessEnv{
           NEXT_PUBLIC_POKEAPI_URL:string;
           NEXT_PUBLIC_POKESPRITE_URL:string;
        }
    }
}
export {}