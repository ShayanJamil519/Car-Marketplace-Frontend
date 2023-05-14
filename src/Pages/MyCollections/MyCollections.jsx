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
  Button,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Pagination from "../../Components/Pagination/Pagination";
import { dummyMyCollectionsData } from "../../data";
import DeleteCarModal from "../../Components/Modals/DeleteCarModal";
import EditCarModal from "../../Components/Modals/EditCarModal";
import { animation } from "../../utils/animation";

const MyCollections = () => {
  const [editCarId, setEditCarId] = useState(null);
  const [deleteCarId, setDeleteCarId] = useState(null);

  const {
    isOpen: isEditCarModalOpen,
    onOpen: onEditCarModalOpen,
    onClose: onEditCarModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteCarModalOpen,
    onOpen: onDeleteCarModalOpen,
    onClose: onDeleteCarModalClose,
  } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);

  const handleEditClick = (carId) => {
    setEditCarId(carId);
    onEditCarModalOpen();
  };

  const handleDeleteClick = (carId) => {
    setDeleteCarId(carId);
    onDeleteCarModalOpen();
  };

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyMyCollectionsData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const showPagination =
    dummyMyCollectionsData.length > itemsPerPage ? true : false;

  return (
    <>
      <Box
        paddingY="10"
        paddingX={{ base: "0.5em", md: "3em" }}
        minHeight={"90vh"}
      >
        <Text
          mb={"25px"}
          fontSize={{ base: "3xl", md: "5xl" }}
          textAlign="center"
          textTransform="uppercase"
          textColor="#ff9b2f"
          animation={` ${animation} 0.8s ease-out`}
        >
          My Collections
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
                <Th fontSize="xl">Action</Th>
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
                      <Td>
                        <Button
                          onClick={() => handleEditClick(data?.carId)}
                          colorScheme="teal"
                          backgroundColor="black"
                          size="md"
                          minWidth="100px"
                          marginRight={"40px"}
                          _hover={{
                            backgroundColor: "blackAlpha.800",
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleDeleteClick(data?.carId)}
                          colorScheme="red"
                          minWidth="100px"
                          size="md"
                          _hover={{
                            backgroundColor: "red.400",
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  </>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Edit Card Modal */}
        {editCarId && (
          <EditCarModal
            isOpen={isEditCarModalOpen}
            onOpen={onEditCarModalOpen}
            onClose={onEditCarModalClose}
            carId={editCarId}
          />
        )}

        {/* Delete Card Modal */}
        {deleteCarId && (
          <DeleteCarModal
            isOpen={isDeleteCarModalOpen}
            onOpen={onDeleteCarModalOpen}
            onClose={onDeleteCarModalClose}
            carId={deleteCarId}
          />
        )}

        {/* Pagination */}
        {showPagination && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={dummyMyCollectionsData.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    </>
  );
};

export default MyCollections;
