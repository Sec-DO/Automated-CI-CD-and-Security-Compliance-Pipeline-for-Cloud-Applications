"use client";

import { useRouter } from "next/navigation";

export default function AdminLandingPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Admin Dashboard
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto">
                            Manage your trekking platform with comprehensive
                            tools and insights
                        </p>
                    </div>
                </div>
            </section>

            {/* Dashboard Stats */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Platform Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard
                            title="Total Users"
                            value="1,247"
                            icon="👥"
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Active Treks"
                            value="42"
                            icon="🏔️"
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Trek Leaders"
                            value="18"
                            icon="👨‍💼"
                            color="bg-purple-500"
                        />
                        <StatCard
                            title="Total Bookings"
                            value="634"
                            icon="📅"
                            color="bg-orange-500"
                        />
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="py-12 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ActionCard
                            title="Manage Users"
                            description="View, edit, and manage user accounts"
                            icon="👤"
                            onClick={() => router.push("/admin/users")}
                        />
                        <ActionCard
                            title="Manage Treks"
                            description="Approve, edit, and manage all treks"
                            icon="🏔️"
                            onClick={() => router.push("/admin/treks")}
                        />
                        <ActionCard
                            title="Manage Leaders"
                            description="View and manage trek leaders"
                            icon="👨‍💼"
                            onClick={() => router.push("/admin/leaders")}
                        />
                        <ActionCard
                            title="Bookings Overview"
                            description="Monitor all trek bookings"
                            icon="📊"
                            onClick={() => router.push("/admin/bookings")}
                        />
                        <ActionCard
                            title="Reports & Analytics"
                            description="View detailed platform analytics"
                            icon="📈"
                            onClick={() => router.push("/admin/analytics")}
                        />
                        <ActionCard
                            title="Platform Settings"
                            description="Configure platform settings"
                            icon="⚙️"
                            onClick={() => router.push("/admin/settings")}
                        />
                    </div>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">
                        Recent Activity
                    </h2>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="divide-y divide-gray-200">
                            <ActivityItem
                                action="New user registered"
                                user="Rahul Sharma"
                                time="2 hours ago"
                                type="user"
                            />
                            <ActivityItem
                                action="Trek approved"
                                user="Priya Patel"
                                time="4 hours ago"
                                type="trek"
                            />
                            <ActivityItem
                                action="Booking confirmed"
                                user="Amit Kumar"
                                time="6 hours ago"
                                type="booking"
                            />
                            <ActivityItem
                                action="New leader application"
                                user="Sneha Gupta"
                                time="1 day ago"
                                type="leader"
                            />
                            <ActivityItem
                                action="Trek completed"
                                user="Vikram Singh"
                                time="2 days ago"
                                type="trek"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function StatCard({
    title,
    value,
    icon,
    color,
}: {
    title: string;
    value: string;
    icon: string;
    color: string;
}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div
                    className={`${color} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl`}
                >
                    {icon}
                </div>
            </div>
        </div>
    );
}

function ActionCard({
    title,
    description,
    icon,
    onClick,
}: {
    title: string;
    description: string;
    icon: string;
    onClick: () => void;
}) {
    return (
        <div
            className="p-6 bg-white border rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:border-blue-200"
            onClick={onClick}
        >
            <div className="flex items-start space-x-4">
                <div className="text-3xl">{icon}</div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
}

function ActivityItem({
    action,
    user,
    time,
    type,
}: {
    action: string;
    user: string;
    time: string;
    type: "user" | "trek" | "booking" | "leader";
}) {
    const getTypeColor = (type: string) => {
        switch (type) {
            case "user":
                return "bg-blue-100 text-blue-800";
            case "trek":
                return "bg-green-100 text-green-800";
            case "booking":
                return "bg-orange-100 text-orange-800";
            case "leader":
                return "bg-purple-100 text-purple-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        type
                    )}`}
                >
                    {type}
                </span>
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        {action}
                    </p>
                    <p className="text-sm text-gray-500">by {user}</p>
                </div>
            </div>
            <span className="text-sm text-gray-500">{time}</span>
        </div>
    );
}
