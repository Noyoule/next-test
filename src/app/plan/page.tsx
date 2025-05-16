'use client';

import { useState } from "react";
import { Check } from "lucide-react";
import Image from "next/image";


export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>("monthly");
    const [selectedPlan, setSelectedPlan] = useState<'professional' | 'organization' | ''>('');

    const plans = {
        monthly: {
            professional: 149,
            organization: 299,
        },
        yearly: {
            professional: 149 * 12 * 0.8, // 20% discount
            organization: 299 * 12 * 0.8,
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 font-[family-name:var(--font-inter)]">
            <div className="w-full max-w-2xl">
                <div className="flex justify-start mb-6">
                    <Image src="/images/logo.png" alt="Logo" width={64} height={65.5} />
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold text-[#F2F2F2] leading-[100%] tracking-normal">
                    Which plan would you like to start with?
                </h1>

                <p className="text-[#9A9A9A] text-sm md:text-base mt-2 mb-6">
                    Lorem ipsum dolor sit amet consectetur. Sed quis aenean posuere ipsum eu urna netus sed sagittis. Enim nibh in fusce malesuada.
                </p>

                <div className="flex justify-center md:max-w-[274px] items-center gap-2 h-[55px] bg-[#212121D9] rounded-lg p-1 max-w-xs mx-auto mb-8">
                    <button
                        className={`px-4 py-2 h-[47px] text-sm rounded-lg ${billingCycle === 'monthly' ? 'bg-[#121212]' : ''}`}
                        onClick={() => setBillingCycle('monthly')}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-2 h-[47px] text-sm rounded-lg flex items-center gap-1 ${billingCycle === 'yearly' ? 'bg-[#121212]' : ''}`}
                        onClick={() => setBillingCycle('yearly')}
                    >
                        Yearly <span className="bg-[#26532F] text-[#20BC45] ml-1 rounded-full h-[23px] text-xs font-semibold py-1 px-2">Save 20%</span>
                    </button>
                </div>

                {/* Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['professional', 'organization'] as const).map((planKey) => (
                        <div
                            key={planKey}
                            onClick={() => setSelectedPlan(planKey)}
                            className={`rounded-xl p-6 cursor-pointer border border-[#494949] ${selectedPlan === planKey ? 'border-[#A01E1E] bg-[#201616]' : 'bg-[#212121D9]'
                                }`}
                        >
                            <h2 className="font-semibold uppercase text-base text-[#C6C6C6]">{planKey}</h2>
                            <p className="text-[#757575] text-sm mt-1 font-bold leading-[100%]">Lorem ipsum dolor sit amet consectetur. Elit egestas lacus.</p>
                            <p className="text-3xl text-[#F2F2F2] font-semibold mt-3">
                                ${plans[billingCycle][planKey].toFixed(0)}
                            </p>
                            <hr className="text-[#3A3A3A] my-5" />
                            <ul className="text-sm text-[#9A9A9A] mt-3 space-y-2">
                                {Array(4).fill(0).map((_, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <Check className="w-4 h-4 text-green-400" />
                                        Unlimited courses
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <hr className="text-[#3A3A3A] mt-6" />
                <div className="flex justify-center">
                    <button
                        disabled={selectedPlan === ""}
                        className={`cursor-pointer h-[51px] w-[60%] my-6 bg-[#AEAEAE] text-[#000000] py-3 rounded-xl transition text-center
                        ${selectedPlan == "" ? ' dark:bg-[#AEAEAE] bg-gray-300 cursor-not-allowed' : 'dark:bg-[#FFFFFF]'}
                `}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
