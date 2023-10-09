'use server'
import { Database } from '@/lib/database.types'
import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { toast } from 'sonner'
import { TweetProps } from '../types/Props'

// const supabase = createServerActionClient<Database>({ cookies })


export async function composeTweet(formData: FormData) {
  const tweet = formData.get('tweet')
  const reply_to_tweet_id = formData.get('reply_to_tweet_id')

  console.log(`REPLY TO TWEET ID: ${reply_to_tweet_id}`);

  // const supabase = createRouteHandlerClient({ cookies })
  const supabase = createServerComponentClient({ cookies })

  const user = await supabase.auth.getUser()
  const profile = user.data.user
  console.log("supabase client: ", profile?.email)

  if (!tweet) {
    return { data: null, error: "Tweet couldn't be found" }
  }

  const { data, error } = await supabase.from('tweets').insert({ id: randomUUID(), user_id: profile?.id, text: tweet }).select()
  console.log("Sending ", tweet, " by ", profile?.email)
  const savedTweet = (data as TweetProps[])[0];
  console.log(`RESULT OF TWEET CREATE: ${JSON.stringify(savedTweet)}`)
  if (error) {
    return { data: null, error: error }
  }

  if(!!reply_to_tweet_id) {
    const {data, error} = await supabase.from('replies').insert([{ id: randomUUID(), user_id: profile?.id, tweet_id: reply_to_tweet_id, reply_id: savedTweet.id}]).select()
    console.log(`REPLY DB DATA: ${JSON.stringify(data)}. Error: ${error?.message}`);
    if(error) {
      return { data: null, error: error?.message }
    }
  }

  revalidatePath('/');

  return { data: "Tweet successfully sent" }
}