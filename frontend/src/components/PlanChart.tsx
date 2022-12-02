import { Box } from "@chakra-ui/react";
import { PlanAndDay } from "./PlanAndDay";
import { v4 as uuidv4 } from "uuid";

export const PlanChart = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Box
      display="flex"
      flexDirection={["column", "column", "row"]}
      justifyContent="space-between"
      px="1rem"
      mr="6rem"
      mt="2rem"
    >
      {weekday.map((day) => {
        return <PlanAndDay key={uuidv4()} day={day} />;
      })}
    </Box>
  );
};
