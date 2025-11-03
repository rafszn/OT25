import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../_api/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await instance.post("/auth/sign-in", payload);
      return res.data;
    },
    onError: (error) => {
      const message =
        (error instanceof AxiosError && error.response?.data?.message) ||
        "Login failed. Please try again.";
      toast.error(message, {
        duration: 4000,
      });
    },
    onSuccess: async (data) => {
      toast.success("Login successful");
      localStorage.setItem("access_token", data.accessToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await instance.get("/auth/me");
      return res.data.data;
    },
  });
};
