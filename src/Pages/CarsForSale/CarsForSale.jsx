import React, { useState, useEffect } from "react";
import Car from "../../Components/CarsForSale/Car";
import Pagination from "../../Components/Pagination/Pagination";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { animation } from "../../utils/animation";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { ethers } from "ethers";

const CarsForSale = () => {
  const [carForSales, setCarForSales] = useState([]); //  carForSales state
  const { onOpen } = useDisclosure(); // Modal States

  const [currentPage, setCurrentPage] = useState(1); // Pagination Logic
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = carForSales.slice(indexOfFirstItem, indexOfLastItem);

  // If cars are more than 6 then pagination will show
  const showPagination = carForSales.length > itemsPerPage ? true : false;

  useEffect(() => {
    const FetchCarsForSale = async () => {
      // Connecting to Blockchain
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      // Calling Smart Contrat Function
      const fetchCars = await contract.getCarsForSale();

      // Set the files state variable
      setCarForSales(fetchCars);
    };

    FetchCarsForSale();
  }, []);

  return (
    <Box backgroundColor="#fffae5">
      <Box paddingTop="3em">
        <Text
          mb={"25px"}
          fontSize={{ base: "3xl", md: "5xl" }}
          textAlign="center"
          textTransform="uppercase"
          textColor="#ff9b2f"
          animation={` ${animation} 0.8s ease-out`}
        >
          Cars for sale
        </Text>
      </Box>

      {currentItems.length === 0 ? (
        <Box
          minHeight={"60vh"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize="4xl">Sorry, there's no car for sale right now</Text>
        </Box>
      ) : (
        <Box paddingBottom={10}>
          <SimpleGrid
            spacing={10}
            templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
            paddingTop={5}
            paddingBottom={5}
            paddingX={{ base: "1em", md: "5em" }}
          >
            {currentItems.map((data, i) => (
              <Box key={i}>
                <Car
                  carId={data.carId}
                  carName={data.name}
                  carDescription={data.description}
                  carOwner={data.owner}
                  carHash={data.link}
                  carPrice={data.price}
                  onOpen={onOpen}
                />
              </Box>
            ))}
          </SimpleGrid>

          {showPagination && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={carForSales.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default CarsForSale;
