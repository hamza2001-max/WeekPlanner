import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PlanBox } from "./PlanBox";
import { v4 as uuidv4 } from "uuid";
// import Axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

type PropsType = {
  day: string;
};

type planBoxType = {
  _id: number;
  title: string;
  dueDate: string;
  description?: string;
};

export const PlanAndDay = (prop: PropsType) => {
  const { user } = useAuthContext();
  const { data } = useQuery(["plan"], async () => {
    const response = await axios.get("/api/plans", {
      headers: {
        'Authorization': `Bearer ${user?.token}`,
      },
    });
    if (user) {
      return response.data;
    }
  });

  return (
    <Box mb={["4rem", "2rem", "0"]}>
      <Heading
        fontSize={["1rem", "1.5rem", "1.1rem"]}
        color="gray"
        fontWeight="medium"
      >
        {prop.day}
      </Heading>
      {data?.map((plan: planBoxType) => {
        return prop.day === plan.dueDate ? (
          <Box pb="6rem" key={uuidv4()}>
            <PlanBox
              key={uuidv4()}
              _id={plan._id}
              title={plan.title}
              dueDate={plan.dueDate}
              description={plan.description}
            />
          </Box>
        ) : null;
      })}
    </Box>
  );
};
