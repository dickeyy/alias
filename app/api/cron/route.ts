export const dynamic = "force-dynamic"; // static by default, unless reading the request

async function pingSupabase() {
    const res = await fetch("https://pinkxvufkzcuffnrxsgd.supabase.co", {
        method: "GET"
    });
    console.log(res);
    return res;
}

export async function GET(request: Request) {
    try {
        pingSupabase();

        return new Response("pong");
    } catch (error) {
        return new Response(":(");
    }
}
