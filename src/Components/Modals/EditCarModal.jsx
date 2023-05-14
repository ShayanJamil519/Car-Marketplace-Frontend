import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";

export default function EditCarModal(props) {
  const { isOpen, onOpen, onClose, carId } = props;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);

  const handleEditCar = async () => {
    // console.log({ name, description, price: ethers.utils.parseEther(price) });

    price = ethers.utils.parseEther(price);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      FileStorageMarketplace.address,
      FileStorageMarketplace.abi,
      signer
    );

    const editCar = await contract.editCarDetails(
      carId,
      name,
      description,
      price
    );

    const receipt = await editCar.wait(); // Wait for the transaction to be mined

    if (receipt.status === 1) {
      // Transaction successful
      toast.success("Car details edited!");
      navigate("/my_collections");
    } else {
      // Transaction failed
      toast.error("Transaction Failed");
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl" // sets the size of the modal
        isCentered // centers the modal on the screen
      >
        <ModalOverlay />
        <ModalContent
          w="80%" // sets the width of the modal content
          maxW="500px" // sets the maximum width of the modal content
          mx="auto" // centers the modal content horizontally
        >
          <ModalHeader textTransform="uppercase">
            Edit your car details
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="text" marginBottom="10px">
              <FormLabel fontWeight="bold">Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter car name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="number" marginBottom="10px">
              <FormLabel fontWeight="bold">Price</FormLabel>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>
            <FormControl id="text">
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Enter car description"
                size="md"
                minHeight="10em"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditCar}>
              Edit Details
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
