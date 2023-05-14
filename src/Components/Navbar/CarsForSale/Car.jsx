import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Heading,
  Button,
  CardBody,
  Link,
  Text,
  CardFooter,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import DeleteCarModal from "../../Modals/DeleteCarModal";
import EditCarModal from "../../Modals/EditCarModal";
import { ethers } from "ethers";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../../CarMarketplace.json";
import { useNavigate } from "react-router-dom";

const Car = (props) => {
  const navigate = useNavigate();
  const [editCarId, setEditCarId] = useState(null);
  const [deleteCarId, setDeleteCarId] = useState(null);

  const {
    isOpen: isEditCarModalOpen,
    onOpen: onEditCarModalOpen,
    onClose: onEditCarModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteCarModalOpen,
    onOpen: onDeleteCarModalOpen,
    onClose: onDeleteCarModalClose,
  } = useDisclosure();

  const handleEditClick = (carId) => {
    setEditCarId(carId);
    onEditCarModalOpen();
    console.log("carId: ", Number(carId));
  };

  const handleDeleteClick = (carId) => {
    setDeleteCarId(carId);
    onDeleteCarModalOpen();
  };

  const handleBuy = async (carId, carPrice) => {
    console.log("carId: ", Number(carId));
    console.log("carPrice: ", Number(carPrice));
    let price = ethers.utils.formatEther(carPrice).toString();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      FileStorageMarketplace.address,
      FileStorageMarketplace.abi,
      signer
    );

    carPrice = ethers.utils.parseEther(price);
    const walletAddress = await signer.getAddress();

    const tx = await contract.buyCar(carId, {
      from: walletAddress,
      value: carPrice._hex,
    });

    const receipt = await tx.wait();
    if (receipt.status === 1) {
      // Transaction successful
      toast.success("Car details edited!");
      navigate("/my_collections");
    } else {
      // Transaction failed
      toast.error("Transaction Failed");
    }
  };

  const {
    onOpen,
    carId,
    carName,
    carDescription,
    carOwner,
    carHash,
    carPrice,
  } = props;

  return (
    <Card>
      <Image
        src="./hero.jpg"
        alt="image"
        roundedTop="lg"
        minHeight="200px"
        objectFit="contain"
      />
      <CardHeader
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="-1.5em"
      >
        <Heading size="md"> Car id # {Number(carId)}</Heading>
      </CardHeader>
      <CardBody paddingBottom="0">
        <Text textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="sm" display="inline">
            {" "}
            Name:{" "}
          </Text>
          {carName}
        </Text>
        <Text
          textAlign="left"
          marginBottom="0.5em"
          overflowY={"auto"}
          height={"120px"}
        >
          <Text fontWeight="bold" fontSize="sm" display="inline">
            {" "}
            Description:{" "}
          </Text>
          {carDescription}
        </Text>

        <Text textAlign="left" marginBottom="0.5em">
          <Text fontWeight="bold" fontSize="sm" display="inline">
            {" "}
            Owner:{" "}
          </Text>
          {/* {carOwner === account
              ? "YOU"
              : `${carOwner.slice(0, 16)}....${carOwner.slice(-4)}`} */}
          {carOwner.slice(0, 16)}....${carOwner.slice(-4)}
        </Text>

        <Text
          fontWeight="bold"
          fontSize="sm"
          textAlign="left"
          marginBottom="0.5em"
        >
          {" "}
          View:{" "}
          <Link
            fontWeight="light"
            fontSize="sm"
            href={`https://gateway.pinata.cloud/ipfs/${carHash}`}
            isExternal
          >
            {carHash.slice(0, 15) + "..." + carHash.slice(-5)}{" "}
            <ExternalLinkIcon mx="2px" />
          </Link>
        </Text>
        <Text textAlign="left">
          <Text fontWeight="bold" fontSize="sm" display="inline">
            {" "}
            Price:{" "}
          </Text>
          {ethers.utils.formatEther(carPrice)} ETH
        </Text>
      </CardBody>
      <CardFooter display={"flex"} flexDirection={"column"} gap={"10px"}>
        <Button
          marginX="auto"
          backgroundColor="black"
          textColor="white"
          width="100%"
          paddingY="1.4em"
          _hover={{
            backgroundColor: "blackAlpha.800",
          }}
          onClick={() => handleBuy(carId, carPrice)}
        >
          Buy Car
        </Button>
        <Button
          onClick={() => handleEditClick(carId)}
          colorScheme="teal"
          backgroundColor="#2f79c5"
          size="md"
          width="100%"
          marginRight={"40px"}
          _hover={{
            backgroundColor: "#267ed9",
          }}
        >
          Edit
        </Button>

        <Button
          onClick={() => handleDeleteClick(carId)}
          colorScheme="red"
          width="100%"
          size="md"
          _hover={{
            backgroundColor: "red.400",
          }}
        >
          Remove
        </Button>
      </CardFooter>
      {/* Edit Card Modal */}
      {editCarId && (
        <EditCarModal
          isOpen={isEditCarModalOpen}
          onOpen={onEditCarModalOpen}
          onClose={onEditCarModalClose}
          carId={editCarId}
        />
      )}

      {/* Delete Card Modal */}
      {deleteCarId && (
        <DeleteCarModal
          isOpen={isDeleteCarModalOpen}
          onOpen={onDeleteCarModalOpen}
          onClose={onDeleteCarModalClose}
          carId={deleteCarId}
        />
      )}
    </Card>
  );
};

export default Car;
