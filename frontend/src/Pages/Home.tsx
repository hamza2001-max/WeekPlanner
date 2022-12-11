import { AddIcon } from "@chakra-ui/icons";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { PlanChart } from "../components/PlanChart";
import { PlanForm } from "../components/PlanForm";

export const Home = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const handleVisibility = () => {
    return !formVisibility ? setFormVisibility(true) : setFormVisibility(false);
  };
  return (
    <Box position="relative">
      {formVisibility && (
        <Box
          position="absolute"
          zIndex="1"
          width="100vw"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backdropFilter="auto"
          backdropBlur="4px"
          onClick={handleVisibility}
          _hover={{ cursor: "pointer" }}
        >
          <PlanForm setFormVisibility={setFormVisibility} />
        </Box>
      )}
      <PlanChart />
      <Box
        display={["flex"]}
        flexDirection={["column", "row"]}
        ml={["0.6rem"]}
        position="fixed"
        bottom="4rem"
        right="3rem"
      >
        <Button
          me="10px"
          bg="#000"
          color="#fff"
          height="6rem"
          width="6rem"
          _hover={{ background: "#000" }}
          _active={{ background: "#4299e1" }}
          minW={["20rem", "5rem", "5rem"]}
          rounded="50%"
          onClick={handleVisibility}
        >
          <AddIcon width={6} height={6} />
        </Button>
      </Box>
    </Box>
  );
};
