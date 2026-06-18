import Image from "next/image";
import { Trek } from "@/lib/dummyTreks";
import Link from "next/link";

interface TrekDetailsCardProps {
    trekDetails: Trek;
}

export function TrekDetailsCard({ trekDetails }: TrekDetailsCardProps) {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Trek Details
            </h3>

            <Link
                href={`/treks/${trekDetails._id}`}
                prefetch={false}
             className="flex items-start gap-4 mb-4">
                <Image
                    src={trekDetails.imageUrls[0]}
                    alt={trekDetails.title}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {trekDetails.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        <span className="block sm:hidden">
                            {trekDetails.description.slice(0, 22)}
                            {trekDetails.description.length > 20 ? "..." : ""}
                        </span>
                        <span className="hidden sm:block">
                            {trekDetails.description}
                        </span>
                    </p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        {trekDetails.difficulty}
                    </span>
                </div>
            </Link>

            <div className="flex items-center gap-4 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium rounded-full">
                    {new Date(trekDetails.startDate).toLocaleDateString(
                        "en-US",
                        {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        }
                    )}{" "}
                    to{" "}
                    {new Date(trekDetails.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}
                </span>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-gray-600 font-medium">
                    Price per adult:
                </span>
                <span className="text-xl font-bold text-emerald-600">
                    ₹{Number(trekDetails.price).toLocaleString()}
                </span>
            </div>
        </div>
    );
}
