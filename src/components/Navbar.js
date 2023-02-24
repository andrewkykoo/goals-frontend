import React from 'react';
import { Spacer, HStack, Flex, Box, Heading } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import GoalFormModal from './GoalFormModal';
import Weather from './Weather';

const Navbar = () => {
  return (
    <>
      <HStack>
        <Flex>
          <Box p='12'>
            <HStack marginBottom={3}>
              <Heading>Goals</Heading>
              <CalendarIcon color='teal.300' />
            </HStack>
            <GoalFormModal />
          </Box>
          <Spacer />
          <Box p='12'>
            <HStack>
              <Weather />
            </HStack>
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default Navbar;
