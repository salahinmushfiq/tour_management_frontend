import React from "react";

export default function PaymentCancelled() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-yellow-500">
          ⚠️ Payment Cancelled
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          You cancelled the payment. No amount was deducted.
        </p>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="mt-6 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary/90"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
