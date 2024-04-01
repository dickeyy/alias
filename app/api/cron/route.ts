import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
    try {
        // set any supabase.game objects with a created_at > 3 days earlier to inactive
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .eq("active", true)
            // .lt("created_at", (new Date().getTime() / 1000 - 1).toFixed(0)); // for testing
            .lt("created_at", (new Date().getTime() / 1000 - 86400 * 3).toFixed(0));
        // 86400 seconds = 24 hours * 3 = 3 days, so any game older than 3 days will be set to inactive if it is still active and has not been updated
        // just hopefully no one is playing a game for 3 days straight

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

            return new Response("done");
        }
    } catch (error) {
        return new Response(error as any);
    }
}
