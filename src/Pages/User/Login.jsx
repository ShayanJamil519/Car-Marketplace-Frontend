import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AuthContext } from "../../utils/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
      minH={"75vh"}
      align={"center"}
      justify={"center"}
      fontFamily={"sans-serif"}
      bg="#f2fffe"
    >
      <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={"5xl"}
            textTransform={"uppercase"}
            fontFamily={"auto"}
            textColor="#0d8775"
            fontWeight="semi-bold"
          >
            Log in
          </Heading>
        </Stack>
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
