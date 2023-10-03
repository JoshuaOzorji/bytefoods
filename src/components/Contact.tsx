import React from "react";

const Contact = () => {
	return (
		<section className='margin'>
			<div className='bg-img flex md:flex-row flex-col py-10 gap-8 items-center'>
				<div className='md:w-1/2 flex flex-col text-center md:text-start px-10 text-gray-50 outline-4 outline-red-600'>
					<p className='font-bold text-2xl lg:text-5xl mb-2 md:mb-6 font-chonburi text-neutral-100 bg-black/50 p-2'>
						Start feasting with flair!
					</p>
					<p className='text-sm md:text-lg font-barlow text-neutral-100 bg-black/50 p-2'>
						Enjoy subscriber-only discounts, deals, and promotions that are
						simply too delicious to resist
					</p>
				</div>

				<div className='md:w-1/2 w-full px-10 font-barlow'>
					<form
						action='https://formspree.io/f/mdovqzej'
						method='POST'
						className='relative flex flex-col md:flex-row md:gap-x-4 gap-y-4'>
						<input
							type='email'
							className='relative text-center flex-auto lg:w-[28rem] block px-2 py-3 md:py-4 text-sm md:text-base text-gray-700 bg-white bg-clip-padding border mr-0 border-solid border-gray-300 transition ease-in-out focus:text-gray-700 focus:bg-zinc-100 focus:border-accent focus:outline-none rounded-lg duration-300'
							placeholder='youremail@gmail.com'
							name='_replyto'
						/>

						<button
							className='inline-block px-10 py-2  text-neutral-100 font-medium text-base hover:text-neutral-400 hover:bg-black/80 bg-black/50 border focus:outline-none focus:ring-0 transition duration-300 ease-in-out rounded-lg   md:text-base'
							type='submit'>
							<div>Subscribe</div>
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contact;
