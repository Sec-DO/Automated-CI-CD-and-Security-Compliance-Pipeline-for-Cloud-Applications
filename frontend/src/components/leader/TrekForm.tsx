"use client";

import { createNewTrek } from "@/api/operations/trekAPIs";
import { useAuthStore } from "@/stores/authStore";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TrekForm() {
    const token = useAuthStore((state) => state.user?.token);
    // const router = useRouter();

    const [formData, setFormData] = useState({
        title: "",
        thumbnail: "",
        imageUrls: [""],
        price: "",
        startDate: "",
        endDate: "",
        difficulty: "",
        seatsAvailable: 0,
        commute: "",
        locationsToView: [""],
        aboutDestination: "",
        whoCanCome: "",
        stops: [""],
        schedule: [""],
        foodStops: [""],
        highlights: [""],
        description: "",
        suitableFor: "",
        preparationTips: [""],
        facilities: [""],
        leaders: [
            {
                name: "",
                photo: "",
                experience: "",
            },
        ],
    });

    const handleChange = (
        field: string,
        value: unknown,
        isArray: boolean = false,
        index?: number,
        subfield?: string
    ) => {
        if (isArray && typeof index === "number") {
            const updatedArray = [
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(formData[field as keyof typeof formData] as any[]),
            ];
            if (subfield) {
                updatedArray[index][subfield] = value;
            } else {
                updatedArray[index] = value;
            }
            setFormData({ ...formData, [field]: updatedArray });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error("You're not authenticated!");
            return;
        }

        try {
            const res = await createNewTrek(formData, token);
            console.log("Trek created successfully:", res);

            // if (!res.ok) {
            //     toast.error(data.message || "Failed to create trek");
            // } else {
            //     toast.success("Trek created successfully!");
            //     router.push("/upcoming-treks");
            // }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-emerald-700">
                Basic Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-emerald-900">
                <input
                    type="text"
                    placeholder="Trek Title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Thumbnail URL"
                    value={formData.thumbnail}
                    onChange={(e) => handleChange("thumbnail", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Commute"
                    value={formData.commute}
                    onChange={(e) => handleChange("commute", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Difficulty (Easy/Moderate/Hard)"
                    value={formData.difficulty}
                    onChange={(e) => handleChange("difficulty", e.target.value)}
                    className="border p-2 rounded-md w-full"
                    required
                />
                <input
                    type="number"
                    placeholder="Seats Available"
                    value={formData.seatsAvailable}
                    onChange={(e) =>
                        handleChange("seatsAvailable", parseInt(e.target.value))
                    }
                    className="border p-2 rounded-md w-full"
                    required
                />
            </div>

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">
                Descriptions
            </h2>

            <textarea
                placeholder="About Destination"
                value={formData.aboutDestination}
                onChange={(e) =>
                    handleChange("aboutDestination", e.target.value)
                }
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <textarea
                placeholder="Who Can Come?"
                value={formData.whoCanCome}
                onChange={(e) => handleChange("whoCanCome", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <textarea
                placeholder="Main Description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
                required
            />
            <input
                type="text"
                placeholder="Suitable For"
                value={formData.suitableFor}
                onChange={(e) => handleChange("suitableFor", e.target.value)}
                className="border p-2 rounded-md w-full text-emerald-900"
            />

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Images</h2>

            {formData.imageUrls.map((url, i) => (
                <input
                    key={i}
                    type="text"
                    placeholder={`Image URL ${i + 1}`}
                    value={url}
                    onChange={(e) =>
                        handleChange("imageUrls", e.target.value, true, i)
                    }
                    className="border p-2 rounded-md w-full text-emerald-900"
                />
            ))}

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Leaders</h2>
            {formData.leaders.map((leader, i) => (
                <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 text-emerald-900"
                >
                    <input
                        type="text"
                        placeholder="Leader Name"
                        value={leader.name}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "name"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={leader.photo}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "photo"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                    <input
                        type="text"
                        placeholder="Experience"
                        value={leader.experience}
                        onChange={(e) =>
                            handleChange(
                                "leaders",
                                e.target.value,
                                true,
                                i,
                                "experience"
                            )
                        }
                        className="border p-2 rounded-md w-full"
                    />
                </div>
            ))}

            <hr />

            <h2 className="text-lg font-semibold text-emerald-700">Lists</h2>

            {[
                "locationsToView",
                "stops",
                "schedule",
                "foodStops",
                "highlights",
                "facilities",
                "preparationTips",
            ].map((field) => (
                <div key={field}>
                    <label className="block font-medium text-gray-700 capitalize mt-4">
                        {field}
                    </label>
                    {(formData[field as keyof typeof formData] as string[]).map(
                        (val, i) => (
                            <input
                                key={i}
                                type="text"
                                placeholder={`${field} ${i + 1}`}
                                value={val}
                                onChange={(e) =>
                                    handleChange(field, e.target.value, true, i)
                                }
                                className="border p-2 rounded-md w-full text-emerald-900"
                            />
                        )
                    )}
                </div>
            ))}

            <hr />

            <button
                type="submit"
                className="w-full bg-emerald-700 text-white py-2 rounded-md hover:bg-emerald-600 transition"
            >
                Submit Trek
            </button>
        </form>
    );
}
