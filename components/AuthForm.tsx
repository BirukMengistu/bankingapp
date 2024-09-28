'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import CustomeInput from './ui/CustomeInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'


const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const formSchema = authFormSchema(type)
    const router = useRouter()

    //define form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if (type === 'sign-up') {
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                }
                const newUser = await signUp(userData);
            }
           
            //setUser(newUser);
            if(type === 'sign-in') {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                  })
                 console.log(response)
                if(response) router.push('/')
                }
        }
        catch (error){
            console.log(error)
        }
        setIsLoading(true)
        console.log(data)
        setIsLoading(false)
    }
    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/'
                    className='cursor-pointer flex items-center gap-1'>
                    <Image
                        src='/icons/logo.svg'
                        width={34}
                        height={34}
                        alt='nav-logo'
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>BGS BANK</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                        {
                            user ? 'Link Accout' : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                        }
                    </h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 'Link you account to get started' : 'Please enter your details'}
                    </p>

                </div>
            </header>

            {
                user ? (<div className='flex flex-col gap-4'>
                    {/*   */}
                </div>) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className="flex gap-4">
                                        <CustomeInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                                        <CustomeInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                                    </div>
                                    <CustomeInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                                    <CustomeInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                                    <div className="flex gap-4">
                                        <CustomeInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                                        <CustomeInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                                    </div>
                                    <div className="flex gap-4">
                                        <CustomeInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                                        <CustomeInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                                    </div>

                                </>

                            )}
                            {type === 'sign-in' && (
                                <>

                                    <CustomeInput
                                        control={form.control}
                                        name='email'
                                        placeholder='Enter your email'
                                        label='Email' />
                                    <CustomeInput
                                        control={form.control}
                                        name='password'
                                        placeholder='Enter your Password'
                                        label='Password' />
                                </>

                            )}

                            <Button type="submit"
                                className='form-btn'
                                disabled={isLoading}>
                                {isLoading ? (<>
                                    <Loader2 size={20} className='animate-spin'> &nbsp;Loading....
                                    </Loader2>


                                </>) : type === 'sign-in' ? 'sign in' : 'Sign up'}</Button>
                        </form>
                    </Form>
                )
            }

        </section>
    )
}

export default AuthForm

