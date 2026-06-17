import {
    Edit3,
    Save,
    X,
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
} from "lucide-react";
import { User as UserType } from "./UserProfile";

interface Props {
    user: UserType;
    isEditing: boolean;
    setIsEditing: (v: boolean) => void;
    editForm: {
        name: string;
        phone: string;
        age: string;
        emergencyContact: string;
        address: string;
    };
    onInputChange: (field: string, value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export default function ProfileDetails({
    user,
    isEditing,
    setIsEditing,
    editForm,
    onInputChange,
    onSave,
    onCancel,
}: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Profile Details
                </h3>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <Edit3 className="w-4 h-4" />
                        Edit
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={onSave}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <Save className="w-4 h-4" />
                            Save
                        </button>
                    </div>
                )}
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <User className="w-4 h-4 text-emerald-600" />
                        Full Name
                    </label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                                onInputChange("name", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your full name"
                        />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                            {user.name}
                        </div>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        Phone Number
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editForm.phone}
                            onChange={(e) =>
                                onInputChange("phone", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your phone number"
                        />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                            {user.profile?.phone || "Not provided"}
                        </div>
                    )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Calendar className="w-4 h-4 text-emerald-600" />
                        Age
                    </label>
                    {isEditing ? (
                        <input
                            type="number"
                            value={editForm.age}
                            onChange={(e) =>
                                onInputChange("age", e.target.value)
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter your age"
                            min="16"
                            max="100"
                        />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                            {user.profile?.age
                                ? `${user.profile?.age} years`
                                : "Not provided"}
                        </div>
                    )}
                </div>

                {/* Email (Read-only) */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        Email Address
                    </label>
                    <div className="px-4 py-3 bg-gray-100 rounded-xl text-gray-600 italic">
                        {user.email}
                    </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        Emergency Contact
                    </label>
                    {isEditing ? (
                        <input
                            type="tel"
                            value={editForm.emergencyContact}
                            onChange={(e) =>
                                onInputChange(
                                    "emergencyContact",
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                            placeholder="Enter emergency phone number"
                        />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                            {user.profile?.emergencyContact || "Not provided"}
                        </div>
                    )}
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        Address
                    </label>
                    {isEditing ? (
                        <textarea
                            value={editForm.address}
                            onChange={(e) =>
                                onInputChange("address", e.target.value)
                            }
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                            placeholder="Enter your complete address"
                        />
                    ) : (
                        <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium min-h-[80px] flex items-center">
                            {user.profile?.address || "Not provided"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
