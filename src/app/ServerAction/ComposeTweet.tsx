'use server'
import { Database } from '@/lib/database.types'
import { createRouteHandlerClient, createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

// const supabase = createServerActionClient<Database>({ cookies })


export default async function composeTweet(formData: FormData) {
  const tweet = formData.get('tweet')
  const supabase = createRouteHandlerClient({ cookies })
  const user = await supabase.auth.getUser()
  const profile = user.data.user
  console.log("supabase client: ", profile?.email)

  if (!tweet) {
    return false;
  }

  const { data, error } = await supabase.from('tweets').insert({id: randomUUID(), user_id: profile?.id, text: tweet})
  console.log("Sending ", tweet, " by ", profile?.email)
  console.log("Result: ", data || error)
}
