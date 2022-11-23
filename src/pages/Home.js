import React, { useEffect } from "react";
import Goal from "../components/Goal";
import { useGoalsContext } from "../hooks/useGoalsContext";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const { goals, dispatch } = useGoalsContext();

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("/api/goals");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GOALS", payload: json });
      }
    };
    fetchGoals();
  }, [dispatch]);
  return (
    <Box>
      {goals && goals.map((goal) => <Goal goal={goal} key={goal._id} />)}
    </Box>
  );
};

export default Home;
