"use client";

import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
// import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-100 px-6 md:px-16 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left items-center md:items-start justify-center md:justify-start">
                {/* Logo + Tagline */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center gap-3">
                        {/* <Image
                            src="/logo.png"
                            alt="Foxtrail India logo"
                            width={40}
                            height={40}
                        /> */}
                        <h2 className="text-xl font-bold">Foxtrail India</h2>
                    </div>
                    <p className="mt-4 text-sm text-stone-400">
                        Explore the unexplored. Join our community of passionate
                        trekkers and nature lovers across India.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/" className="hover:underline">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/upcoming-treks"
                                className="hover:underline"
                            >
                                Upcoming Treks
                            </Link>
                        </li>
                        <li>
                            <Link href="/gallery" className="hover:underline">
                                Gallery
                            </Link>
                        </li>
                        <li>
                            <Link href="/forum" className="hover:underline">
                                Forum
                            </Link>
                        </li>
                        <li>
                            <Link href="/team" className="hover:underline">
                                Our Team
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col items-center text-center">
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <div className="flex flex-col text-sm space-y-2 text-stone-400">
                        <a href="mailto:foxtrailindiaadventures@gmail.com">
                            <span className="flex items-center justify-center gap-1">
                                {" "}
                                <Mail className="w-4 h-4" />
                                <span>info@foxtrailindia.in</span>
                            </span>
                        </a>
                        <a href="tel:+919763810639">
                            <span className="flex items-center justify-center gap-1">
                                {" "}
                                <Phone className="w-4 h-4" />
                                <span>+91 97638 10639</span>
                            </span>
                        </a>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4 text-stone-300">
                        <a
                            href="https://www.instagram.com/foxtrail_india_adventures/"
                            aria-label="Instagram"
                            className="hover:text-white"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="hover:text-white"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="hover:text-white"
                        >
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-stone-700 mt-10 pt-6 text-center text-xs text-stone-500 flex flex-col items-center">
                © {new Date().getFullYear()} Foxtrail India Adventures.
                <span>All rights reserved.</span>
            </div>
        </footer>
    );
}
