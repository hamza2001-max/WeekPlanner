import { Box, Button, Checkbox, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

interface userInterface {
  email: string;
  token: string;
  error: any;
}
interface accountInterface {
  email: string;
  password: string;
}
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [error, setError] = useState(null);
  const { setUser } = useAuthContext();

  const signUpNewAccout = async (newAccount: accountInterface) => {
    const response = await fetch("api/users/signup", {
      method: "POST",
      body: JSON.stringify(newAccount),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json: userInterface = await response.json();
    if (!response.ok) {
      return setError(json.error);
    }
    if (response.ok) {
      setUser(json);
      localStorage.setItem("user", JSON.stringify(json));
      return;
    }
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account = { email, password };
    signUpNewAccout(account);
  };

  return (
    <form onSubmit={submitForm}>
      <Box
        maxWidth={"100vw"}
        height="98vh"
        display={"flex"}
        justifyContent="center"
        alignItems={"center"}
      >
        <Box
          maxWidth={"60vw"}
          padding="1rem 2rem"
          borderRadius="1rem"
          boxShadow="0 0 6px #A0AEC0"
        >
          <Heading mb={"2rem"} maxW="20rem" textAlign="center">
            Signup To A New Account
          </Heading>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            minWidth="18rem"
            mb="2.3rem"
          >
            <Text fontSize={"1.3rem"}>Email</Text>
            <Input
              fontSize={"1.1rem"}
              maxWidth={"17rem"}
              variant={"flushed"}
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            minWidth="18rem"
            mb="2.3rem"
          >
            <Text fontSize={"1.3rem"}>Password</Text>
            <Input
              fontSize={"1.1rem"}
              maxWidth={"17rem"}
              variant={"flushed"}
              value={password}
              type={showPassword ? "password" : "text"}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Checkbox
            fontSize={"1.1rem"}
            mb="0.7rem"
            size={"lg"}
            onChange={() =>
              showPassword ? setShowPassword(false) : setShowPassword(true)
            }
          >
            Show Password
          </Checkbox>
          {error && (
            <Box
              border="1px solid red"
              bg="pink"
              mt="0.3rem"
              mb="0.3rem"
              borderRadius="5px"
              maxWidth="16em"
              padding="12px"
            >
              <Text>{error}</Text>
            </Box>
          )}
          <Box
            display={"flex"}
            justifyContent="space-between"
            flexDirection={"column"}
          >
            <Box fontSize={"1.1rem"} mb="0.8rem">
              <Link to="/login">Already have an account? Login!</Link>
            </Box>
            <Button
              size={"lg"}
              loadingText="Submitting"
              mb="0.8rem"
              bgColor={"#000"}
              color="#fff"
              type="submit"
            >
              Signup
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
