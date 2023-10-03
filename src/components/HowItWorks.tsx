"use client";
import React from "react";
import { processData } from "../data";

const HowItWorks = () => {
	return (
		<section className='margin font-barlow text-zinc-900'>
			<div className='text-center'>
				<h1 className='font-chonburi text-xl md:text-4xl capitalize'>
					How it works
				</h1>
			</div>
			<ul className='flex flex-col md:flex-row gap-4 p-4'>
				{processData.map((process, index) => (
					<li
						key={index}
						className='flex flex-col flex-1 items-center text-center gap-y-2 bg-pry p-8 md:p-10 border rounded-xl shadow-md'>
						<a className='bg-[#d8f3dc] rounded-full p-3'>
							<span className='text-3xl md:text-5xl'>{process.icon}</span>
						</a>
						<span className='font-chonburi'>{process.title}</span>
						{/* <span>{process.description}</span> */}
					</li>
				))}
			</ul>
		</section>
	);
};

export default HowItWorks;
