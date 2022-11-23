import React from "react";
import { Spacer, HStack, Flex, Box, Heading } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import GoalFormModal from "./GoalFormModal";

const Navbar = () => {
  return (
    <>
      <HStack>
        <Flex>
          <Box p="12">
            <HStack>
              <Heading>Goals</Heading>
              <CalendarIcon color="teal.300" />
            </HStack>
          </Box>
          <Spacer />
          <Box p="12">
            <GoalFormModal />
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default Navbar;
