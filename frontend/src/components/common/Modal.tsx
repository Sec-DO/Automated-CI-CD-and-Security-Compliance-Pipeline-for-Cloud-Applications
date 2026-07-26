"use client";

import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (typeof window === "undefined") return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
            <style jsx>{`
                @keyframes scale-in {
                    from {
                        opacity: 0;
                        transform: scale(0.9) translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                .animate-scale-in {
                    animation: scale-in 0.3s ease-out;
                }
            `}</style>
        </div>,
        document.body
    );
}
