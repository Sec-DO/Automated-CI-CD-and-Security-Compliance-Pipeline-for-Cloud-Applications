import { User, Mail, Clock, Mountain } from "lucide-react";
import { User as UserType } from "./UserProfile";

interface Props {
    user: UserType;
}

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

export default function ProfileCard({ user }: Props) {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 right-4">
                    <Mountain className="w-24 h-24 text-emerald-500" />
                </div>
                <div className="absolute bottom-4 left-4">
                    <Mountain className="w-16 h-16 text-emerald-500" />
                </div>
            </div>

            <div className="relative mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <User className="w-16 h-16 text-white" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {user.name}
            </h2>
            <p className="text-gray-600 mb-2 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                Member since {formatDate(user.createdAt)}
            </div>

            <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    user.profileComplete
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                }`}
            >
                <div
                    className={`w-2 h-2 rounded-full ${
                        user.profileComplete ? "bg-green-400" : "bg-yellow-400"
                    }`}
                ></div>
                Profile {user.profileComplete ? "Complete" : "Incomplete"}
            </div>
        </div>
    );
}
