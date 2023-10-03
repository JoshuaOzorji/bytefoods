"use client";
import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);
const PayPage = ({ params }: { params: { id: string } }) => {
	const [clientSecret, setClientSecret] = useState("");
	const { id } = params;

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/api/create-intent/${id}`,
					{ method: "POST" },
				);
				const data = await res.json();
				setClientSecret(data.clientSecret);
			} catch (err) {
				console.log(err);
			}
		};
		makeRequest();
	}, [id]);

	const options: StripeElementsOptions = {
		clientSecret,

		appearance: {
			theme: "stripe",
			variables: {
				colorPrimary: "#006400",
				colorBackground: "#f8f9fa",
				colorText: "#30313d",
				colorDanger: "#df1b41",
				// fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
				fontFamily: "Barlow Condensed, Open Sans, Segoe UI, sans-serif",
			},
		},
	};
	return (
		<div className='min-h-[80vh] w-full p-4 md:w-[50%] mx-auto'>
			{clientSecret && (
				<Elements options={options} stripe={stripePromise}>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
};

export default PayPage;
