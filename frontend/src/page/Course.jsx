import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  AlertDialog,
} from '@chakra-ui/react';
import axios from 'axios';

export const Course = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [isvisible, setVisibility] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { name, description, startDate, endDate } = formData;

      if (!name || !description || !startDate || !endDate) {
        setVisibility(true);
        return;
      }

      const token = JSON.parse(localStorage.getItem('token-user-eduhub')).token;
      if (!token) {
        setVisibility(true);
        return;
      }

      const data = await axios.post(
        'https://eduhubbackend-50ca.onrender.com/api/courses',
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.log(error);
      setVisibility(true);
    }
  }

  function handleInput(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
    <h1>Welcome To Admin Course Update Page</h1>
      <FormControl>
        <FormLabel>Course Name</FormLabel>
        <Input
          type="text"
          name="name"
          onChange={handleInput}
          value={formData.name}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Course Description</FormLabel>
        <Textarea
          name="description"
          onChange={handleInput}
          value={formData.description}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Start Date</FormLabel>
        <Input
          type="date"
          name="startDate"
          onChange={handleInput}
          value={formData.startDate}
        />
      </FormControl>
      <FormControl>
        <FormLabel>End Date</FormLabel>
        <Input
          type="date"
          name="endDate"
          onChange={handleInput}
          value={formData.endDate}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>

      <AlertDialog isOpen={isvisible} onClose={() => setVisibility(false)}>
        {/* Your AlertDialog content here */}
      </AlertDialog>
    </>
  );
};


