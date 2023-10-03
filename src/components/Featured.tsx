import React from "react";
import Image from "next/image";
import { ProductType } from "../../types/types";
import Link from "next/link";

const getData = async () => {
	const res = await fetch("http://localhost:3000/api/products", {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
};
const Featured = async () => {
	const featuredProducts: ProductType[] = await getData();
	return (
		<section className='margin font-barlow text-zinc-900'>
			<div className='text-center mb-6'>
				<h1 className='font-chonburi text-4xl'>Our Special Dishes</h1>
				<p className='text-2xl font-light'>Made with Premium Ingredients</p>
			</div>

			{/* CARD CONTAINER */}
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{featuredProducts.map((item) => (
					<div
						key={item.id}
						className='flex flex-col items-center p-4 gap-y-2 rounded-xl border justify-between shadow-md'>
						{/* IMAGE CONTAINER */}
						{item.img && (
							<div className='relative'>
								<Image
									src={item.img}
									alt=''
									width={100}
									height={100}
									className='w-10 h-10 md:w-20 md:h-20'
								/>
							</div>
						)}

						{/* TEXT CONTAINER */}
						<div className='text-center'>
							<h1 className='font-chonburi'>{item.title}</h1>
							<p className='line-clamp-4'>{item.desc}</p>
						</div>

						<Link href={`/product/${item.id}`} className='button' key={item.id}>
							Add to Cart
						</Link>
					</div>
				))}
			</div>

			{/* MENU LINK */}
			<div className='text-center'>
				<Link
					href='/menu'
					className='cursor-pointer text-base md:text-xl mt-6 border border-accent rounded-lg text-center inline-flex px-2 py-1 text-accent hover:bg-sec transition hover:border-slate-500 hover:shadow-md'>
					View Menu
				</Link>
			</div>
		</section>
	);
};

export default Featured;
