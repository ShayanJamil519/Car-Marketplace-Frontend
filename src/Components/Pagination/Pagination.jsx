import React from "react";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({
  itemsPerPage,
  totalItems,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box mt="8" textAlign={"center"}>
      <ButtonGroup spacing="2">
        {pageNumbers.map((number) => (
          <Button
            fontSize="lg"
            padding={6}
            key={number}
            bg={currentPage === number ? "black" : "#ff9b2f"}
            color={currentPage === number ? "white" : "white"}
            _hover={{ bg: currentPage === number ? "black" : "#e38a2b" }}
            _active={{ bg: currentPage === number ? "black" : "#e38a2b" }}
            isActive={currentPage === number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
