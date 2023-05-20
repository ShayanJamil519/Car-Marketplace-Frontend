import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animation } from "../../utils/animation";
import { toast } from "react-toastify";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleAuthentication = (event) => {
    event.preventDefault();

    // If any field is left it will throw error
    if (!oldPassword || !newPassword) {
      toast.error("Please enter all fields");
      return;
    }

    setTimeout(() => {
      toast.success("Password updated successfully");
      navigate("/");
    }, 2000);
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
          Update Password
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
            <FormControl id="password" isRequired>
              <FormLabel>Old Password</FormLabel>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
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
                Update Password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
