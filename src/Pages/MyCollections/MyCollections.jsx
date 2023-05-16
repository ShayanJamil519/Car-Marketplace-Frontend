import React, { useEffect, useState } from "react";
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
import { animation } from "../../utils/animation";
import SetCarForSaleModal from "../../Components/Modals/SetCarForSaleModal";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const MyCollections = () => {
  const navigate = useNavigate();
  const [PriceCarId, setPriceCarId] = useState(null);
  const [myCars, setMyCars] = useState([]);

  const {
    isOpen: isPriceSetOpen,
    onOpen: onPriceSetOpen,
    onClose: onPriceSetClose,
  } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1); //Pagination Logic

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = myCars.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = myCars.length > itemsPerPage ? true : false;

  const handlePriceSetClick = async (carId) => {
    // Connecting to Blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      FileStorageMarketplace.address,
      FileStorageMarketplace.abi,
      signer
    );

    // Calling Smart Contrat Function
    const carForSale = await contract.setCarForSale(carId);

    const receipt = await carForSale.wait(); // Wait for the transaction to be mined

    if (receipt.status === 1) {
      toast.success("Car on sale now!");
      navigate("/cars_for_sale");
    } else {
      toast.error("Transaction Failed");
    }
  };

  const Click = (Hash) => {
    window.open(`https://gateway.pinata.cloud/ipfs/${Hash}`, "_blank");
  };

  useEffect(() => {
    const FetchMyCars = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      const fetchCars = await contract.getMyCars();

      // Set the files state variable
      setMyCars(fetchCars);
    };

    FetchMyCars();
  }, []);

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
                      <Td paddingY="15px">{Number(data.carId)}</Td>
                      <Td>{data?.name}</Td>
                      <Td>
                        <Link
                          fontWeight="light"
                          fontSize="sm"
                          onClick={() => Click(data.carHash)}
                          isExternal
                        >
                          {data.link.slice(0, 20) +
                            "..." +
                            data.link.slice(-20)}{" "}
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Td>
                      <Td>{ethers.utils.formatEther(data?.price)} ETH</Td>
                      <Td>
                        <Button
                          onClick={() => handlePriceSetClick(data?.carId)}
                          colorScheme="teal"
                          backgroundColor="black"
                          size="md"
                          marginRight={"40px"}
                          _hover={{
                            backgroundColor: "blackAlpha.800",
                          }}
                        >
                          Set Car For Sale
                        </Button>
                      </Td>
                    </Tr>
                  </>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Price Set Card Modal */}
        {PriceCarId && (
          <SetCarForSaleModal
            isOpen={isPriceSetOpen}
            onOpen={onPriceSetOpen}
            onClose={onPriceSetClose}
            carId={PriceCarId}
          />
        )}

        {/* Pagination */}
        {showPagination && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={myCars.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    </>
  );
};

export default MyCollections;
