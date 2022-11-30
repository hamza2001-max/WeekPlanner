import { Box } from "@chakra-ui/react";
import { PlanOfDay } from "./PlanOfDay";

export const PlansDisplay = () => {
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
      mt="2rem"
    >
      {weekday.map((day, index) => {
        return <PlanOfDay key={index} day={day} />;
      })}
    </Box>
  );
};
