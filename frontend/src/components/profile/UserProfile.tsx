"use client";
import React, { useEffect, useState } from "react";
import {
    getUserProfile,
    updateUserProfile,
} from "@/api/operations/profileAPIs";
import { useAuthStore } from "@/stores/authStore";
import ProfileCard from "./ProfileCard";
import ProfileDetails from "./ProfileDetails";

export interface User {
    userId: string;
    name: string;
    email: string;
    profileComplete: boolean;
    createdAt: string;
    profile: {
        phone?: string;
        age?: number;
        emergencyContact?: string;
        address?: string;
    };
}

export default function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        phone: "",
        age: "",
        emergencyContact: "",
        address: "",
    });

    const token = useAuthStore((state) => state.user?.token);

    useEffect(() => {
        if (!token) return;
        const fetchUserData = async () => {
            const response = await getUserProfile(token);
            setUser(response.data);
        };
        fetchUserData();
    }, [token]);

    useEffect(() => {
        if (user) {
            setEditForm({
                name: user.name,
                phone: user.profile?.phone || "",
                age: user.profile?.age?.toString() || "",
                emergencyContact: user.profile?.emergencyContact || "",
                address: user.profile?.address || "",
            });
        }
    }, [user]);

    const handleSave = async () => {
        if (!token || !user) return;

        await updateUserProfile(token, {
            ...editForm,
            age: Number(editForm.age),
        });

        setUser({
            ...user,
            name: editForm.name,
            profile: {
                phone: editForm.phone,
                age: Number(editForm.age),
                emergencyContact: editForm.emergencyContact,
                address: editForm.address,
            },
            profileComplete:
                !!editForm.name &&
                !!editForm.phone &&
                !!editForm.age &&
                !!editForm.emergencyContact &&
                !!editForm.address,
        });

        setIsEditing(false);
    };

    const handleCancel = () => {
        if (!user) return;
        setEditForm({
            name: user.name,
            phone: user.profile?.phone || "",
            age: user.profile?.age?.toString() || "",
            emergencyContact: user.profile?.emergencyContact || "",
            address: user.profile?.address || "",
        });
        setIsEditing(false);
    };

    const handleInputChange = (field: string, value: string) => {
        if (field === "phone") {
            const digits = value.replace(/\D/g, "");
            let formattedPhone = "";
            if (digits.length > 0) {
                if (digits.startsWith("91") && digits.length <= 12) {
                    formattedPhone = `+91${digits.slice(2)}`;
                } else if (digits.length <= 10) {
                    formattedPhone = `+91${digits}`;
                } else {
                    formattedPhone = `+91${digits.slice(-10)}`;
                }
            }
            setEditForm((prev) => ({ ...prev, phone: formattedPhone }));
        } else if(field === "emergencyContact") {
            const digits = value.replace(/\D/g, "");
            let formattedContact = "";
            if (digits.length > 0) {
                if (digits.startsWith("91") && digits.length <= 12) {
                    formattedContact = `+91${digits.slice(2)}`;
                } else if (digits.length <= 10) {
                    formattedContact = `+91${digits}`;
                } else {
                    formattedContact = `+91${digits.slice(-10)}`;
                }
            }
            setEditForm((prev) => ({ ...prev, emergencyContact: formattedContact }));
        } else {
            setEditForm((prev) => ({ ...prev, [field]: value }));
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
            <div className="max-w-4xl mx-auto grid lg:grid-cols-3 gap-8">
                <ProfileCard user={user} />
                <ProfileDetails
                    user={user}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editForm={editForm}
                    onInputChange={handleInputChange}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}
