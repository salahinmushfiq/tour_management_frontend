import React from "react";

export default function PaymentProcessing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          🔄 Processing Payment...
        </h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Please wait while we verify your transaction.
        </p>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Do not close this page.
        </p>
      </div>
    </div>
  );
}
