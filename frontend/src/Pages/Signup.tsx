import { Box, Button, Checkbox, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

interface accountInterface {
  email: string;
  password: string;
}
interface userInterface {
  email: string;
  token: string;
}
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuthContext();

  const [showPassword, setShowPassword] = useState(true);

  const signUpNewAccout = async (account: accountInterface) => {
    const response = await fetch("api/users/signup", {
      method: "POST",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account = { email, password };
    const newAccount = signUpNewAccout(account);
    newAccount.then((result: userInterface) => {
      setUser(result);
      localStorage.setItem("user", JSON.stringify(result));
    });
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
          <Heading mb={"2rem"}>Signup To A New Account</Heading>
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
            mb="1.2rem"
            size={"lg"}
            onChange={() =>
              showPassword ? setShowPassword(false) : setShowPassword(true)
            }
          >
            Show Password
          </Checkbox>
          <Box display={"flex"} justifyContent="space-between">
            <Link to="/login">Already have an account? Login!</Link>
            <Button
              // float="right"
              size={"lg"}
              loadingText="Submitting"
              mb="0.8rem"
              bgColor={"#63b3ed"}
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
