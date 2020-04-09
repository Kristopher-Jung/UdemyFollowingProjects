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
			{
				type: "professional",
				id: 3,
				name: "Goddy Perk",
				email: "gperk@gmail.com",
				phone: "111-333-2222",
			},
		],
		current: null,
		filtered: null, // array of filtered contacts
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add Contact
	const addContact = (contact) => {
		contact.id = uuid.toString();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	// Delete Contact
	const deleteContact = (id) => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	// Set Current Contact
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Update Contact
	const updateContact = (contact) => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	// Filter Contacts
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};
export default ContactState;
