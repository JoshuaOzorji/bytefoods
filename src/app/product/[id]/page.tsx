import React from "react";
import Image from "next/image";
import Price from "@/components/Price";
import { ProductType } from "../../../../types/types";
import DeleteButton from "@/components/DeleteButton";

const getData = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/products/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Failed to fetch products");
	}

	return res.json();
};

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
	const singleProduct: ProductType = await getData(params.id);
	return (
		<section className='flex flex-col md:flex-row font-barlow w-[80%] mx-auto m-4 min-h-[80vh]'>
			{/* IMAGE CONTAINER */}
			<div className='md:w-1/2 flex justify-center items-center'>
				{singleProduct.img && (
					<div>
						<Image
							src={singleProduct.img}
							alt='product image'
							className='object-contain w-28 h-28 md:w-72 md:h-72'
							width={1000}
							height={1000}
						/>
					</div>
				)}
			</div>

			{/* TEXT CONTAINER */}
			<div className='md:w-1/2 flex flex-col gap-y-4 flex-items-center justify-center text-center my-4'>
				<h1 className='font-chonburi text-2xl md:text-3xl'>
					{singleProduct.title}
				</h1>
				<p className='text-sm-md '>{singleProduct.desc}</p>

				<Price product={singleProduct} />
				<DeleteButton id={singleProduct.id} />
			</div>
		</section>
	);
};

export default SingleProductPage;
