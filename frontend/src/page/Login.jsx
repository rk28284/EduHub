// Login.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
} from '@chakra-ui/react';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('https://eduhubbackend-50ca.onrender.com/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("error");
    }
};


  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
    <h1>Welcome To Eduhub World</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
      <Box mt={4}>
        <Button variant="link">Forgot password?</Button>
        <Link href="/signup" ml={4}>Sign up</Link>
      </Box>
    </Box>
  );
};


