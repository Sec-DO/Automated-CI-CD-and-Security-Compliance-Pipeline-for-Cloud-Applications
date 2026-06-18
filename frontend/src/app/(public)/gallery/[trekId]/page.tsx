import TrekGalleryPage from "@/components/gallery/TrekGalleryPage";
import { Metadata } from "next";

type Props = {
    params: Promise<{
        trekId: string;
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { trekId } = await params;
    const trekName = trekId.replace(/-/g, " ");
    return {
        title: `Gallery - ${trekName}`,
        description: `Photos and memories from ${trekName} trek.`,
    };
}

export default async function Page({ params }: Props) {
    const { trekId } = await params;
    return <TrekGalleryPage trekId={trekId} />;
}
