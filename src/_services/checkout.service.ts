import { useMutation } from "@tanstack/react-query";
import instance from "../_api/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface checkoutPayload {
  product: {
    productId: string;
    quantity: number;
    selectedVariants: { [key: string]: string };
  };
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  state: string;
  city: string;
  pickupOnEventDay: boolean;
}

export function useCheckoutShop() {
  return useMutation({
    mutationFn: async (payload: checkoutPayload) => {
      const res = await instance.post("/checkout-shop", payload);
      return res.data;
    },
    onError: (error) => {
      const message =
        (error instanceof AxiosError && error.response?.data?.message) ||
        "payment failed. Please try again.";
      toast.error(message);
    },
    onSuccess: async (data) => {
      toast.success("redirecting to payment...");
      window.location.href = data.authorization_url;
    },
  });
}
