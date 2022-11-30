import {
  Box,
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState } from "react";
import { CreatePlan } from "./CreatePlan";

export const NavBar = () => {
  const [formVisibility, setFormVisibility] = useState(false);
  const handleVisibility = (e: any) => {
    return !formVisibility ? setFormVisibility(true) : setFormVisibility(false);
  };
  return (
    <>
      {formVisibility && (
        <Box
          position="absolute"
          zIndex="1"
          height="100vh"
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
          <CreatePlan setFormVisibility={setFormVisibility} />
        </Box>
      )}
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        justifyContent={["center", "space-between"]}
        alignItems="center"
        px="1rem"
        py="0.8rem"
        borderBottom="2px solid black"
      >
        <Heading fontSize={["1.5rem", "2.4rem"]} flex="0%">
          Timeline
        </Heading>
        <Box
          display={["flex"]}
          flexDirection={["column", "row"]}
          ml={["0.6rem"]}
        >
          <Box>
            <Button
              me="10px"
              bg="#63b3ed"
              color="#fff"
              _hover={{ background: "#4299e1" }}
              _active={{ background: "#4299e1" }}
              minW={["20rem", "5rem", "5rem"]}
              onClick={handleVisibility}
            >
              Create
            </Button>
          </Box>
        </Box>
        <Box ml="10px">
          <Popover>
            <PopoverTrigger>
              <Button>Temp</Button>
            </PopoverTrigger>
            <PopoverContent
              maxW="100px"
              bg="#fff"
              border="#fff"
              borderRadius="10px"
              boxShadow=" 0 0 10px #CBD5E0"
            >
              <Button bg="#fff" borderRadius="0">
                Login
              </Button>
              <Button bg="#fff" borderRadius="0">
                Signin
              </Button>
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
    </>
  );
};
