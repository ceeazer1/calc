import { createClient } from '@vercel/kv';

let kv = null;

export function getKvClient() {
    if (!kv) {
        kv = createClient({
            url: process.env.KV_REST_API_URL,
            token: process.env.KV_REST_API_TOKEN,
        });
    }
    return kv;
}
