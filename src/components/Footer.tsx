import React from "react";

const Footer = () => {
	return (
		<footer className='font-barlow text-xs w-full py-2 px-4 md:px-10 mx-auto mb-2 flex items-center justify-between border-t pt-3 pb-1 text-light-dark '>
			<p>&copy; 2023</p>
			<div className='flex flex-row gap-4'>
				<a
					href='https://www.facebook.com/ozorjijoshua'
					className='underline cursor-pointer'>
					FACEBOOK
				</a>
				<a
					href='https://www.instagram.com/mrjosh_1/'
					className='underline cursor-pointer'>
					INSTAGRAM
				</a>
				<a
					href='https://wa.me/2347038514969'
					className='underline cursor-pointer'>
					WHATSAPP
				</a>
			</div>
		</footer>
	);
};

export default Footer;
