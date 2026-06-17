import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useEffect } from "react";

interface GroupSelectionCardProps {
    groupType: string;
    setGroupType: (value: string) => void;
    adults: number;
    setAdults: (value: number) => void;
    children: number;
    setChildren: (value: number) => void;
}

export function GroupSelectionCard({
    groupType,
    setGroupType,
    adults,
    setAdults,
    children,
    setChildren,
}: GroupSelectionCardProps) {
    useEffect(() => {
        if (groupType === "Solo") {
            setAdults(1);
            setChildren(0);
        } else if (groupType === "Couple") {
            setAdults(2);
            setChildren(0);
        } else {
            setAdults(0);
            setChildren(0);
        }
    }, [groupType, setAdults, setChildren]);

    const isAdultDisabled = groupType === "Solo" || groupType === "Couple";
    const isChildrenDisabled = groupType === "Solo" || groupType === "Couple";

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Group Details
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Group Type *
                    </label>
                    <Select value={groupType} onValueChange={setGroupType}>
                        <SelectTrigger className="w-full border-2 border-gray-300 bg-white rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300">
                            <SelectValue placeholder="Select group type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border text-gray-800 border-gray-200 rounded-lg shadow-lg">
                            <SelectItem
                                value="Solo"
                                className="bg-white hover:bg-gray-50"
                            >
                                Solo Explorer
                            </SelectItem>
                            <SelectItem
                                value="Couple"
                                className="bg-white hover:bg-gray-50"
                            >
                                Couple Adventure
                            </SelectItem>
                            <SelectItem
                                value="Family"
                                className="bg-white hover:bg-gray-50"
                            >
                                Family Trek
                            </SelectItem>
                            <SelectItem
                                value="Friends"
                                className="bg-white hover:bg-gray-50"
                            >
                                Friends Group
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adults *
                        </label>
                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={adults}
                            onChange={(e) => {
                                const value = Math.max(
                                    1,
                                    parseInt(e.target.value) || 1
                                );
                                setAdults(value);
                            }}
                            className={`w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 ${
                                isAdultDisabled
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={isAdultDisabled}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Children
                        </label>
                        <input
                            type="number"
                            min={0}
                            max={20}
                            value={children}
                            onChange={(e) => {
                                const value = Math.max(
                                    0,
                                    parseInt(e.target.value) || 0
                                );
                                setChildren(value);
                            }}
                            className={`w-full border-2 border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 ${
                                isChildrenDisabled
                                    ? "bg-gray-100 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={isChildrenDisabled}
                        />
                    </div>
                </div>

                {children > 0 && (
                    <p className="text-sm text-gray-500">
                        * Children receive 40% discount
                    </p>
                )}
            </div>
        </div>
    );
}
