import React from "react";
import { useGoalsContext } from "../hooks/useGoalsContext";
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  Heading,
  Text,
  Box,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

const Goal = ({ goal }) => {
  const { dispatch } = useGoalsContext();

  const handleClick = async () => {
    const response = await fetch(
      "https://goals-api-seuh.onrender.com/api/goals/" + goal._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GOAL", payload: json });
    }
  };
  return (
    <Card mb={10}>
      <CardHeader>
        <HStack>
          <Heading size="md">{goal.subject.toUpperCase()}</Heading>
          <CloseButton size="sm" onClick={handleClick} />
        </HStack>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Summary
            </Heading>
            <Text pt="2" fontSize="sm">
              {goal.description}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Deadline
            </Heading>
            <Text pt="2" fontSize="sm">
              {new Date(goal.deadline).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Goal;
