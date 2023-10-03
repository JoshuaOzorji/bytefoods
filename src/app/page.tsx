import Contact from "@/components/Contact";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import React from "react";

const Home = () => {
	return (
		<div className=''>
			<Hero />
			<div className='md:w-[80%] mx-auto'>
				<HowItWorks />
				<Featured />
				<Contact />
			</div>
		</div>
	);
};

export default Home;
