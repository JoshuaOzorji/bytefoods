import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ProductType } from "../../../../types/types";

type Props = {
	params: { category: string };
};

export const getData = async (category: string) => {
	const res = await fetch(
		`http://localhost:3000/api/products?cat=${category}`,
		{
			cache: "no-store",
		},
	);

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
};

const CategoryPage = async ({ params }: Props) => {
	const products: ProductType[] = await getData(params.category);

	return (
		<section className='my-6 md:my-10 font-barlow text-zinc-800 w-[80%] mx-auto min-h-[80vh]'>
			<div className='text-center mb-6'>
				<h1 className='font-chonburi text-2xl md:text-4xl capitalize'>
					{params.category}
				</h1>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				{products.map((item) => (
					<Link href={`/product/${item.id}`} className='' key={item.id}>
						<div
							key={item.id}
							className='flex flex-col items-center p-4 gap-y-2 rounded-xl border justify-between'>
							{/* IMAGE CONTAINER */}
							{item.img && (
								<div className='relative'>
									<Image
										src={item.img}
										alt=''
										width={100}
										height={100}
										className='w-14 h-14 md:w-20 md:h-20'
									/>
								</div>
							)}

							{/* TEXT CONTAINER */}
							<div className='text-center'>
								<h1 className='font-bold text-sm-md'>{item.title}</h1>
								<p className='font-medium text-lg md:text-xl'>${item.price}</p>
							</div>

							<button className='button'>Add to Cart</button>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default CategoryPage;
