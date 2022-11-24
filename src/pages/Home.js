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
              Connecting to database.. may need to refresh several times
            </Alert>
            <Box mt={5}>
              <Center>
                <span>
                  Press <Kbd>F5</Kbd> or <Kbd>command</Kbd>/<Kbd>control</Kbd> +{" "}
                  <Kbd>r</Kbd> to refresh the page
                </span>
              </Center>
            </Box>
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
