import React, { useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  useDisclosure,
  Box,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Pagination from "../../Components/Pagination/Pagination";
import { dummySoldCarsData } from "../../data";

const SoldCars = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummySoldCarsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination = dummySoldCarsData.length > itemsPerPage ? true : false;

  return (
    <>
      <Box
        paddingY="10"
        paddingX={{ base: "0.5em", md: "3em" }}
        minHeight={"90vh"}
      >
        <Text
          mb={"2"}
          fontSize={{ base: "3xl", md: "5xl" }}
          textAlign="center"
          textTransform="uppercase"
          textColor="#0d8775"
        >
          All Sold Cars
        </Text>

        {/* Table */}

        <TableContainer>
          <Table size="sm" border="1px" borderColor="gray.200">
            <Thead>
              <Tr>
                <Th fontSize="xl">Car ID</Th>
                <Th paddingY="1em" fontSize="xl">
                  Car Name
                </Th>
                <Th fontSize="xl">Car Hash</Th>
                <Th fontSize="xl">Car Price</Th>
                <Th fontSize="xl">Current Owner</Th>
                <Th fontSize="xl">Old Owners</Th>
              </Tr>
            </Thead>

            <Tbody>
              {currentItems.length === 0 ? (
                <Tr>
                  <Text fontSize="3xl" textAlign="center" paddingY={10}>
                    There is no sar sold uptill now
                  </Text>
                </Tr>
              ) : (
                currentItems.map((data, i) => (
                  <>
                    <Tr key={i}>
                      <Td paddingY="15px">{data?.carId}</Td>
                      <Td>{data?.carName}</Td>
                      <Td>
                        <Link
                          fontWeight="light"
                          fontSize="sm"
                          //   onClick={() => click(data.carHash)}
                          isExternal
                        >
                          {data.carHash.slice(0, 20) +
                            "..." +
                            data.carHash.slice(-20)}{" "}
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Td>
                      <Td>{data?.carPrice}</Td>
                      <Td>{`${data?.carOwner?.slice(
                        0,
                        16
                      )}....${data?.carOwner?.slice(-8)}`}</Td>
                      <Td>{`${data?.carOldOwner?.slice(
                        0,
                        16
                      )}....${data?.carOldOwner?.slice(-8)}`}</Td>
                    </Tr>
                  </>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {showPagination && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={dummySoldCarsData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    </>
  );
};

export default SoldCars;
