'use client';

import Image from 'next/image';
import Window from '@/app/canvas/components/Window';

export default function CanvasPage() {
    return (
        <div className="min-h-screen bg-[url('/camouflage.png')] bg-repeat p-4">
            {/* Top Bar */}
            <div className="flex justify-end items-end gap-2 mb-4">
                <div className="flex flex-col items-center mr-auto">
                    <span className="text-white text-xs">05:5</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-gray-300 text-xs">$100 - intern</span>
                    <div className="relative w-24 h-12 flex items-center justify-center">
                        <Image src="/money_bg.png" alt="money background" fill className="object-contain" />
                        <span className="absolute text-white font-bold text-lg">$ 12.79</span>
                    </div>
                </div>
                <button className="bg-gray-700 text-white px-4 py-1 text-sm rounded border-2 border-gray-900">Settings</button>
                <button className="bg-gray-700 text-white px-4 py-1 text-sm rounded border-2 border-gray-900">Credits</button>
                <button className="bg-gray-700 text-white px-4 py-1 text-sm rounded border-2 border-gray-900">Restart</button>
                <button className="bg-gray-700 text-white px-4 py-1 text-sm rounded border-2 border-gray-900">Quit to Desktop</button>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-3 gap-4 h-[calc(100vh-80px)]">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                    <Window title="Control Board" headerIcon="/icons/control_board.png" className="h-1/3 min-h-[150px]">
                        <div className="flex gap-1 border-b border-gray-300 mb-2">
                            <button className="bg-gray-200 px-3 py-1 text-xs border border-gray-400 rounded-t-sm">Production [1]</button>
                            <button className="bg-gray-100 px-3 py-1 text-xs border border-gray-200 rounded-t-sm">???????</button>
                            <button className="bg-gray-100 px-3 py-1 text-xs border border-gray-200 rounded-t-sm">Research [3]</button>
                        </div>
                        {/* Content for Control Board */}
                        <div className="h-full bg-gray-200"></div>
                    </Window>
                    <Window title="Production" headerIcon="/icons/production.png" className="h-1/2 min-h-[250px]">
                        <div className="grid grid-cols-2 gap-2 h-full">
                            <div className="bg-gray-200 p-2 border border-gray-300 flex flex-col items-center justify-between">
                                <span className="text-sm font-semibold mb-2">Sign Twirling</span>
                                <Image src="/icons/sign_twirling.png" alt="Sign Twirling" width={64} height={64} className="mb-4" />
                                <div className="w-full bg-gray-300 rounded h-4 mb-2"><div className="bg-green-500 h-full w-[8%]" /></div>
                                <span className="text-xs">8%</span>
                            </div>
                            <div className="bg-gray-200 p-2 border border-gray-300 flex flex-col items-center justify-between">
                                <span className="text-sm font-semibold mb-2">Ammunition</span>
                                <Image src="/icons/ammunition.png" alt="Ammunition" width={64} height={64} className="mb-4" />
                                <div className="w-full bg-gray-300 rounded h-4 mb-2"><div className="bg-green-500 h-full w-[2%]" /></div>
                                <span className="text-xs">2%</span>
                                <button className="bg-gray-300 border border-gray-400 text-gray-800 px-3 py-1 text-xs mt-2">Progressive Press</button>
                            </div>
                        </div>
                    </Window>
                    <Window title="Upgrades" headerIcon="/icons/upgrades.png" className="h-1/6 min-h-[100px]">
                        <div className="grid grid-cols-2 gap-2 h-full">
                            <div className="bg-gray-200 p-2 border border-gray-300 flex flex-col items-center justify-between">
                                <span className="text-sm font-semibold mb-2">Automated Press</span>
                                <button className="bg-gray-300 border border-gray-400 text-gray-800 px-3 py-1 text-xs mt-2">$169.99</button>
                            </div>
                            <div className="bg-gray-200 p-2 border border-gray-300 flex flex-col items-center justify-between">
                                <span className="text-sm font-semibold mb-2">??? ???</span>
                                <button className="bg-gray-300 border border-gray-400 text-gray-800 px-3 py-1 text-xs mt-2">$$$</button>
                            </div>
                        </div>
                    </Window>
                </div>

                {/* Middle Column - Intentionally left empty for now to match image layout */}
                <div className="col-span-1"></div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                    <Window title="Finished Products" headerIcon="/icons/finished_products.png" specialBorder={true} className="h-1/3 min-h-[150px]">
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="bg-gray-200 border-b border-gray-300">
                                    <th className="text-left p-1">Product</th>
                                    <th className="text-left p-1">Quantity</th>
                                    <th className="text-left p-1">Amount</th>
                                    <th className="text-left p-1">Sell</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-1">Ammo</td>
                                    <td className="p-1">0</td>
                                    <td className="p-1"><input type="number" defaultValue="1" className="w-12 border border-gray-400 bg-white text-center" /></td>
                                    <td className="p-1">$103</td>
                                </tr>
                            </tbody>
                        </table>
                    </Window>
                    <Window title="Helpful Things" headerIcon="/icons/helpful_things.png" className="h-1/6 min-h-[80px]">
                        <div className="flex gap-2 items-center justify-center h-full">
                            <button className="bg-gray-300 border border-gray-400 text-gray-800 px-3 py-1 text-xs flex items-center gap-1">
                                <Image src="/icons/wishlist.png" alt="Wishlist" width={16} height={16} /> Wishlist!
                            </button>
                            <button className="bg-gray-300 border border-gray-400 text-gray-800 px-3 py-1 text-xs flex items-center gap-1">
                                <Image src="/icons/discord.png" alt="Discord" width={16} height={16} /> Discord!
                            </button>
                        </div>
                    </Window>
                    <Window title="Cash Flow" headerIcon="/icons/cash_flow.png" className="h-1/6 min-h-[80px]">
                        {/* Cash Flow Content */}
                        <div className="h-full"></div>
                    </Window>
                    <Window title="Materials" headerIcon="/icons/materials.png" className="h-1/4 min-h-[120px]">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-xs">Buy</span>
                            <select className="border border-gray-400 bg-white text-xs p-0.5">
                                <option>100</option>
                            </select>
                        </div>
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="bg-gray-200 border-b border-gray-300">
                                    <th className="text-left p-1">$ Price</th>
                                    <th className="text-left p-1">Material</th>
                                    <th className="text-left p-1">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-1">$5.99</td>
                                    <td className="p-1">Lead</td>
                                    <td className="p-1">200</td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-1">$2.99</td>
                                    <td className="p-1">Brass</td>
                                    <td className="p-1">200</td>
                                </tr>
                                <tr>
                                    <td className="p-1">$1.99</td>
                                    <td className="p-1">Gunpowder</td>
                                    <td className="p-1">200</td>
                                </tr>
                            </tbody>
                        </table>
                    </Window>
                    <Window title="Output Log" headerIcon="/icons/output_log.png" className="h-1/4 min-h-[120px]">
                        <div className="mb-2 flex items-center gap-2">
                            <select className="border border-gray-400 bg-white text-xs p-0.5">
                                <option>All</option>
                            </select>
                        </div>
                        <div className="bg-gray-200 border border-gray-300 p-2 text-xs h-full overflow-y-auto">
                            [BOSS] Quick check-in.<br/>
                            We monitor your vitals closely—just to keep you safe, of course. You're performing well.<br/>
                            -4/14<br/>
                            Sold Ammo x519<br/><br/>
                            Revenue: $396.12 — Rank #52<br/>
                            Units produced: 424 — Rank #60<br/>
                            Your mouse deserves hazard pay at this point.<br/>
                            Produced Ammo x519<br/>
                            Upgraded to: Progressive Press<br/>
                            Unlocked upgrade: Automated Press<br/>
                            Bought Gunpowder x2.20K<br/>
                            Bought Lead x2.20K
                        </div>
                    </Window>
                </div>
            </div>
        </div>
    );
} 