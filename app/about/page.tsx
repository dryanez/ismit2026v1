"use client";

import { useState } from "react";

export default function TestPaymentPage() {
  const [amount, setAmount] = useState("10.00");
  const [currency, setCurrency] = useState("EUR");
  const [description, setDescription] = useState("Test Registration");
  const [registrationId, setRegistrationId] = useState(`TEST_REG_${Date.now()}`);
  const [userEmail, setUserEmail] = useState("test@example.com");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency,
          description,
          registrationId,
          userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok && data.id && data.checkout_url) {
        window.location.href = data.checkout_url; // Redirect to SumUp payment page
      } else {
        setError(data.error || "Failed to create checkout.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test SumUp Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block">Amount:</label><input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="border p-2 w-full" required /></div>
        <div><label className="block">Currency:</label><input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="border p-2 w-full" required /></div>
        <div><label className="block">Description:</label><input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" required /></div>
        <div><label className="block">Registration ID:</label><input type="text" value={registrationId} onChange={(e) => setRegistrationId(e.target.value)} className="border p-2 w-full" required /></div>
        <div><label className="block">User Email:</label><input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="border p-2 w-full" required /></div>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded disabled:opacity-50">
          {loading ? "Creating Checkout..." : "Initiate Payment"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}