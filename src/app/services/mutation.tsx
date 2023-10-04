import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { TweetLikeProps, TweetsProps } from "../types/Props"
import { randomUUID } from "crypto"

export const likeTweet = async ({ user_id, tweet_id }: TweetLikeProps) => {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.from('likes').insert([
        { id: randomUUID(), user_id: user_id, tweeet_id: tweet_id }
    ])
    .select()

    // console.log("Tweet LIKES: ", data)
    return data
}