'use client';

import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useUserStore } from "@/stores/register-process-store";

export default function VerificationPage() {
    const router = useRouter();
    const userEmail = useUserStore((state: any) => state.email);
    const [codes, setCodes] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const isDisabled = codes.some(code => code.trim() === "");

    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]{0,1}$/.test(value)) return;

        const updatedCodes = [...codes];
        updatedCodes[index] = value;
        setCodes(updatedCodes);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !codes[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const finalCode = codes.join('');
        console.log("Code de vérification:", finalCode);
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center p-1 dark:bg-black bg-white">
            <div className="min-w-1/2 lg:min-w-2/5 xl:min-w-1/3 md:max-w-3/5 lg:max-w-1/3 flex flex-col">
                <Image src="/images/logo.png" alt="login image" width={64} height={65.5} />
                <h1 className="font-semibold text-4xl leading-[100%] tracking-normal mt-9 font-[family-name:var(--font-inter)] dark:text-[#F2F2F2] text-black">
                    Verification code
                </h1>
                <p className="dark:text-[#9A9A9A] text-gray-600 text-[16px] leading-[100%] font-medium mt-5 font-[family-name:var(--font-inter)]">
                    We sent a verification code to <span className="dark:text-white text-blue-600">{userEmail}</span>
                </p>
                <form onSubmit={handleSubmit} className="mt-9 w-full">
                    <div className="flex items-center justify-between mt-5 gap-2.5 w-full">
                        {codes.map((code, index) => (
                            <input
                                key={index}
                                ref={el => { inputRefs.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={code}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="h-[51px] w-full text-center text-xl rounded-lg border border-[#303030] bg-transparent dark:text-white text-black outline-none"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={`w-full h-[51px] rounded-xl p-4 mt-6 text-black text-[16px] font-medium font-[family-name:var(--font-inter)] 
                            ${isDisabled ? 'dark:bg-[#AEAEAE] bg-gray-300 cursor-not-allowed' : 'dark:bg-[#F5F5F5] cursor-pointer'}
                        `}
                    >
                        Continue
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push('/register')}
                        className="w-full h-[51px] border border-[#303030] rounded-xl p-4 mt-3 text-[#C7C7C7] text-[16px] cursor-pointer font-medium font-[family-name:var(--font-inter)]"
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
}
