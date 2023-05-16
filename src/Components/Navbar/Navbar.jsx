import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";
import { AuthContext } from "../../utils/AuthProvider";
import { useContext } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

// Links array
const Links = [
  {
    linkText: "Cars For Sale",
    linkUrl: "/cars_for_sale",
  },
  {
    linkText: "Add Car",
    linkUrl: "/add_car",
  },
  {
    linkText: "Sold Cars",
    linkUrl: "/sold_cars",
  },
  {
    linkText: "My Collections",
    linkUrl: "/my_collections",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout } = useContext(AuthContext); // getting loggedin state from auth context

  return (
    <>
      <Box bg="#fffaf4" px={{ base: "0.5em", md: "5em" }} boxShadow="sm">
        <Flex
          h={20}
          alignItems={"center"}
          justifyContent={"space-between"}
          fontSize={"lg"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={{ base: 1, md: 8 }} alignItems={"center"}>
            <Box
              fontWeight="bold"
              fontSize={{ base: "lg", md: "lg" }}
              marginRight={{ base: "0em", md: "2em" }}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Link to="/" textColor="#ff9b2f">
                <Image
                  objectFit="contain"
                  alt={"Logo"}
                  align={"center"}
                  w={"80px"}
                  h={"50px"}
                  src={"/navbar__logo.png"}
                />{" "}
              </Link>
              <Link to={"/"}>
                <Text fontFamily="cursive"> Car Marketplace</Text>
              </Link>
            </Box>

            {isLoggedIn && (
              <HStack
                as={"nav"}
                spacing={8}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((data) => (
                  <NavLink key={data.linkUrl} data={data} />
                ))}
              </HStack>
            )}
          </HStack>
          <Flex alignItems={"center"}>
            <NavButtons
              isMobileScreen={false}
              isLoggedIn={isLoggedIn}
              logout={logout}
            />
            {isLoggedIn && (
              <ConnectWallet
                accentColor="#f213a4"
                colorMode="dark"
                width={{ base: "150px", md: "unset" }}
                style={{
                  background: "black",
                  color: "white",
                  marginLeft: "20px",
                }}
              />
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((data) => (
                <NavLink key={data.linkUrl} data={data} />
              ))}

              <NavButtons isMobileScreen={true} />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
