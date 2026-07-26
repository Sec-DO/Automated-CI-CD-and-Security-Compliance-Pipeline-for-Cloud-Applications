"use client"
import Image from "next/image";

export default function AboutSection() {
    return (
        <section className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 py-16 sm:py-20 lg:py-10 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/5 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse delay-700"></div>
                <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-teal-300 rounded-full animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
                    <div className="order-2 lg:order-1 animate-fade-in-up">
                        {/* Section Label */}
                        <div className="mb-6 text-center md:text-left">
                            {" "}
                            {/* Added text-center for label on mobile */}
                            <span className="inline-block text-sm font-medium tracking-widest text-emerald-600 uppercase mb-4 animate-fade-in-up">
                                Our Story
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight animate-fade-in-up delay-200">
                                <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    About Foxtrail
                                </span>
                                <span className="block bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent mt-2">
                                    India Adventures
                                </span>
                            </h2>
                        </div>

                        {/* Content paragraphs - already wide enough, centered by parent's text-align if applied */}
                        <div className="space-y-6 animate-fade-in-up delay-400 text-center md:text-left">
                            {" "}
                            {/* Added text-center */}
                            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed font-light">
                                Foxtrail India is a passionate community of
                                <span className="font-semibold text-emerald-700">
                                    {" "}
                                    explorers, nature lovers, and adventure
                                    seekers
                                </span>
                                . We organize curated trekking experiences
                                across India&apos;s most stunning landscapes —
                                from the
                                <span className="font-semibold text-teal-700">
                                    {" "}
                                    Western Ghats to the Himalayas
                                </span>
                                .
                            </p>
                            <p className="text-gray-700 text-lg leading-relaxed font-light">
                                Our mission is to make trekking
                                <span className="font-semibold text-emerald-700">
                                    {" "}
                                    safe, fun, and accessible
                                </span>{" "}
                                to everyone — whether you&apos;re a beginner or
                                a seasoned trekker. Join us and
                                <span className="font-semibold text-teal-700">
                                    {" "}
                                    rediscover your connection with the wild
                                </span>
                                .
                            </p>
                        </div>

                        {/* Key Highlights - This needs centering for its grid items */}
                        <div className="mt-10 animate-fade-in-up delay-600">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center sm:justify-items-start">
                                {" "}
                                {/* Added justify-items-center for grid items */}
                                {[
                                    {
                                        icon: "🏔️",
                                        title: "Expert Guides",
                                        desc: "Certified & experienced",
                                    },
                                    {
                                        icon: "🛡️",
                                        title: "Safe Adventures",
                                        desc: "Safety is our priority",
                                    },
                                    {
                                        icon: "👥",
                                        title: "All Skill Levels",
                                        desc: "Beginner to advanced",
                                    },
                                    {
                                        icon: "⭐",
                                        title: "Premium Locations",
                                        desc: "Handpicked destinations",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={item.title}
                                        className="group flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100/50 hover:bg-white/80 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                        style={{
                                            animationDelay: `${0.1 * index}s`,
                                        }}
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 font-light">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trust Stats - Already centered by text-center/flex wrap */}
                        <div className="mt-10 animate-fade-in-up delay-800">
                            <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
                                {" "}
                                {/* Changed to justify-center for mobile */}
                                {[
                                    { number: "500+", label: "Happy Trekkers" },
                                    { number: "50+", label: "Destinations" },
                                    { number: "5+", label: "Years Experience" },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="text-center"
                                    >
                                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                            {stat.number}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Call to Action - Already centered for mobile, left for desktop */}
                        <div className="mt-10 flex justify-center md:justify-start animate-fade-in-up delay-1000">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300">
                                <span className="relative z-10 flex items-center gap-2">
                                    Join Our Community
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
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Image Section */}
                    <div className="order-1 lg:order-2 w-full animate-fade-in-up delay-300">
                        <div className="relative">
                            {/* Main Image Container */}
                            <div className="relative w-full h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem] rounded-2xl overflow-hidden shadow-2xl group">
                                <Image
                                    src="/landing/about-trek-1.jpg"
                                    alt="About Foxtrail India Adventures - Trekkers exploring beautiful mountain landscapes"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    priority
                                />

                                {/* Enhanced overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent group-hover:from-emerald-900/20 transition-all duration-500"></div>

                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full opacity-15 blur-2xl animate-pulse delay-500"></div>

                            {/* Achievement Badge */}
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-emerald-100 animate-bounce-subtle">
                                <div className="text-center">
                                    <div className="text-md font-bold text-emerald-600">
                                        100% Safety
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        Track Record
                                    </div>
                                    <div className="flex justify-center mt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-3 h-3 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

                @keyframes bounce-subtle {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                    opacity: 0;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                }
                .delay-300 {
                    animation-delay: 0.3s;
                }
                .delay-400 {
                    animation-delay: 0.4s;
                }
                .delay-500 {
                    animation-delay: 0.5s;
                }
                .delay-600 {
                    animation-delay: 0.6s;
                }
                .delay-700 {
                    animation-delay: 0.7s;
                }
                .delay-800 {
                    animation-delay: 0.8s;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}
