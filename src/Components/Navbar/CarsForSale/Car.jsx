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
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";

const Car = (props) => {
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
        <Heading size="md"> Car id # {carId}</Heading>
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
          {carPrice} ETH
        </Text>
      </CardBody>
      <CardFooter>
        <Button
          marginX="auto"
          backgroundColor="black"
          textColor="white"
          width="100%"
          paddingY="1.4em"
          _hover={{
            backgroundColor: "blackAlpha.800",
          }}
          // onClick={() => handleBuy(carId, carPrice)}
        >
          Buy Car
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Car;
