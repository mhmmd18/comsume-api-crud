import { axiosIntance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchStudents = () => {
  return useQuery({
    queryFn: async () => {
      const stundentsResponse = await axiosIntance.get("/api/student");
      //   console.log(stundentsResponse);
      return stundentsResponse.data.data;
    },
  });
};
