import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../_api/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: FormData) => {
      const res = await instance.post("/products", payload);
      return res.data;
    },
    onError: (error) => {
      const message =
        (error instanceof AxiosError && error.response?.data?.message) ||
        "product creation failed. Please try again.";
      toast.error(message);
    },
    onSuccess: async () => {
      toast.success("product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await instance.get("/products");
      return res.data.data;
    },
  });
};

export const useGetSingleProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await instance.get(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};
