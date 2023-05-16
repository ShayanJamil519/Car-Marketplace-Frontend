import React, { useState, useEffect } from "react";

import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import Pagination from "../../Components/Pagination/Pagination";
import { animation } from "../../utils/animation";

import FileStorageMarketplace from "../../CarMarketplace.json";
import { ethers } from "ethers";

const SoldCars = () => {
  const [soldCars, setSoldCars] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = soldCars.slice(indexOfFirstItem, indexOfLastItem);
  const showPagination = soldCars.length > itemsPerPage ? true : false;

  const Click = (link) => {
    window.open(`https://gateway.pinata.cloud/ipfs/${link}`, "_blank");
  };

  useEffect(() => {
    const FetchSoldCars = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      const soldCars = await contract.getAllSoldFile();

      // Set the files state variable
      setSoldCars(soldCars);
    };

    FetchSoldCars();
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
                      <Td paddingY="15px">{Number(data?.carId)}</Td>
                      <Td>{data?.name}</Td>
                      <Td>
                        <Link
                          fontWeight="light"
                          fontSize="sm"
                          onClick={() => Click(data.link)}
                          isExternal
                        >
                          {data.link.slice(0, 20) +
                            "..." +
                            data.link.slice(-20)}{" "}
                          <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Td>
                      <Td>{ethers.utils.formatEther(data?.price)}</Td>
                      <Td>{`${data?.owner?.slice(
                        0,
                        16
                      )}....${data?.owner?.slice(-8)}`}</Td>
                      {data.oldOwner.map((dat, i) => (
                        <Td>{dat}</Td>
                      ))}
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
            totalItems={soldCars.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    </>
  );
};

export default SoldCars;
