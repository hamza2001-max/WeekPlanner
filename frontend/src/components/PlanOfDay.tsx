import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PlanBox } from "./PlanBox";
import Axios from "axios";


type PropsType = {
  day: string;
};

type planBoxType = {
  _id: number;
  title: string;
  dueDate: string;
  description?: string;
};

export const PlanOfDay = (prop: PropsType) => {
  const { data } = useQuery(["plan"], async () => {
    const response = await Axios.get("/api/plans");
    return response.data;
  });

  // const mutation = useMutation({

  // });
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
        return prop.day == plan.dueDate ? (
          <PlanBox
            key={plan._id}
            _id={plan._id}
            title={plan.title}
            dueDate={plan.dueDate}
            description={plan.description}
          />
        ) : null;
      })}
    </Box>
  );
};
