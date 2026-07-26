import "@/app/globals.css";
import LeaderNavbar from "@/components/leader/LeaderNavbar";

export default function LeaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <LeaderNavbar />
            <main className="p-4 bg-amber-50">{children}</main>
        </div>
    );
}
