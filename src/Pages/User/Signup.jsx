import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utils/AuthProvider";
import { animation } from "../../utils/animation";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleAuthentication = (event) => {
    if (!email || !password || !username) {
      toast.error("Please enter all fields");
      return;
    }
    event.preventDefault();
    login();
    navigate("/");
  };

  return (
    <Flex
      minH={"100vh"}
      direction="column"
      align={"center"}
      justify={"center"}
      backgroundColor="#fffae5"
    >
      <Stack align={"center"}>
        <Text
          mb={"10px"}
          fontSize={{ base: "3xl", md: "5xl" }}
          textAlign="center"
          textTransform="uppercase"
          textColor="#ff9b2f"
          animation={` ${animation} 0.8s ease-out`}
        >
          Create your account
        </Text>
      </Stack>
      <Stack spacing={8} mx={"auto"} minW={"lg"} py={5} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          border="2px"
          borderColor="gray.200"
        >
          <Stack spacing={4}>
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl
              id="email"
              isRequired
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl
              id="password"
              isRequired
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleAuthentication}
                marginX="auto"
                backgroundColor="black"
                textColor="white"
                width="100%"
                paddingY="1.4em"
                _hover={{
                  backgroundColor: "blackAlpha.800",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/login" fontSize="lg">
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
