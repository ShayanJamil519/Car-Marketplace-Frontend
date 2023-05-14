import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { AuthContext } from "../../utils/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { animation } from "../../utils/animation";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleAuthentication = (event) => {
    event.preventDefault();
    login();
    navigate("/");
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      direction="column"
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
          Login to your account
        </Text>
      </Stack>
      <Stack spacing={8} mx={"auto"} minW={"lg"} py={5} px={6}>
        <Box
          rounded={"lg"}
          boxShadow={"lg"}
          p={8}
          border="2px"
          borderColor="gray.200"
          bg="white"
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"start"}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
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
                Log in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
