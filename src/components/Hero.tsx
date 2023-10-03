import Image from "next/image";
import React from "react";
import heroImg from "../../public/hero-img1.jpg";
import Link from "next/link";

const Hero = () => {
	return (
		<section className='flex flex-col md:flex-row border font-barlow h-full p-2 md:p-0'>
			<div className='w-full md:px-10 md:w-[50%] flex flex-col justify-center p-2 md:p-4 gap-4 '>
				{/* TEXT */}
				<span className='flex flex-col gap-y-1 border-l-4 border-l-accent p-4'>
					<p className='font-medium text-5xl md:text-6xl font-chonburi'>
						Order, Enjoy, Repeat!
					</p>
					<p className='font-barlow font-light text-3xl md:text-4xl'>
						Feast With Ease
					</p>
					<p className='text-neutral-700 font-thin text-sm-md'>
						Discover a world of culinary delights at your fingertips with our
						user-friendly food ordering app, where deliciousness meets
						convenience.
					</p>
				</span>
				{/* BUTTON */}
				<span className=''>
					<Link href='/menu' className='button1'>
						View Menu
					</Link>
				</span>
			</div>

			<div className='hidden md:flex md:w-[50%]'>
				<Image src={heroImg} alt='hero image md:order-last' />
			</div>
		</section>
	);
};

export default Hero;
