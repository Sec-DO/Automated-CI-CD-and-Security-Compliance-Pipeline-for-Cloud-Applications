import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import StepsSection from "@/components/landing/StepsSection";
import Testimonials from "@/components/landing/Testimonials";
import UpcomingTreks from "@/components/landing/UpcomingTreks";

export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <UpcomingTreks />
            <AboutSection />
            <StepsSection />
            <Testimonials />
        </>
    );
}
