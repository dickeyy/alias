import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export async function GET(request: Request) {
    try {
        // set any supabase.game objects with a created_at > 3 days earlier to inactive
        const { data, error } = await supabase
            .from("games")
            .select("*")
            .eq("active", true)
            .lt("created_at", (new Date().getTime() / 1000 - 86400 * 3).toFixed(0));

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
