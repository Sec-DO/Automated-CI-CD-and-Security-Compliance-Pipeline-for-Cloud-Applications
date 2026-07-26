import TrekDetails from "@/components/treks/TrekDetails";

export default async function TrekDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-white">
            <TrekDetails trekId={id} />
        </main>
    );
}
