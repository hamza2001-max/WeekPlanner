import {
  Box,
  Button,
  CloseButton,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { client } from "../App";

type EditFormProps = {
  setEditFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  _id: number;
};

export const EditForm = (props: EditFormProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const postEditing = async () => {
    const plan = { newTitle, newDueDate, newDescription };
    const edit = await axios.put(`/api/plans/${props._id}`, plan);
    return edit;
  };

  const { mutate } = useMutation({
    mutationFn: postEditing,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["plan"] });
    },
  });

  const handleEdit = () => {
    return mutate();
  };

  return (
    <Box
      bg="white"
      border="1.5px solid black"
      padding="10px 10px"
      borderRadius="7px"
    >
      <CloseButton
        onClick={() => props.setEditFormVisibility(false)}
        position="absolute"
        right="1.7rem"
        top="0.2rem"
        size="md"
      />
      <Text>Enter new Title</Text>
      <Input
        value={newTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewTitle(e.target.value);
        }}
      />
      <Text>Enter new Duedate</Text>
      <Select
        cursor="pointer"
        id="dueDate"
        placeholder="Select"
        onChange={(e) => setNewDueDate(e.target.value)}
      >
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </Select>
      <Text>Enter new Discription</Text>
      <Input
        value={newDescription}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNewDescription(e.target.value);
        }}
      />
      <Button onClick={handleEdit}>Submit</Button>
    </Box>
  );
};
