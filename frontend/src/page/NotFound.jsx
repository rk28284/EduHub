import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl" mb={4} color="red.500">
        404 Not Found
      </Heading>
      <Text fontSize="lg" mb={4}>
        Oops! It looks like the page you're looking for doesn't exist.
      </Text>
      <Text fontSize="md">
        Please check the URL or go back to the <a href="/">Login page</a>.
      </Text>
    </Box>
  );
};


