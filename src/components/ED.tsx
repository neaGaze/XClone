'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './ui/dialog';
import { Input } from './ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { toast } from 'sonner'



export const ED = () => {
    const redirectUrl = 'http://localhost:3001'
    const supabase = createClientComponentClient()
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        supabase.auth.getSession().then((res) => {
            console.log({ res })
            if (!res.data.session) {
                setIsOpen(true);
            }
        })
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className='border-none rounded-full'>
                <form onSubmit={async (e) => {
                    e.preventDefault()

                    setIsLoading(true)

                    const { data, error } = await supabase.from("profiles").select().eq("username", username.trim())

                    if (data && data.length > 0) {
                        setIsLoading(false)
                        // return toast.error('Username already found')
                    }

                    if (error) {
                        setIsLoading(false)
                        return toast.error(error.message)
                    }

                    await supabase.auth.signInWithOtp({
                        email: email.trim(),
                        options: {
                            emailRedirectTo: redirectUrl,
                            data: {
                                username: username.trim()
                            }
                        }
                    })

                    setIsLoading(false)

                }}>
                    <div className='flex flex-col space-y-4 text-white'>
                        <Label className='text-3xl font-bold py-4'>Sign in to X</Label>
                        <Input type="email" placeholder='Email' className='border-opacity-80 border-gray-500/50 h-14' onChange={e => setEmail(e.target.value)}></Input>
                        <Input type="text" placeholder='Username' className='border-opacity-80 border-gray-500/50 h-14' onChange={e => setUsername(e.target.value)}></Input>
                        <Button disabled={isLoading} className='bg-white w-full text-black rounded-2xl'>Next</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
