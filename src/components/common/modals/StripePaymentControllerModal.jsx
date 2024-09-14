import { Box, Modal, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearToken, getUserRole } from "../../../utils/auth";
import CustomButton from "../CustomButton";
import Loader from "../Loader";
import { saveOrderPayment } from "../../../Redux/actions/stripe";

const StripePaymentControllerModal = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updatePaymentStatus = (toastStatus, messageStatus, message) => {
    toast[toastStatus](message);
    navigate("/home");

    // let customerUUID = localStorage.getItem("customerUUID");
    // let payload = {
    //   customerUUID: customerUUID,
    //   orderId: id,
    //   paymentStatus: messageStatus,
    // };

    // dispatch(saveOrderPayment(payload)).then((e) => {
    //   toast[toastStatus](message);
    //   navigate("/home");
    // });
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          updatePaymentStatus(
            "success",
            "SUCCESS",
            "Payment succeeded, Order placed successfully"
          );
          break;
        case "processing":
          updatePaymentStatus(
            "warning",
            "PENDING",
            "Your payment is processing."
          );
          break;
        case "requires_payment_method":
          updatePaymentStatus(
            "error",
            "FAILED",
            "Your payment was not successful, please try again."
          );
          break;
        default:
          updatePaymentStatus("error", "FAILED", "Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/home/orderDetails/${id}`,
        // return_url: `https://apponebaypharma.com/home/orderDetails/${id}`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: "30%",
          maxWidth: "90vw",
          maxHeight: "90vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          overflow: "auto",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
          />

          <CustomButton
            sx={{ mt: 2 }}
            variant="contained"
            type="submit"
            disabled={loading || !stripe || !elements}
          >
            <span id="button-text">Pay now</span>
          </CustomButton>

          {message && (
            <Typography
              variant="body2"
              color={"error.main"}
              mt={1}
              textAlign={"center"}
            >
              {message}
            </Typography>
          )}
        </form>

        <Loader isLoading={loading} />
      </Box>
    </Modal>
  );
};

export default StripePaymentControllerModal;
