// import React, { createContext, useReducer } from "react";

import React from 'react'

export const PlanContextProvider = () => {
  return (
    <div>PlanContextProvider</div>
  )
}

// const initialState = [
//   {
//     _id: 0,
//     title: "",
//     dueDate: "",
//     description: "",
//   },
// ];

// // interface stateInterfaceWithoutOption {
// //   _id: number;
// //   title: string;
// //   dueDate: string;
// // }

// // interface stateInterfaceWithOption {
// //   // _id: number;
// //   // title: string;
// //   // dueDate: string;
// //   description: string;
// // }

// interface stateInterface {
//   _id: number;
//   title: string;
//   dueDate: string;
//   description: string;
// }
// type stateInterfaceArray = Array<stateInterface>;

// interface actionInterface {
//   _id: number;
//   type: string;
//   payload: stateInterface;
// }

// interface childrenInterface {
//   children: React.ReactNode;
// }
// interface contextInterface {
//   state: stateInterfaceArray;
//   dispatch: React.Dispatch<actionInterface>;
// }

// const initialContextState = {
//   state: [{ _id: 0, title: "", dueDate: "", description: "" }],
//   dispatch: () => {},
// };

// export const planContext = createContext<contextInterface>(initialContextState);

// const planReducer = (state: stateInterfaceArray, action: actionInterface) => {
//   switch (action.type) {
//     case "GET_ALL_PLANS":
//       return {...state}
//     case "CREATE_PLAN":
//       return [
//         ...state,
//         {
//           _id: action._id,
//           title: action.payload.title,
//           dueDate: action.payload.dueDate,
//           description: action.payload.description,
//         },
//       ];
//     case "DELETE_PLAN":
//       return state.filter((individual) => individual._id == action._id);
//     default:
//       return state;
//   }
// };
// export const PlanContextProvider = ({ children }: childrenInterface) => {
//   const [state, dispatch] = useReducer(planReducer, initialState);
//   return (
//     <planContext.Provider value={{ state, dispatch }}>
//       {children}
//     </planContext.Provider>
//   );
// };
