import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilters";

const Home = () => {
	return (
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter></ContactFilter>
				<Contacts></Contacts>
			</div>
		</div>
	);
};

export default Home;
