import { Box, Button, Checkbox, Heading, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface accountInterface {
  email: string;
  password: string;
}
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(true);

  const signUpNewAccout = async(account: accountInterface) => {
    return await axios.post("/api/users/signup", account);
  };
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const account = {email, password};
    signUpNewAccout(account);
  };
  return (
    <form onSubmit={submitForm}>
      <Box
        maxWidth={"100vw"}
        height="88vh"
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
          <Heading mb={"2rem"}>Signup To A New Accout</Heading>
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
            size={"lg"}
            onChange={() =>
              showPassword ? setShowPassword(false) : setShowPassword(true)
            }
          >
            Show Password
          </Checkbox>
          <Button
            float="right"
            size={"lg"}
            loadingText="Submitting"
            mb="0.8rem"
            bgColor={"#63b3ed"}
            color="#fff"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
};
