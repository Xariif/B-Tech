import React, { useReducer, createContext } from "react";
import rootReducer from "../reducer";

export const ReducerContext = createContext();

export const ReducerProvider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, {});

	return (
		<ReducerContext.Provider value={{ state, dispatch }}>
			{children}
		</ReducerContext.Provider>
	);
};
