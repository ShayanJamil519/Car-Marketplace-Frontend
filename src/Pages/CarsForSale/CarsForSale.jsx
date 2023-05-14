import Car from "../../Components/Navbar/CarsForSale/Car";
import Pagination from "../../Components/Pagination/Pagination";
import { dummyCarsData } from "../../data";
import { SimpleGrid, Box, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

const CarsForSale = () => {
  //   const [carsForSale, setCarsForSale] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyCarsData.slice(indexOfFirstItem, indexOfLastItem);
  console.log({ dummyCarsData });
  console.log({ currentItems });

  const showPagination = dummyCarsData.length > itemsPerPage ? true : false;

  return (
    <>
      <Box backgroundColor="#f2fffe" paddingTop="3em">
        <Text
          fontSize={{ base: "4xl", md: "5xl" }}
          textAlign="center"
          textTransform="uppercase"
          textColor="#ff9b2f"
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
            paddingTop={12}
            paddingBottom={5}
            paddingX={{ base: "1em", md: "5em" }}
            backgroundColor="#f2fffe"
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
                  carHash={data.owner}
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
              totalItems={dummyCarsData.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default CarsForSale;
