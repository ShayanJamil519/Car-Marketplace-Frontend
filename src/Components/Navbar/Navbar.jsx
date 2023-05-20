import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Text,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout } = useContext(AuthContext); // getting loggedin state from auth context

  const handleLogout = () => {
    navigate("/");
    logout();
  };

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
            {!isLoggedIn ? (
              <NavButtons isMobileScreen={false} />
            ) : (
              <>
                <ConnectWallet
                  accentColor="#f213a4"
                  colorMode="dark"
                  width={{ base: "150px", md: "unset" }}
                  style={{
                    background: "black",
                    color: "white",
                    marginRight: "20px",
                  }}
                />

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                    marginLeft={{ base: "0em", md: "0.5em" }}
                  >
                    <Avatar size={"lg"} src={"/profile.png"} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate("/update_profile")}>
                      Profile Settings
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
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
