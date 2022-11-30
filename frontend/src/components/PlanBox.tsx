import {
  Box,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  Text,
} from "@chakra-ui/react";
import { AiOutlineMore } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { PlanBoxDetail } from "./PlanBoxDetail";
import { useContext, useState } from "react";


type propType = {
  _id: number;
  title: string;
  dueDate: string;
  description?: string;
};

export const PlanBox = (prop: propType) => {
  const [planDetailVisibility, setPlanDetailVisibility] = useState(false);

  const handlePlanDetailVisibility = () => {
    return !planDetailVisibility
      ? setPlanDetailVisibility(true)
      : setPlanDetailVisibility(false);
  };

  const handleDeleteButton = async () => {    
    const response = await fetch(`/api/plans/${prop._id}`, {
      method: "DELETE",
    });
    const json = response.json();
    return json;
  };

  return (
    <Box
      border="1.5px solid black"
      borderRadius="7px"
      mt="1rem"
      minWidth={["100px", "100px", "100px", "135px", "170px"]}
      maxWidth={["200px", "250px", "0"]}
      whiteSpace="nowrap"
      position="relative"
      padding="5px 5px"
      onClick={handlePlanDetailVisibility}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover>
          <PopoverTrigger>
            <Button
              bg="transparent"
              position="absolute"
              right="-0.7rem"
              top="-0.2rem"
              padding="0"
              _hover={{
                bg: "transparent",
              }}
              _active={{
                bg: "transparent",
              }}
            >
              <Icon as={AiOutlineMore} fontSize="1.2rem" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            maxW="7rem"
            border="#fff"
            borderRadius="10px"
            boxShadow="0 0 5px #A0AEC0"
            mt="-0.7rem"
          >
            <Button
              bg="#fff"
              borderTopRadius="10px"
              borderBottomRadius="0"
              onClick={handleDeleteButton}
            >
              <DeleteIcon />
              <Text>Delete</Text>
            </Button>
            <Button bg="#fff" borderBottomRadius="10px" borderTopRadius="0">
              <EditIcon />
              <Text>Edit</Text>
            </Button>
          </PopoverContent>
        </Popover>
      </Box>

      <Heading
        fontSize={["1rem", "1.5rem", "1.1rem"]}
        fontWeight="semibold"
        maxWidth="140px"
        overflow="hidden"
        textOverflow="ellipsis"
        mt="0.3rem"
      >
        {prop.title}
      </Heading>
      <Heading
        fontSize={["1rem", "1.2rem", "1.1rem"]}
        fontWeight="md"
        mt="0.7rem"
        color="gray"
      >
        {prop.dueDate}
      </Heading>

      {planDetailVisibility && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          zIndex="1"
        >
          <PlanBoxDetail
            setPlanDetailVisibility={setPlanDetailVisibility}
            title={prop.title}
            dueDate={prop.dueDate}
            description={prop.description}
          />
        </Box>
      )}
    </Box>
  );
};
