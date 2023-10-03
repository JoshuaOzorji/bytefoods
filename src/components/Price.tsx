"use client";
import React, { useState, useEffect } from "react";
import { ProductType } from "../../types/types";
import { useCartStore } from "@/utils/store";
import { toast } from "react-toastify";

const Price = ({ product }: { product: ProductType }) => {
	const [total, setTotal] = useState(product.price);
	const [quantity, setQuantity] = useState(1);
	const [selected, setSelected] = useState(0);

	const { addToCart } = useCartStore();

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	useEffect(() => {
		if (product.options?.length) {
			setTotal(
				quantity * product.price + product.options[selected].additionalPrice,
			);
		}
	}, [quantity, selected, product]);

	const handleCart = () => {
		addToCart({
			id: product.id,
			title: product.title,
			img: product.img,
			price: total,
			...(product.options?.length && {
				optionTitle: product.options[selected].title,
			}),
			quantity: quantity,
		});
		toast.success("Product added to cart");
	};

	return (
		<section className='font-barlow'>
			{/* OPTIONS CONTAINER */}
			<div className='flex gap-4 justify-center'>
				{product.options?.length &&
					product.options?.map((option, index) => (
						<button
							key={option.title}
							className='px-2 py-[4px] text-sm-md transition-all duration-300 rounded-lg'
							style={{
								background: selected === index ? "#006400" : "white",
								color: selected === index ? "white" : "black",
							}}
							onClick={() => setSelected(index)}>
							{option.title}
						</button>
					))}
			</div>

			<h2 className='text-2xl font-bold text-center mt-4'>${total}</h2>

			{/* QUANTITY AND ADD BUTTON CONTAINER */}
			<div className='flex flex-wrap flex-col md:flex-row justify-between items-center my-4 border border-sec'>
				{/* QUANTITY */}
				<div className='flex justify-between w-full p-4  ring-sec md:w-[70%] gap-y-4'>
					<span>Quantity</span>
					<div className='flex gap-4 items-center'>
						<button
							onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}>
							{"<"}
						</button>

						<span>{quantity}</span>

						<button
							onClick={() =>
								setQuantity((prev) => (prev < 12 ? prev + 1 : 12))
							}>
							{">"}
						</button>
					</div>
				</div>

				{/* CART BUTTON */}
				<button
					className='w-full md:w-[30%] bg-accent text-neutral-100 text-sm-md p-4'
					onClick={handleCart}>
					Add to Cart
				</button>
			</div>
		</section>
	);
};

export default Price;
