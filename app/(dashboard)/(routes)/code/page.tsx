"use client";
import * as z from "zod"
import { useRouter } from "next/navigation";
import { CodeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

import Heading from '@/components/Heading';
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/Empty";

import { formSchema } from "./constants";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { Useravatar } from "@/components/Useravatar";
import { BotAvatar } from "@/components/BotAvatar";

// interface ChatCompletionRequestMessage {
//     role: 'user' | 'assistant' | 'system';
//     content: string;
//     name?: string;
// }


const Code = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt,
            }
            const newMessages = [...messages, userMessage];
            const response = await axios.post("/api/code", {
                messages: newMessages,
            })

            setMessages((current) => [...current, userMessage, response.data]);

            form.reset();

        } catch (error: any) {
            //TODO: open pro modal
            console.log(error)
        }
        finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title='Code Generation'
                description='Generate Code using prompts.'
                icon={CodeIcon}
                iconColor='text-green-700'
                bgColor='bg-green-700/10'
            />
            <div className='px-4 lg:px-8'>
                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}
                            className="
                            rounded-lg
                             border 
                             w-full 
                             p-4 
                             px-3 
                             md:px-6 
                             focus-within:shadow-sm
                             grid 
                             grid-cols-12
                             gap-2 "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0  outline-none focus-visible:ring-0  focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Any codding problem?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="Conversation not started" />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {
                            messages.map((message) => (
                                <div
                                    key={String(message.content)}
                                    className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg",
                                        message.role === "user" ? " bg-white border border-black/10" : "bg-muted "
                                    )}
                                >
                                    {message.role == "user" ? <Useravatar /> : <BotAvatar />}
                                    <p className="text-sm">
                                        {String(message.content)}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Code;