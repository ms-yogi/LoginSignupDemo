import React, { useState, createContext } from 'react';

export const AppStateContext = createContext([{}, () => {}]);

const AppStateProvider = (props) => {
	// default value
	let stateObject = {
		email: '',
	};

	const [state, setState] = useState(stateObject);

	return (
		<AppStateContext.Provider value={[state, setState]}>
			{props.children}
		</AppStateContext.Provider>
	);
};

export { AppStateProvider };
