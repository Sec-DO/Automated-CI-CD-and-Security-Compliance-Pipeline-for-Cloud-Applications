"use client";

import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                mobileDropdownOpen
            ) {
                setMobileDropdownOpen(false);
                setMobileProfileOpen(false);
            }
        };

        if (profileDropdownOpen || mobileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownOpen, mobileDropdownOpen]);

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/treks", label: "Treks" },
        { href: "/gallery", label: "Gallery" },
        { href: "/forum", label: "Forum" },
        { href: "/team", label: "Team" },
    ];

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-white border-b border-emerald-100/50 shadow-lg shadow-emerald-900/5"
                        : "bg-white"
                }`}
            >
                <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
                    {/* Logo */}
                    <div
                        className="flex items-center space-x-3 cursor-pointer group"
                        onClick={() => router.push("/")}
                    >
                        <div className="relative">
                            <Image
                                src="/logos/foxtrail_logo.jpg"
                                alt="Foxtrail India Logo"
                                width={45}
                                height={45}
                                className="rounded-full object-cover ring-2 ring-emerald-200/50 group-hover:ring-emerald-300 transition-all duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-teal-500 transition-all duration-300">
                                Foxtrail India
                            </span>
                            <span className="text-xs text-emerald-600/70 font-medium tracking-wide">
                                Adventure Awaits
                            </span>
                        </div>
                    </div>

                    {/* Hamburger button (visible on mobile) */}
                    <div className="lg:hidden">
                        <button
                            onClick={() =>
                                setMobileDropdownOpen(!mobileDropdownOpen)
                            }
                            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                mobileDropdownOpen
                                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                                    : "bg-emerald-50/80 hover:bg-emerald-100/80 text-emerald-700 hover:shadow-md"
                            }`}
                        >
                            <div className="flex flex-col space-y-1">
                                <div
                                    className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                                        mobileDropdownOpen
                                            ? "rotate-45 translate-y-1.5"
                                            : ""
                                    }`}
                                ></div>
                                <div
                                    className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                                        mobileDropdownOpen ? "opacity-0" : ""
                                    }`}
                                ></div>
                                <div
                                    className={`w-5 h-0.5 bg-current transition-all duration-300 ${
                                        mobileDropdownOpen
                                            ? "-rotate-45 -translate-y-1.5"
                                            : ""
                                    }`}
                                ></div>
                            </div>
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-1">
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                                            : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50"
                                    }`}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    <span className="relative z-10">
                                        {item.label}
                                    </span>
                                    {!isActive && (
                                        <>
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                                        </>
                                    )}
                                </Link>
                            );
                        })}

                        {user ? (
                            <div
                                className="relative ml-4"
                                ref={profileDropdownRef}
                            >
                                <button
                                    onClick={() =>
                                        setProfileDropdownOpen((prev) => !prev)
                                    }
                                    className="group relative w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                                >
                                    <span className="relative z-10">
                                        {user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()}
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                </button>

                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 rounded-2xl py-2 border border-emerald-100/50 animate-fade-in-down">
                                        <div className="px-4 py-3 border-b border-emerald-100/50">
                                            <p className="text-sm font-medium text-gray-800">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-700 transition-all duration-200"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            <span className="text-sm font-medium">
                                                Your Profile
                                            </span>
                                        </Link>
                                        <Link
                                            href="/my-bookings"
                                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-700 transition-all duration-200"
                                            onClick={() =>
                                                setProfileDropdownOpen(false)
                                            }
                                        >
                                            <span className="text-sm font-medium">
                                                My Bookings
                                            </span>
                                        </Link>
                                        <div className="border-t border-emerald-100/30 pt-2">
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setProfileDropdownOpen(
                                                        false
                                                    );
                                                    router.push("/login");
                                                }}
                                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50/50 transition-all duration-200"
                                            >
                                                <span className="text-sm font-medium">
                                                    Logout
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="group relative ml-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transform hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <span>Login</span>
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            </Link>
                        )}
                    </nav>
                </div>

                {/* Mobile Menu */}
                {mobileDropdownOpen && (
                    <div
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-emerald-100/50 shadow-2xl shadow-emerald-900/10 animate-slide-down"
                        ref={mobileMenuRef}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-6">
                            {/* Mobile Navigation Links */}
                            <nav className="space-y-1 mb-6">
                                {navItems.map((item, index) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`group flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 animate-fade-in-up ${
                                                isActive
                                                    ? "text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30"
                                                    : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50"
                                            }`}
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                            onClick={() =>
                                                setMobileDropdownOpen(false)
                                            }
                                        >
                                            <span>{item.label}</span>
                                            <div className="flex-1"></div>
                                            {!isActive && (
                                                <svg
                                                    className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Mobile User Section */}
                            <div className="border-t border-emerald-100/50 pt-6">
                                {user ? (
                                    <div className="space-y-1">
                                        {/* User Info - Clickable to toggle dropdown */}
                                        <button
                                            onClick={() =>
                                                setMobileProfileOpen(
                                                    !mobileProfileOpen
                                                )
                                            }
                                            className="flex items-center space-x-4 w-full px-4 py-3 bg-emerald-50/50 rounded-xl hover:bg-emerald-100/50 transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-semibold">
                                                {user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className="font-medium text-gray-800">
                                                    {user.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-emerald-600 transition-transform duration-300 ${
                                                    mobileProfileOpen
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        {/* Profile Dropdown */}
                                        {mobileProfileOpen && (
                                            <div className="space-y-1 animate-fade-in-down">
                                                <Link
                                                    href="/profile"
                                                    className="group flex items-center px-4 py-3 ml-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-300"
                                                    onClick={() => {
                                                        setMobileDropdownOpen(
                                                            false
                                                        );
                                                        setMobileProfileOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <span className="font-medium">
                                                        Your Profile
                                                    </span>
                                                    <div className="flex-1"></div>
                                                    <svg
                                                        className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </Link>

                                                <Link
                                                    href="/my-bookings"
                                                    className="group flex items-center px-4 py-3 ml-4 rounded-xl text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all duration-300"
                                                    onClick={() => {
                                                        setMobileDropdownOpen(
                                                            false
                                                        );
                                                        setMobileProfileOpen(
                                                            false
                                                        );
                                                    }}
                                                >
                                                    <span className="font-medium">
                                                        My Bookings
                                                    </span>
                                                    <div className="flex-1"></div>
                                                    <svg
                                                        className="w-5 h-5 text-emerald-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        setMobileDropdownOpen(
                                                            false
                                                        );
                                                        setMobileProfileOpen(
                                                            false
                                                        );
                                                        router.push("/login");
                                                    }}
                                                    className="group flex items-center w-full px-4 py-3 ml-4 rounded-xl text-red-600 hover:bg-red-50/50 transition-all duration-300"
                                                >
                                                    <span className="font-medium">
                                                        Logout
                                                    </span>
                                                    <div className="flex-1"></div>
                                                    <svg
                                                        className="w-5 h-5 text-red-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="group flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/40"
                                        onClick={() =>
                                            setMobileDropdownOpen(false)
                                        }
                                    >
                                        <span>Login to Your Account</span>
                                        <svg
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes fade-in-down {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-down {
                    animation: fade-in-down 0.3s ease-out forwards;
                }

                .animate-slide-down {
                    animation: slide-down 0.4s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </>
    );
}
