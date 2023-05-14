import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import NavButtons from "./NavButtons";
import { AuthContext } from "../../utils/AuthProvider";
import { useContext } from "react";

const Links = [
  {
    linkText: "Cars For File",
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
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <Box bg="#fdfdfd" px={{ base: "0.5em", md: "5em" }} boxShadow="sm">
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
              fontSize={{ base: "lg", md: "3xl" }}
              marginRight={{ base: "0em", md: "1em" }}
            >
              <Link to="/">Car Marketplace </Link>
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