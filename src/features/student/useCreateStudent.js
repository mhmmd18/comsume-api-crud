import { axiosIntance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateStudent = ({onSuccess}) => {
    return useMutation({
        mutationFn: async (body) => {
          // console.log(body);
          const studentResponse = await axiosIntance.post("/api/student", body);
          return studentResponse;
        },
        // ketika add sukses, otomatis data di update
        onSuccess,
      });
}