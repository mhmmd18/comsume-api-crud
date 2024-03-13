const { axiosIntance } = require("@/lib/axios");
const { useState, useEffect } = require("react");

export const useStudent = () => {
  const [students, setStudents] = useState([]); //Simpan data response dari API
  const [isLoading, setIsLoading] = useState(false);
  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      // Tambahkan timeout untuk menunggu 2 detik sebelum memanggil API
      setTimeout(async () => {
        // buat library untuk membuat base url di setiap endpointnya
        const stundentsResponse = await axiosIntance.get("/api/student");
        // console.log(stundentsResponse);
        setStudents(stundentsResponse.data.data);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    data: students,
    isLoading,
  }
};
