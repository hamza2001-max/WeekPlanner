import {
  Box,
  Button,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export const NavBar = () => {
  const { user, setUser } = useAuthContext();

  return (
    <>
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
          <Link to={"/"}>Timeline</Link>
        </Heading>
        <Box ml="10px">
          <Popover>
            <PopoverTrigger>
              {user ? (
                <Button borderRadius={"50%"} height="4rem" width="4rem" fontSize='1.5rem'>
                  {user?.email[0].toUpperCase()}
                </Button>
              ) : (
                <Button>No User</Button>
              )}
            </PopoverTrigger>
            <PopoverContent
              maxW="100px"
              bg="#fff"
              border="#fff"
              borderRadius="10px"
              boxShadow=" 0 0 10px #CBD5E0"
            >
              {!user ? (
                <>
                  <Button bg="#fff" borderRadius="0">
                    <Link to={"/login"}>Login</Link>
                  </Button>
                  <Button bg="#fff" borderRadius="0">
                    <Link to={"/signup"}>Signup</Link>
                  </Button>
                </>
              ) : (
                <Button
                  bg="#fff"
                  borderRadius="0"
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("user");
                  }}
                >
                  Logout
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </Box>
      </Box>
    </>
  );
};
