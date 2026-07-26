"use client";

import { dummyLeaders } from "../../lib/dummyLeaders";
import LeaderCard from "./LeaderCard";
import { Users, MapPin, ChevronRight } from "lucide-react";

export const metadata = {
    title: "Our Team - Paaydal Trekkers",
    description: "Meet the passionate team behind Paaydal Trekkers",
};

export default function TeamPage() {

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative overflow-hidden">

            <div className="relative z-10 py-20 px-4">
                {/* Enhanced Header Section */}
                <section className="text-center mb-20 max-w-5xl mx-auto">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-700 font-medium text-sm mb-6 shadow-lg">
                            <Users className="w-4 h-4" />
                            <span className="tracking-wide">
                                The People Behind Your Adventure
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                            Meet Our
                            <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                Expert Team
                            </span>
                        </h1>

                        <p className="text-gray-600 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed font-light">
                            Passionate trekkers, experienced guides, and nature
                            lovers leading you through unforgettable journeys
                            across India&apos;s most breathtaking landscapes.
                        </p>
                    </div>
                </section>

                {/* Enhanced Team Grid Section */}
                <section className="max-w-7xl mx-auto mb-20 animate-fade-in-up delay-700">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Adventure Leaders
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Meet the experienced professionals who will guide
                            your next adventure.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {dummyLeaders.map((leader, index) => (
                            <div
                                key={leader.id}
                                className="animate-fade-in-up"
                                style={{
                                    animationDelay: `${0.8 + index * 0.1}s`,
                                }}
                            >
                                <LeaderCard leader={leader} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Enhanced Call to Action Section */}
                <section className="text-center max-w-5xl mx-auto animate-fade-in-up delay-1200">
                    <div className="relative bg-gradient-to-br from-white via-emerald-50/50 to-teal-50/50 backdrop-blur-sm border-2 border-gray-100/50 rounded-3xl p-12 shadow-2xl overflow-hidden">
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-4 left-4 w-8 h-8 border-2 border-emerald-500 rounded-full"></div>
                            <div className="absolute bottom-8 right-8 w-6 h-6 bg-emerald-500 rounded-full"></div>
                            <div className="absolute top-1/2 left-8 w-4 h-4 bg-teal-500 transform rotate-45"></div>
                            <div className="absolute top-8 right-1/4 w-3 h-3 bg-cyan-500 rounded-full"></div>
                        </div>

                        <div className="relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                                <MapPin className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Ready to Trek with Us?
                            </h2>
                            <p className="text-gray-600 mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
                                Join our experienced team on your next adventure
                                and create memories that will last a lifetime.
                                Your journey starts here.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        Explore Our Treks
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .delay-100 {
                    animation-delay: 0.1s;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
            `}</style>
        </main>
    );
        }