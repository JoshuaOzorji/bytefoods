"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPage = () => {
	const searchParams = useSearchParams();
	const payment_intent = searchParams.get("payment_intent");
	const router = useRouter();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
					method: "PUT",
				});
				setTimeout(() => {
					router.push("/orders");
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		};
		makeRequest();
	}, [payment_intent, router]);

	return (
		<div className='flex justify-center items-center min-h-[80vh] w-full md:w-[50%] mx-auto my-auto p-4 font-barlow text-lg text-center'>
			<p>
				<span className='text-green-600'>Payment successful!</span>
				<br /> You are being redirected to the orders page. <br /> Please do not
				close the page
			</p>
		</div>
	);
};

export default SuccessPage;
