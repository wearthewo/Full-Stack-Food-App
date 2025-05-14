import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = params.get("session_id");
      if (!sessionId) return;

      try {
        // Step 1: Confirm the payment and create the order
        await api.post("/payment/confirm-payment", { sessionId });

        // Step 2: Clear cart after payment success
        await api.delete("/cart/clear");

        // Step 3: Redirect to orders page
        navigate("/orders");
      } catch (error) {
        console.error("Payment confirmation failed:", error.message);
      }
    };

    confirmPayment();
  }, [params, navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      {/* <p>Redirecting to your orders...</p> */}
    </div>
  );
};

export default PaymentSuccess;
