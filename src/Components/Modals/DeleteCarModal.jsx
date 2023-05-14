import React from "react";
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";

export default function DeleteCarModal(props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose, carId } = props;
  const cancelRef = React.useRef();

  const handleCarRemove = async () => {
    // console.log({ name, description, price: ethers.utils.parseEther(price) });

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      FileStorageMarketplace.address,
      FileStorageMarketplace.abi,
      signer
    );

    const removeCar = await contract.removeCarFromSale(carId);

    const receipt = await removeCar.wait(); // Wait for the transaction to be mined

    if (receipt.status === 1) {
      // Transaction successful
      toast.success("Car removed from market successfully!");
      navigate("/my_collections");
    } else {
      // Transaction failed
      toast.error("Transaction Failed");
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Car From Market?
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {/* <Button colorScheme="red" onClick={handleFileDelete} ml={3}> */}
              <Button colorScheme="red" ml={3} onClick={handleCarRemove}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
