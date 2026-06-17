import "@/app/globals.css";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <AdminNavbar />
            <main className="p-4 bg-amber-50">{children}</main>
        </div>
    );
}
