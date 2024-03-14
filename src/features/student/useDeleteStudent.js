import { axiosIntance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteStudent = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (id) => {
      const studentResponse = await axiosIntance.delete(`/api/student/${id}`);
      //   console.log(studentResponse);
      return studentResponse;
    },
    // ketika delete sukses, otomatis data di update
    onSuccess,
  });
};
