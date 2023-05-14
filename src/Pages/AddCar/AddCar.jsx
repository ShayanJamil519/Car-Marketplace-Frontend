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
import { animation } from "../../utils/animation";

export default function AddCar() {
  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      flexDirection={"column"}
      paddingTop={6}
      backgroundColor="#fffae5"
    >
      <Text
        mb={"10px"}
        fontSize={{ base: "3xl", md: "5xl" }}
        textAlign="center"
        textTransform="uppercase"
        textColor="#ff9b2f"
        animation={` ${animation} 0.8s ease-out`}
      >
        Add your car
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
