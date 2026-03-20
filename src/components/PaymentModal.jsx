import React, { useState } from "react";
import { axiosInstance } from "../api/authAPI";

export default function PaymentModal({ booking, isOpen, onClose, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !booking) return null;

  const handleManualPay = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    try {
      setLoading(true);
      await axiosInstance.patch(`/bookings/${booking.id}/pay/`, {
        amount: amt,
        method: "cash",
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOnlinePay = async () => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return alert("Enter a valid amount");
    try {
      setLoading(true);
      const res = await axiosInstance.post("/payments/initiate/", {
        booking: booking.id,
        amount: amt,
        method: "sslcommerz",
      });
      if (res.data.gateway_url) {
        window.open(res.data.gateway_url, "_blank");
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert("Online payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-700 p-6 rounded-xl w-80">
        <h2 className="text-lg font-semibold mb-4">Pay Booking #{booking.id}</h2>

        <label className="block mb-2 text-sm">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border px-2 py-1 rounded mb-4 dark:text-white dark:bg-slate-700"
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleManualPay}
            disabled={loading}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Pay
          </button>
          <button
            onClick={handleOnlinePay}
            disabled={loading}
            className="px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Pay Online
          </button>
        </div>
      </div>
    </div>
  );
}
