import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// You'll want to store this in your .env.local file
const API_KEY = process.env.CRON_API_KEY;

export async function GET(request: Request) {
    try {
        // Check for authorization header
        const authHeader = request.headers.get("authorization");

        if (!authHeader || authHeader !== `Bearer ${API_KEY}`) {
            return new Response("Unauthorized", { status: 401 });
        }

        const { data, error } = await supabase
            .from("games")
            .select("*")
            .eq("active", true)
            .lt("created_at", (new Date().getTime() / 1000 - 86400 * 3).toFixed(0)); // 3 days

        if (error) {
            return new Response(error.message);
        }

        if (data) {
            for (const game of data) {
                const { error } = await supabase
                    .from("games")
                    .update({ active: false, code: -1 })
                    .eq("id", game.id);

                if (error) {
                    return new Response(error.message);
                }
            }

            console.log("kept supabase alive");
            return new Response("done");
        }
    } catch (error) {
        return new Response(error as any);
    }
}
