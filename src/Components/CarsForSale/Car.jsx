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
import RemoveCarModal from "../Modals/RemoveCarModal";
import EditCarModal from "../Modals/EditCarModal";
import { ethers } from "ethers";

import { toast } from "react-toastify";
import FileStorageMarketplace from "../../CarMarketplace.json";
import { useNavigate } from "react-router-dom";
import { useAddress } from "@thirdweb-dev/react";

const Car = (props) => {
  const navigate = useNavigate();
  const account = useAddress(); // getting connect account address
  const [editCarId, setEditCarId] = useState(null); // edit car modal id state
  const [removeCarId, setRemoveCarId] = useState(null); // Remove car modal id state

  const {
    isOpen: isEditCarModalOpen,
    onOpen: onEditCarModalOpen,
    onClose: onEditCarModalClose,
  } = useDisclosure();
  const {
    isOpen: isRemoveCarModalOpen,
    onOpen: onRemoveCarModalOpen,
    onClose: onRemoveCarModalClose,
  } = useDisclosure();

  // Opens Edit Car Modal
  const handleEditClick = (carId) => {
    setEditCarId(carId);
    onEditCarModalOpen();
  };

  // Opens Remove Car Modal
  const handleRemoveClick = (carId) => {
    setRemoveCarId(carId);
    onRemoveCarModalOpen();
  };

  const handleBuy = async (carId, carPrice) => {
    // If you are the car owner then you can't buy your own file
    if (carOwner === account) {
      toast.error("You can't buy your own file");
      return;
    }

    // Formatting ether price
    let price = ethers.utils.formatEther(carPrice).toString();

    // Connecting to Blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      FileStorageMarketplace.address,
      FileStorageMarketplace.abi,
      signer
    );

    carPrice = ethers.utils.parseEther(price);
    const walletAddress = await signer.getAddress();

    // Calling Smart Contrat Function
    const tx = await contract.buyCar(carId, {
      from: walletAddress,
      value: carPrice._hex,
    });

    const receipt = await tx.wait();
    if (receipt.status === 1) {
      toast.success("Car details edited!");
      navigate("/my_collections");
    } else {
      toast.error("Transaction Failed");
    }
  };

  const { carId, carName, carDescription, carOwner, carHash, carPrice } = props;

  return (
    <Card>
      <Image
        src={`https://gateway.pinata.cloud/ipfs/${carHash}`}
        alt="image"
        width={"100%"}
        roundedTop="lg"
        maxHeight="150px"
        objectFit="cover"
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
          {carOwner === account
            ? "YOU"
            : `${carOwner.slice(0, 20)}....${carOwner.slice(-10)}`}
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
            {carHash.slice(0, 25) + "..." + carHash.slice(-10)}{" "}
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

        {carOwner === account && (
          <>
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
              onClick={() => handleRemoveClick(carId)}
              colorScheme="red"
              width="100%"
              size="md"
              _hover={{
                backgroundColor: "red.400",
              }}
            >
              Remove
            </Button>
          </>
        )}
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

      {/* Remove Card Modal */}
      {removeCarId && (
        <RemoveCarModal
          isOpen={isRemoveCarModalOpen}
          onOpen={onRemoveCarModalOpen}
          onClose={onRemoveCarModalClose}
          carId={removeCarId}
        />
      )}
    </Card>
  );
};

export default Car;
