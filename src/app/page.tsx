
import Link from 'next/link'; // Import Link for navigation

export default function Home() {
    return (
        <div
            className="font-sans grid grid-rows-[1fr] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
            <main className="flex flex-col gap-8 items-center justify-center w-full">
                <h1 className="text-4xl font-bold text-center mb-8">Punjab Police MCP Server</h1>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                    {/* Services Card */}
                    <Link href="/services" passHref className="group block w-full">
                        <div
                            className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer min-h-[180px]">
                            <h2 className="text-2xl font-semibold mb-2 group-hover:underline">Services Overview</h2>
                            <p className="text-center opacity-90">Explore the various services offered by Punjab
                                Police.</p>
                            <span className="absolute bottom-4 right-4 text-sm opacity-70">Click to view →</span>
                        </div>
                    </Link>

                    {/* Helpline Numbers Card */}
                    <Link href="/helplines" passHref className="group block w-full">
                        <div
                            className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer min-h-[180px]">
                            <h2 className="text-2xl font-semibold mb-2 group-hover:underline">Helpline Numbers</h2>
                            <p className="text-center opacity-90">Access important contact numbers for Punjab
                                Police.</p>
                            <span className="absolute bottom-4 right-4 text-sm opacity-70">Click to view →</span>
                        </div>
                    </Link>
                </div>
            </main>

            {/* Removed original Next.js boilerplate footer */}
        </div>
    );
}
