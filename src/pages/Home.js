import React, { useEffect } from "react";
import Goal from "../components/Goal";
import { useGoalsContext } from "../hooks/useGoalsContext";
import { Box, Spinner, Kbd, Center, Alert, AlertIcon } from "@chakra-ui/react";

const Home = () => {
  const { goals, dispatch } = useGoalsContext();

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch(
        "https://goals-api-seuh.onrender.com/api/goals"
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOALS", payload: json });
      }
    };
    fetchGoals();
  }, [dispatch]);
  return (
    <Box>
      {goals ? (
        goals.map((goal) => <Goal goal={goal} key={goal._id} />)
      ) : (
        <>
          <Box>
            <Alert status="warning">
              <AlertIcon />
              Connecting to database...it may take up to 20 seconds
            </Alert>
          </Box>
          <Box mt={5}>
            <Center>
              <Spinner />
            </Center>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
