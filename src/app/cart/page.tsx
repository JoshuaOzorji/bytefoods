"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import React, { useEffect } from "react";
import { BiXCircle } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CartPage = () => {
	const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	const handleCheckout = async () => {
		if (!session) {
			router.push("/");
		} else {
			try {
				const res = await fetch("http://localhost:3000/api/orders", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						price: totalPrice,
						products,
						status: "Not Paid",
						userEmail: session.user.email,
					}),
				});
				const data = await res.json();
				router.push(`/pay/${data.id}`);
			} catch (err) {
				console.log(err);
			}
		}
	};
	return (
		<section className='md:w-[80%] flex flex-col md:flex-row mx-auto font-barlow min-h-[80vh]'>
			<div className='md:w-[70%] border p-2'>
				{/* SINGLE ITEM */}

				{products.map((item) => (
					<div
						className='flex justify-between items-center border p-2 flex-wrap md:flex-nowrap'
						key={item.id}>
						{item.img && (
							<Image
								src='/temporary/p1.png'
								alt='image'
								width={100}
								height={100}
								className='w-12 h-12 md:w-20 md:h-20'
							/>
						)}

						<div className=''>
							<h2 className='text-sm font-chonburi md:text-xl flex-wrap flex'>
								{item.title} x {item.quantity}
							</h2>
							<span className='text-neutral-600 text-sm md:text-lg'>
								{item.optionTitle}
							</span>
						</div>

						<h2 className='button text-sm md:text-lg '>${item.price}</h2>
						<button onClick={() => removeFromCart(item)}>
							<BiXCircle className='text-neutral-600 md:w-6 md:h-6' />
						</button>
					</div>
				))}
			</div>

			{/* PAYMENT CONTAINER */}
			<div className='p-2 md:w-[30%] flex flex-col gap-4 border mx-2 md:mx-0 mt-2 md:mt-0'>
				<div className='flex flex-col gap-4'>
					<div className='flex justify-between'>
						<span className=''>Subtotal ({totalItems})</span>
						<span className=''>${totalPrice}</span>
					</div>
					<div className='flex justify-between'>
						<span className=''>Service Cost</span>
						<span className=''>$0.00</span>
					</div>
					<div className='flex justify-between'>
						<span className=''>Delivery Cost</span>
						<span className='text-green-600'>FREE!</span>
					</div>
					<hr className='my-2' />
					<div className='flex justify-between'>
						<span className=''>TOTAL(INCL. VAT)</span>
						<span className='font-bold'>${totalPrice}</span>
					</div>
				</div>

				<div className='inline-block mx-auto'>
					<button
						className='bg-accent text-gray-100 px-4 py-1 rounded-full text-sm-md inline-block animate'
						onClick={handleCheckout}>
						CHECKOUT
					</button>
				</div>
			</div>
		</section>
	);
};

export default CartPage;
