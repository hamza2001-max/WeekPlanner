import {
  Box,
  Button,
  CloseButton,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { client } from "../App";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../hooks/useAuthContext";

type createPlanProps = {
  setFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};

interface postInterface {
  _id: string;
  title: string;
  dueDate: string;
  description: string;
}

export const PlanForm = (props: createPlanProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyfield, setEmptyfield] = useState([]);
  const { user } = useAuthContext();

  const postPlan = async (post: postInterface) => {
    const planPost = await axios.post("/api/plans", post, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return planPost;
  };

  const { mutate } = useMutation({
    mutationFn: postPlan,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["plan"] });
    },
  });

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const _id = uuidv4();
    const plan = { _id, title, description, dueDate };
    mutate(plan);
    setError(null);
    setEmptyfield([]);
    setTitle("");
    setDueDate("");
    setDescription("");
    console.log("success");
  };

  return (
    <form onSubmit={formSubmit}>
      <Box
        position="relative"
        padding="2rem 3rem 2rem 3rem"
        borderRadius="1rem"
        boxShadow="0 0 10px #A0AEC0"
        cursor="default"
        bg="#fff"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton
          onClick={() => props.setFormVisibility(false)}
          position="absolute"
          right="0.5rem"
          top="0.8rem"
          size="lg"
        />
        <>
          <FormLabel htmlFor="title">
            <Heading size="md">Title</Heading>
          </FormLabel>
          <Input
            id="title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            style={{
              border: "1px solid black",
            }}
            placeholder="Title"
          />
        </>
        <Box mt="0.7rem">
          <FormLabel htmlFor="dueDate">
            <Heading size="md">Select A Due Date: </Heading>
          </FormLabel>
          <Select
            cursor="pointer"
            id="dueDate"
            placeholder="Select"
            onChange={(e) => setDueDate(e.target.value)}
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
          {dueDate}
        </Box>
        <Box mt="0.7rem">
          <FormLabel htmlFor="description">
            <Heading size="md">Description</Heading>
          </FormLabel>
          <Textarea
            id="description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            style={{
              border: "1px solid black",
              outline: "none",
            }}
            placeholder="Description"
          />
        </Box>
        {error ? (
          <Box
            border="1px solid red"
            bg="pink"
            mt="0.7rem"
            borderRadius="5px"
            maxWidth="16em"
            padding="12px"
          >
            <Text>{error}</Text>
            <Text>{emptyfield}</Text>
          </Box>
        ) : null}
        <Button
          type="submit"
          mt="0.7rem"
          bg="#63b3ed"
          color="#fff"
          _hover={{ background: "#4299e1" }}
          _active={{ background: "#4299e1" }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
