import { axiosIntance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateStudent = (onSuccess) => {
  return useMutation({
    mutationFn: async ({ id, ...body }) => {
      const studentResponse = await axiosIntance.put(
        `/api/student/${id}`,
        body
      );
      return studentResponse;
    },
    onSuccess,
  });
};
