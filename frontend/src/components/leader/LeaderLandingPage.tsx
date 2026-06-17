"use client";

import { useRouter } from "next/navigation";

export default function LeaderLandingPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section
                className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/leader/leader-hero.jpg')" }}
            >
                <div className="bg-black/50 w-full h-full absolute inset-0" />
                <div className="z-10 text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome, Trek Leader!
                    </h1>
                    <p className="text-lg md:text-xl max-w-xl mx-auto">
                        Organize, manage, and lead unforgettable trekking
                        experiences with Paaydal Trekkers.
                    </p>
                </div>
            </section>

            {/* Dashboard Quick Actions */}
            <section className="py-12 px-6 md:px-20">
                <h2 className="text-2xl font-bold text-green-700 mb-8">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <ActionCard
                        title="Create New Trek"
                        description="Plan a new adventure and publish it"
                        onClick={() => router.push("/leader/create-trek")}
                    />
                    <ActionCard
                        title="View My Treks"
                        description="Manage and update treks you've created"
                        onClick={() => router.push("/leader/my-treks")}
                    />
                    <ActionCard
                        title="View Bookings"
                        description="Check who has booked your treks"
                        onClick={() => router.push("/leader/bookings")}
                    />
                </div>
            </section>
        </main>
    );
}

function ActionCard({
    title,
    description,
    onClick,
}: {
    title: string;
    description: string;
    onClick: () => void;
}) {
    return (
        <div
            className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white cursor-pointer hover:bg-green-50 hover:border-green-200"
            onClick={onClick}
        >
            <h3 className="text-xl font-semibold text-green-800 mb-2">
                {title}
            </h3>
            <p className="text-stone-600 mb-4">{description}</p>
        </div>
    );
}
