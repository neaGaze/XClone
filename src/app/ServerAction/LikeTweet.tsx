'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const likeTweet = async (formData: FormData) => {
    const like_value = formData.get("like_value");
    const tweet_id = formData.get("tweet_id");
    console.log(`Liking the tweet server logic: ${like_value}`)


    const supabase = createServerComponentClient({ cookies })
    const user = await supabase.auth.getUser()
    const profile = user.data.user
    console.log("supabase client: ", profile?.email)

    if (!like_value) {
        return { data: null, error: "Not supporting dislike button" }
    }

    const { data, error } = await supabase.from('likes').insert({ id: randomUUID(), user_id: profile?.id, tweet_id: tweet_id })
    // console.log("Sending ", tweet, " by ", profile?.email)
    console.log(`data: ${data}, error: ${error?.message}`)
    if (error) {
        return { data: null, error: error }
    }

    // revalidatePath('/');
}