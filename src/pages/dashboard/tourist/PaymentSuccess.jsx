
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, axiosInstance } = useAuth();
  const query = new URLSearchParams(location.search);
  const paymentId = query.get("payment_id");

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const dashboardPaths = {
    tourist: "/dashboard/tourist",
    organizer: "/dashboard/organizer",
    admin: "/dashboard/admin",
    guide: "/dashboard/guide",
  };

  const goToDashboard = () => {
    if (!user) return navigate("/login");
    const path = dashboardPaths[user.role] || "/";
    navigate(path);
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!paymentId) {
      setError("No payment ID provided.");
      setLoading(false);
      return;
    }

    const fetchPayment = async () => {
      try {
        const res = await axiosInstance.get(`/payments/${paymentId}/`);
        setPayment(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch payment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [user, paymentId]);

  // Countdown redirect
  useEffect(() => {
    if (!payment) return;
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          goToDashboard();
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [payment]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-700 dark:text-gray-300">Loading payment info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 dark:text-green-500">✅ Payment Successful!</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Thank you! Your payment has been successfully processed.
        </p>

        {payment && (
          <>
            {/* Payment Details */}
            <div className="mt-4 text-left text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p><strong>Payment ID:</strong> {payment.id}</p>
              <p><strong>Booking ID:</strong> {payment.booking_detail?.id}</p>
              <p><strong>Payment Amount:</strong> {payment.amount} BDT</p>
              <p><strong>Amount Paid:</strong> {payment.booking_detail?.amount_paid || payment.amount} BDT</p>
              <p><strong>Payment Status:</strong> {payment.booking_detail?.payment_status || payment.status}</p>
              <p><strong>Method:</strong> {payment.method}</p>
              <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
              <p><strong>Verified At:</strong> {formatDate(payment.verified_at)}</p>
            </div>

            {/* Payment Gateway Info */}
            {payment.gateway_payload && (
              <div className="mt-6 text-left">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Payment Gateway Info</h2>
                {(() => {
                  const desc = payment.gateway_payload.desc || [];
                  if (!desc.length && payment.gateway_payload.GatewayPageURL) {
                    return (
                      <a
                        href={payment.gateway_payload.GatewayPageURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-2 rounded bg-green-50 dark:bg-green-900"
                      >
                        <span className="text-sm font-semibold text-green-700 dark:text-green-300">Gateway Used</span>
                      </a>
                    );
                  }

                  // Group by type (fallback to "Other")
                  const groups = desc.reduce((acc, gw) => {
                    const type = gw.type || "Other";
                    if (!acc[type]) acc[type] = [];
                    acc[type].push(gw);
                    return acc;
                  }, {});

                  return Object.entries(groups).map(([type, gateways]) => (
                    <div key={type} className="mb-3">
                      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{type}</h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {gateways.map((gw) => {
                          const isUsed =
                            (payment.method && payment.method.toLowerCase().includes(gw.gw?.toLowerCase())) || false;
                          return (
                            <a
                              key={gw.gw}
                              href={gw.redirectGatewayURL || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center space-x-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                isUsed ? "border-2 border-green-500 bg-green-50 dark:bg-green-900" : ""
                              }`}
                            >
                              {gw.logo && <img src={gw.logo} alt={gw.name} className="w-6 h-6 object-contain" />}
                              <span className="text-sm text-gray-800 dark:text-gray-200">{gw.name}</span>
                              {isUsed && <span className="ml-auto text-xs text-green-700 dark:text-green-300 font-semibold">Used</span>}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </>
        )}

        <button
          onClick={goToDashboard}
          className="mt-6 px-5 py-3 bg-primary text-black dark:text-white rounded-xl hover:bg-primary/90"
        >
          Go to Dashboard
        </button>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Redirecting to dashboard in {countdown} second{countdown !== 1 ? "s" : ""}...
        </p>
      </div>
    </div>
  );
}
