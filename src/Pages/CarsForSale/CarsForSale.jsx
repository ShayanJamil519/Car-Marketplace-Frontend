import React, { useState, useEffect } from "react";
import Car from "../../Components/Navbar/CarsForSale/Car";
import Pagination from "../../Components/Pagination/Pagination";
import { dummyCarsData } from "../../data";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { animation } from "../../utils/animation";
import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const CarsForSale = () => {
  //   const [carsForSale, setCarsForSale] = useState([]);
  const navigate = useNavigate();
  const [carForSales, setCarForSales] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = carForSales.slice(indexOfFirstItem, indexOfLastItem);
  // console.log({ dummyCarsData });
  // console.log({ currentItems });

  const showPagination = carForSales.length > itemsPerPage ? true : false;

  useEffect(() => {
    const FetchCarsForSale = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      const fetchCars = await contract.getCarsForSale();

      console.log("fetchCars: ", fetchCars);

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
            // backgroundColor="#fffae5"
          >
            {currentItems.map((data, i) => (
              <Box key={i}>
                <Car
                  //   carId={Number(data.carId)}
                  carId={data.carId}
                  carName={data.name}
                  carDescription={data.description}
                  //   carOwner={data.owner.toString()}
                  carOwner={data.owner}
                  carHash={data.link}
                  //   carPrice={ethers.utils.formatEther(data.price).toString()}
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
