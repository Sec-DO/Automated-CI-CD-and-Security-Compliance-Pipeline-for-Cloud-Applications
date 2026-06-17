import TrekForm from '@/components/leader/TrekForm';
import React from 'react'

function Page() {
  return (
      <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-emerald-800 mb-6">
              Create New Trek
          </h1>
          <TrekForm />
      </div>
  );
}

export default Page