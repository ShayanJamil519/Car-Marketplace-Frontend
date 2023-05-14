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
import { create } from "ipfs-http-client";
import { fromByteArray } from "base64-js";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const projectId = "2NeEZqOeOOi9fQgDL6VoIMwKIZY";
const projectSecret = "b4ae65044a6e29c52c4091bf29a976b2";
const auth =
  "Basic " +
  fromByteArray(new TextEncoder().encode(`${projectId}:${projectSecret}`));

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export default function AddCar() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState();
  const [fileInfo, setFileInfo] = useState({
    name: "",
    description: "",
    link: "",
    price: "",
  });

  const handleFileUpload = async () => {
    try {
      const added = await ipfs.add(selectedFile);
      fileInfo.link = added.path;
      fileInfo.price = ethers.utils.parseEther(fileInfo.price);
      setFileInfo({
        ...fileInfo,
        link: fileInfo.link,
      });
      console.log(`https://gateway.pinata.cloud/ipfs/${fileInfo.link}`);

      console.log("fileInfo: ", fileInfo);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        FileStorageMarketplace.address,
        FileStorageMarketplace.abi,
        signer
      );

      const tx = await contract.uploadCar(
        fileInfo.name,
        fileInfo.description,
        fileInfo.link,
        fileInfo.price
      );
      const receipt = await tx.wait(); // Wait for the transaction to be mined

      if (receipt.status === 1) {
        // Transaction successful
        toast.success("File Uploaded Successfully");
        navigate("/my_collections");
      } else {
        // Transaction failed
        toast.error("File Upload Failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
                onChange={(e) =>
                  setFileInfo({ ...fileInfo, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="text">
              <FormLabel fontWeight="bold">Price</FormLabel>
              <Input
                type="text"
                placeholder="Enter car price"
                onChange={(e) =>
                  setFileInfo({ ...fileInfo, price: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Enter car description"
                size="md"
                minHeight="10em"
                onChange={(e) =>
                  setFileInfo({ ...fileInfo, description: e.target.value })
                }
              />
            </FormControl>

            <FormControl id="file">
              <Input
                type="file"
                p={1}
                mb={2}
                onChange={(e) => setSelectedFile(e.target.files[0])}
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
                onClick={handleFileUpload}
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
