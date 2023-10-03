// import { menu } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MenuType } from "../../../types/types";

export const getCatData = async () => {
	const res = await fetch("http://localhost:3000/api/categories", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch categories");
	}

	return res.json();
};

const MenuPage = async () => {
	const menu: MenuType = await getCatData();
	return (
		<section className='my-4 font-barlow md:w-[80%] mx-auto min-h-[80vh]'>
			<div className='text-center mb-6'>
				<h1 className='font-chonburi text-2xl md:text-4xl'>Menu</h1>
			</div>
			<div className='flex flex-col md:flex-row gap-4 p-4  justify-between'>
				{menu.map((category) => (
					<Link
						href={`/menu/${category.slug}`}
						key={category.id}
						className='border-b rounded-lg shadow-xl animate'>
						{category.img && (
							<Image
								src={category.img}
								alt='category image'
								width={1000}
								height={1000}
							/>
						)}

						<div className='p-4 flex flex-col justify-center w-full gap-4 my-auto group text-center'>
							<h1 className='font-chonburi text-sm-md'>{category.title}</h1>
							<p className='text-sm-md line-clamp-2  hover:flex'>
								{category.desc}
							</p>
							<div className='text-center'>
								<button className='button inline-flex py-2'>Explore</button>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default MenuPage;
