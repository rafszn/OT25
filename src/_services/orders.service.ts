import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../_api/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await instance.get("/orders");
      return res.data.data;
    },
  });
};

export const useGetSingleOrder = (id: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await instance.get(`/orders/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateOrderTimeline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, stepKey }: { id: string; stepKey: string }) => {
      const res = await instance.post(`/orders/timeline/${id}`, { stepKey });
      return res.data;
    },
    onError: (error) => {
      const message =
        (error instanceof AxiosError && error.response?.data?.message) ||
        "Failed to update order timeline. Please try again.";
      toast.error(message);
    },
    onSuccess: async (_, { id }) => {
      toast.success("Order timeline updated");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
};
