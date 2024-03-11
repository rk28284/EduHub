
import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

export const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollno: '',
    email: '',
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
        const response = await fetch('https://eduhubbackend-50ca.onrender.com/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Some thing wend wrong');
        }

        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error("Error");
    }
};

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth="1px" borderRadius="lg">
          <h1>Welcome To Eduhub World</h1>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="rollno">
            <FormLabel>Roll No</FormLabel>
            <Input
              type="text"
              name="rollno"
              value={formData.rollno}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
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
    </Box>
  );
};

