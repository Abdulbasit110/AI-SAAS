"use client";
import React, { useState } from 'react'
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface subscriptionButtonProps {
    isPro: boolean
}
const SubscriptionButton = ({ isPro = false }: subscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get("/api/stripe");
            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <Button disabled={loading} variant={isPro ? "default" : "premium"}
            onClick={onClick}
        >
            {isPro ? "Manage subscription " : "Upgrade"}
            {!isPro && <Zap className='w-4 h-4 fill-white ml-2' />}
        </Button>
    )
}

export default SubscriptionButton