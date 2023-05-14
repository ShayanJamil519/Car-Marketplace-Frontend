import {
  Flex,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

export default function AddCar() {
  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      flexDirection={"column"}
      paddingTop={6}
      bg="#f2fffe"
    >
      <Text
        fontSize={{ base: "4xl", md: "5xl" }}
        textColor="#0d8775"
        textAlign="center"
        textTransform="uppercase"
      >
        Add your Car
      </Text>
      <Stack
        spacing={{ base: 1, md: 8 }}
        mx={"auto"}
        minW={{ base: "xs", md: "md" }}
        pt={3}
        pb={10}
        px={{ base: 1, md: 6 }}
      >
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"xl"}
          border="2px"
          borderColor="gray.200"
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter car name"
                //   onChange={(e) =>
                //     setFileInfo({ ...fileInfo, name: e.target.value })
                //   }
              />
            </FormControl>
            <FormControl id="number">
              <FormLabel fontWeight="bold">Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price in ETH"
                //   onChange={(e) =>
                //     setFileInfo({ ...fileInfo, name: e.target.value })
                //   }
              />
            </FormControl>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Enter car description"
                size="md"
                minHeight="10em"
                //   onChange={(e) =>
                //     setFileInfo({ ...fileInfo, description: e.target.value })
                //   }
              />
            </FormControl>
            <FormControl id="file">
              <Input
                type="file"
                p={1}
                mb={2}
                //   onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                marginX="auto"
                backgroundColor="black"
                textColor="white"
                width="100%"
                fontSize="lg"
                paddingY="1.4em"
                _hover={{
                  backgroundColor: "blackAlpha.800",
                }}
                //   onClick={handleFileUpload}
              >
                Add Car
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
