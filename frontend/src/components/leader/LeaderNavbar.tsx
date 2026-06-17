"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

export default function LeaderNavbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(target) &&
                profileDropdownOpen
            ) {
                setProfileDropdownOpen(false);
            }
        };

        if (profileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownOpen]);

    return (
        <nav className="bg-emerald-700 text-white py-4 px-6 shadow-md flex justify-between items-center">
            <Link href="/leader">
                <span className="text-xl font-bold">Paaydal Leader</span>
            </Link>

            {user ? (
                <div className="relative" ref={profileDropdownRef}>
                    <button
                        onClick={() => setProfileDropdownOpen((prev) => !prev)}
                        className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold focus:outline-none hover:bg-emerald-500 transition-colors"
                    >
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                    </button>

                    {profileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50 text-gray-800">
                            <div className="px-4 py-2 border-b border-gray-200">
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600">
                                    {user.email}
                                </p>
                            </div>
                            <Link
                                href="/leader/profile"
                                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                onClick={() => setProfileDropdownOpen(false)}
                            >
                                Your Profile
                            </Link>
                            <Link
                                href="/leader/settings"
                                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                onClick={() => setProfileDropdownOpen(false)}
                            >
                                Settings
                            </Link>
                            <hr className="my-1" />
                            <button
                                onClick={() => {
                                    logout();
                                    setProfileDropdownOpen(false);
                                    router.push("/login");
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
}
