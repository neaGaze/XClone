'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const likeTweet = async (formData: FormData) => {
    const like_value = formData.get("like_value");
    const tweet_id = formData.get("tweet_id");
    console.log(`${!!like_value ? "Unl" : "L"}iking the tweet. Like Id: ${like_value}`)


    const supabase = createServerComponentClient({ cookies })
    const user = await supabase.auth.getUser()
    const profile = user.data.user
    console.log("supabase client: ", profile?.email)

    // unlike function
    if (like_value) {
        const { error } = await supabase.from('likes').delete().eq('id', like_value)
        console.log(`Delete result from supabase. Error: ${error}`)
        return { error: error }
    }

    // LIKE function
    const { data, error } = await supabase.from('likes').insert([{ id: randomUUID(), user_id: profile?.id, tweet_id: tweet_id }]).select()
    // console.log("Sending ", tweet, " by ", profile?.email)
    console.log(`LIKE RESULT: data: ${JSON.stringify(data)}, error: ${error?.message}`)
    if (!!error) {
        return { error: error }
    }

    // revalidatePath('/');
    // console.log(`Tweet LIKE Result: ${data}. \n Error: ${error}`)
    return { data: data, error: error }
}