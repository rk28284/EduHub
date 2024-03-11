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
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AdminLogin = () => {
  const [password, setPassword] = useState("admin");
  const [email, setEmail] = useState("eduhubinstuctor@gmail.com");
  const navigate = useNavigate();
  const toast = useToast();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/admin");
      toast({
        title: "Admin Login Successfully.",
        description: ` Welcome admin`,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } else {
      toast({
        title: "Wrong Credentials.",
        description: `Please register !!!`,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.200"} 
      tex
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color={"teal"} fontSize={"4xl"}>
            Log in to as Admin
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={"gray.50"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl id="email">
                <FormLabel>Admin Email address</FormLabel>
                <Input
                  focusBorderColor="teal"  
                  borderColor={"teal"}
                  type="email"
                  name="email"
                  placeholder="Enter @gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Admin Password</FormLabel>
                <Input
                  focusBorderColor="teal"  
                  borderColor={"teal"}
                  placeholder="Enter pass ***"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"teal"} 
                  color={"white"}
                  _hover={{
                    bg: "teal.600",
                  }}
                >
                  Admin Log in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};
