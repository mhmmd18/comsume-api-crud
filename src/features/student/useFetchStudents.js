import { axiosIntance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchStudents = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      try {
        const stundentsResponse = await axiosIntance.get("/api/student");
        return stundentsResponse.data.data;
      } catch (error) {
        onError && onError(); // Panggil onError jika ada
        throw error; // Lanjutkan lemparkan kesalahan agar dapat ditangani di tempat lain
      }
    },
    queryKey: ["fetch-students"],
  });
};