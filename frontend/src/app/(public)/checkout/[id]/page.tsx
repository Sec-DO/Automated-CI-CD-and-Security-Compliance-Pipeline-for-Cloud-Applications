import CheckoutPage from '@/components/checkout/CheckOutPage'
import React from 'react'

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;
    return <CheckoutPage trekId={id} />;
}