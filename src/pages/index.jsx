import { useCreateStudent } from "@/features/student/useCreateStudent";
import { useDeleteStudent } from "@/features/student/useDeleteStudent";
import { useFetchStudents } from "@/features/student/useFetchStudents";
import { useUpdateStudent } from "@/features/student/useUpdateStudent";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  // muncul toast
  const toast = useToast();
  // ambil dari return useStudent, GET Students
  const {
    data,
    isLoading: isLoadingStudent,
    refetch: refetchStudent,
  } = useFetchStudents({
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to fetch students",
        status: "error",
      });
    },
  });
  // handdle input form
  const handdleInputForm = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };
  // handdle validasi form
  const formik = useFormik({
    initialValues: {
      id: "",
      nama: "",
      tanggalLahir: "",
      jenisKelamin: "",
      alamat: "",
      kelas: "",
      jurusan: "",
    },
    // Post ke API Student
    onSubmit: () => {
      // body yang dikirim
      const { nama, tanggalLahir, jenisKelamin, alamat, kelas, jurusan, id } =
        formik.values;
      // console.log(formik.values);
      // jika ada id, maka update, jika tidak, create
      if (id) {
        updateStudent({
          id,
          nama,
          tanggalLahir,
          jenisKelamin,
          alamat,
          kelas,
          jurusan,
        });
        toast({
          title: "Success",
          description: "Student updated successfully",
          status: "success",
        });
      } else {
        // mutete diambil paramater dari useMutation
        createStudent({
          nama,
          tanggalLahir,
          jenisKelamin,
          alamat,
          kelas,
          jurusan,
        });
        // mencetak toast
        toast({
          title: "Success",
          description: "Student created successfully",
          status: "success",
        });
      }
      // setelah berhasil post, maka form input di reset
      formik.setFieldValue("id", "");
      formik.setFieldValue("nama", "");
      formik.setFieldValue("tanggalLahir", "");
      formik.setFieldValue("jenisKelamin", "");
      formik.setFieldValue("alamat", "");
      formik.setFieldValue("kelas", "");
      formik.setFieldValue("jurusan", "");
    },
  });
  // POST
  const { mutate: createStudent, isLoading: createStudentIsLoading } =
    useCreateStudent({
      // ketika add sukses, otomatis data di update
      onSuccess: () => {
        refetchStudent();
      },
    });

  // DELETE
  const { mutate: deleteStudent } = useDeleteStudent({
    onSuccess: () => {
      refetchStudent();
    },
  });

  // PUT
  const { mutate: updateStudent, isLoading: updateStudentIsLoading } =
    useUpdateStudent({
      onSuccess: () => {
        refetchStudent();
      },
    });

  const confirmDelete = (id) => {
    const isDelete = confirm("Are you sure delete this student?");
    if (isDelete) {
      deleteStudent(id);
      toast({
        title: "Success",
        description: "Student deleted successfully",
        status: "info",
      });
    }
  };

  // Buat state untuk mengontrol visibilitas form control
  const [isEditing, setIsEditing] = useState(false);
  const onEditClick = (student) => {
    formik.setFieldValue("id", student._id);
    formik.setFieldValue("nama", student.nama);
    formik.setFieldValue("tanggalLahir", student.tanggalLahir);
    formik.setFieldValue("jenisKelamin", student.jenisKelamin);
    formik.setFieldValue("alamat", student.alamat);
    formik.setFieldValue("kelas", student.kelas);
    formik.setFieldValue("jurusan", student.jurusan);
    // Set isEditing menjadi true untuk menampilkan form control
    setIsEditing(true);
  };

  const renderProducts = () => {
    return data?.map((student, index) => {
      return (
        <Tr key={student._id}>
          <Td>{index + 1}</Td>
          <Td>{student.nama}</Td>
          <Td>{student.tanggalLahir}</Td>
          <Td>{student.jenisKelamin}</Td>
          <Td>{student.alamat}</Td>
          <Td>{student.kelas}</Td>
          <Td>{student.jurusan}</Td>
          <Td>
            <Button
              colorScheme="yellow"
              onClick={() => {
                onEditClick(student);
              }}
            >
              Edit
            </Button>
          </Td>
          <Td>
            <Button
              colorScheme="red"
              onClick={() => {
                confirmDelete(student._id);
              }}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Heading>Home Page</Heading>
          <Table mb={10}>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama</Th>
                <Th>Tanggal Lahir</Th>
                <Th>Jenis Kelamin</Th>
                <Th>Alamat</Th>
                <Th>Kelas</Th>
                <Th>Jurusan</Th>
                <Th colSpan={2}>Aksi</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoadingStudent ? <Spinner /> : null}
              {renderProducts()}
            </Tbody>
          </Table>
          <Heading>
            {isEditing ? "Form Edit Student" : "Form Add Student"}
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={2}>
              {/* menangkap form input */}
              {/* <Text>{formik.values.alamat}</Text> */}
              <FormControl display={isEditing ? "block" : "none"}>
                <FormLabel>ID</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="id"
                  value={formik.values.id}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Nama</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="nama"
                  value={formik.values.nama}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Tanggal Lahir</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="tanggalLahir"
                  type="date"
                  value={formik.values.tanggalLahir}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Jenis Kelamin</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="jenisKelamin"
                  value={formik.values.jenisKelamin}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Alamat</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="alamat"
                  value={formik.values.alamat}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Kelas</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="kelas"
                  value={formik.values.kelas}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Jurusan</FormLabel>
                <Input
                  onChange={handdleInputForm}
                  name="jurusan"
                  value={formik.values.jurusan}
                />
              </FormControl>
              {createStudentIsLoading || updateStudentIsLoading ? (
                <Spinner />
              ) : null}
              <Button type="submit" bg={"blue.500"}>
                Submit
              </Button>
            </VStack>
          </form>
        </Container>
      </main>
    </>
  );
}
