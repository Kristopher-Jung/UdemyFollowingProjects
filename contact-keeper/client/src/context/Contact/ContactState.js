import React, { useReducer } from "react";
import uuid from "uuid/v4";
import ContactContext from "./ContactContext";
import contactReducer from "./ContactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				type: "personal",
				id: 1,
				name: "Ted Johnson",
				email: "ted@gmail.com",
				phone: "222-222-2222",
			},
			{
				type: "professional",
				id: 2,
				name: "Sara Smith",
				email: "ssmith@gmail.com",
				phone: "111-111-1111",
			},
		],
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add Contact
	const addContact = (contact) => {
		contact.id = uuid.toString();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete Contact

	// Set Contact

	// Clear Current Contact

	// Update Contact

	// Filter Contacts

	// Clear Filter

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				addContact,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};
export default ContactState;
