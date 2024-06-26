"use client"
import React from 'react'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const font = Montserrat({
    weight: "600",
    subsets: ["latin"],
})

const LandingNavbar = () => {
    const { userId, isSignedIn } = useAuth();
    return (
        <nav className='p-4 bg-transparent flex items-center justify-between'>
            <Link href="/" className='flex items-center'>
                <div className="relative h-10 w-12 mr-4">
                    <Image
                        fill
                        alt='Genius Logo'
                        src={"/logo.png"}
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Genius
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant={"outline"} className='rounded-full'>
                        Get started
                    </Button>
                </Link>
                {
                    userId === "user_2fmBA7gmVHaHtMZusK0BEdRE00r" &&

                    <Link href={"/admin"}>
                        <Button variant={"outline"} className='rounded-full'>
                            Admin Dashboard
                        </Button>
                    </Link>
                }
            </div>
        </nav >
    )
}

export default LandingNavbar