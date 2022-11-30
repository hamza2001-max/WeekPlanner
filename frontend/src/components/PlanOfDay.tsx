import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { PlanBox } from "./PlanBox";
import Axios from "axios";
import { useContext } from "react";
// import { planContext } from "../context/PlanContextProvider";

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
  // const usePlanContext = useContext(planContext);
  const { data } = useQuery(["plan"], async () => {
    const response = await Axios.get("/api/plans");
    // usePlanContext.dispatch({
    //   type: "GET_ALL_PLANS",
    //   _id: response.data._id,
    //   payload: {
    //     _id: response.data._id,
    //     title: response.data.title,
    //     dueDate: response.data.dueDate,
    //     description: response.data.description || "",
    //   },
    // });
    return response.data;
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
      {/* {console.log(...usePlanContext.state)} */}
      {/* {...usePlanContext.state} */}

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
