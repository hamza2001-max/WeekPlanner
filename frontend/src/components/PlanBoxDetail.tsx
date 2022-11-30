import { Box, CloseButton, Heading, Text } from "@chakra-ui/react";
import React from "react";

type propType = {
  title: string;
  dueDate: string;
  description?: string;
  setPlanDetailVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlanBoxDetail = (prop: propType) => {
  return (
    <Box
      bg="#fff"
      height="100vh"
      width={["60vw", "50vw", "40vw"]}
      position="fixed"
      borderLeft="2px solid black"
      top="0"
      right="0"
      pl="1rem"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseButton
        onClick={() => prop.setPlanDetailVisibility(false)}
        position="absolute"
        left="0.5rem"
        top="0.8rem"
        size="lg"
      />
      <Box mt="4rem">
        <Box>
          <Heading fontSize={["2rem", "2.5rem", "3.5rem"]}>
            {prop.title}
          </Heading>
        </Box>
        <Box mt="1.5rem">
          <Text
            fontSize={["1.25rem", "1.4rem", "1.6rem"]}
            color="gray"
            fontWeight="semibold"
          >
            Due Date
          </Text>
          <Text fontSize={["1.25rem", "1.4rem", "1.6rem"]}>{prop.dueDate}</Text>
        </Box>
        <Box mt="1.5rem">
          <Text
            fontSize={["1.25rem", "1.4rem", "1.6rem"]}
            color="gray"
            fontWeight="semibold"
          >
            Description
          </Text>
          <Text fontSize={["1.25rem", "1.4rem", "1.6rem"]}>
            {prop.description}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
