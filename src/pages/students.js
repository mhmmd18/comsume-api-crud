import { useFetchStudents } from "@/features/student/useFetchStudents";
import {
  Container,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Students() {
  const { data, isLoading } = useFetchStudents();

  const renderStudents = () => {
    return data?.map((student) => {
      return (
        <Tr key={student._id}>
          <Td>{student._id}</Td>
          <Td>{student.nama}</Td>
          <Td>{student.tanggalLahir}</Td>
          <Td>{student.jenisKelamin}</Td>
          <Td>{student.alamat}</Td>
          <Td>{student.kelas}</Td>
          <Td>{student.jurusan}</Td>
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
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Nama</Th>
                <Th>Tanggal Lahir</Th>
                <Th>Jenis Kelamin</Th>
                <Th>Alamat</Th>
                <Th>Kelas</Th>
                <Th>Jurusan</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? <Spinner /> : null}
              {renderStudents()}
            </Tbody>
          </Table>
        </Container>
      </main>
    </>
  );
}
