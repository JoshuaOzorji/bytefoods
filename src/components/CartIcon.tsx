"use client";
import { useCartStore } from "@/utils/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { BsCart2 } from "react-icons/bs";

const CartIcon = () => {
	const { totalItems } = useCartStore();

	useEffect(() => {
		useCartStore.persist.rehydrate();
	}, []);

	return (
		<div>
			<Link href={"/cart"} className='flex items-center gap-x-1'>
				CART
				<span className='flex items-center relative'>
					<BsCart2 />
					<span className='absolute text-[12px] top-[-14px] right-[-10px] bg-black text-white w-[6px] h-[6px] flex items-center justify-center rounded-full p-3'>
						{totalItems}
					</span>
				</span>
			</Link>
		</div>
	);
};

export default CartIcon;
