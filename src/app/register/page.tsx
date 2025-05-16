'use client';

import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/stores/register-process-store";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const setStoreEmail = useUserStore((state) => state.setEmail);

    const isDisabled = !isValidEmail(email.trim());

    function isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStoreEmail(email);
        router.push('/verification');
    }
    return (
        <div className="h-screen w-screen flex items-center justify-center p-1 dark:bg-black bg-white">
            <div className="min-w-1/2 lg:min-w-2/5 xl:min-w-1/3 md:max-w-3/5 lg:max-w-2/3 flex flex-col">
                <Image src="/images/logo.png" alt="login image" width={64} height={65.5} />
                <h1 className="font-semibold text-4xl leading-[100%] tracking-normal mt-9 font-[family-name:var(--font-inter)] dark:text-white text-black">
                    Create an account
                </h1>
                <p className="dark:text-[#9A9A9A] text-gray-600 text-[16px] leading-[100%] font-medium mt-5 font-[family-name:var(--font-inter)]">
                    Already have an account?<Link href="/login" className="dark:text-white text-blue-600"> Log Into Supaclass</Link>
                </p>
                <form className="mt-9 w-full" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-[51px] p-1 rounded-xl dark:border-[#4F4F4F] border-gray-400 border dark:placeholder:text-[#9A9A9A] placeholder:text-gray-500 placeholder:text-[16px] placeholder:font-medium placeholder:font-[family-name:var(--font-inter)] dark:bg-black bg-white dark:text-white text-black"
                        placeholder="Email Address"
                    />
                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={`w-full h-[51px] rounded-xl p-4 mt-3 text-black text-[16px] cursor-pointer font-medium font-[family-name:var(--font-inter)] 
                            ${isDisabled ? ' dark:bg-[#AEAEAE] bg-gray-300 cursor-not-allowed' : 'dark:bg-[#F5F5F5]'}
                           `}
                    >
                        Sign up
                    </button>
                </form>

                <div className="flex w-full items-center justify-between mt-5">
                    <hr className="h-[1px] dark:border-[#4F4F4F] border-gray-300 w-full" />
                    <p className="p-3 dark:text-[#4F4F4F] text-gray-500">Or</p>
                    <hr className="h-[1px] dark:border-[#4F4F4F] border-gray-300 w-full" />
                </div>

                <div className="flex w-full items-center justify-between mt-3 gap-2">
                    <div className="rounded-lg flex items-center justify-center dark:border-[#4F4F4F] border-gray-400 border w-full h-[51px] p-4 font-[family-name:var(--font-inter)] text-[16px] font-medium dark:bg-black bg-white">
                        <Image src="/images/google.png" alt="google image" width={18} height={18} />
                        <p className="dark:text-[#AEAEAE] text-gray-600 lg:text-[16px] text-[10px] font-medium ml-2">Continue with Google</p>
                    </div>
                    <div className="rounded-lg flex items-center justify-center dark:border-[#4F4F4F] border-gray-400 border w-full h-[51px] p-4 font-[family-name:var(--font-inter)] text-[16px] font-medium dark:bg-black bg-white">
                        <Image src="/images/apple.png" alt="apple image" width={18} height={18} />
                        <p className="dark:text-[#AEAEAE] text-gray-600 lg:text-[16px] text-[10px] font-medium ml-2">Continue with Apple</p>
                    </div>
                </div>

                <p className="mt-4 leading-[150%] dark:text-[#9A9A9A] text-gray-500 text-sm">
                    By signing up to Supaclass, you acknowledge that you have read and agree to
                    <Link href="" className="dark:text-white text-blue-600"> Terms</Link> and
                    <Link href="" className="dark:text-white text-blue-600"> Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}
