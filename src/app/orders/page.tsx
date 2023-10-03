"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { OrderType } from "../../../types/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";

const OrderPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "unauthenticated") {
		router.push("/");
	}

	const { isLoading, error, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () =>
			fetch("http://localhost:3000/api/orders").then((res) => res.json()),
	});

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) => {
			return fetch(`http://localhost:3000/api/orders/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(status),
			});
		},
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
		},
	});

	const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.elements[0] as HTMLInputElement;
		const status = input.value;

		mutation.mutate({ id, status });
		toast.success("The order has been changed");
	};

	if (isLoading || status === "loading") return <Loading />;

	return (
		<main className=' font-barlow '>
			{/* MD SCREEN */}
			<section className='md:block w-[80%] mx-auto min-h-[80vh] my-6'>
				{/* HEADING */}
				<ul className='grid grid-row-5 md:grid-cols-5 text-center font-bold text-xl '>
					<li className='border'>Order ID</li>
					<li className='border'>Date</li>
					<li className='border'>Price</li>
					<li className='border'>Products</li>
					<li className='border'>Status</li>
				</ul>
				{/* BODY */}
				{data.map((item: OrderType) => (
					<ul
						className={`flex flex-col justify-center md:grid  md:grid-cols-5 text-center border my-2 ${
							item.status !== "delivered" && "bg-pry"
						}`}
						key={item.id}>
						<li className='md:border'>{item.id}</li>
						<li className='md:border'>
							{item.createdAt.toString().slice(0, 10)}
						</li>
						<li className='md:border font-semibold'>${item.price}</li>
						<li className='md:border'>{item.products[0].title}</li>
						<span className='md:border'>
							{session?.user.isAdmin ? (
								<form
									className='flex items-center justify- px-2'
									onSubmit={(e) => handleUpdate(e, item.id)}>
									<input
										placeholder={item.status}
										className='p-1 text-center'
									/>
									<button className='mx-auto'>
										<CiEdit />
									</button>
								</form>
							) : (
								<li className=''>{item.status}</li>
							)}
						</span>
					</ul>
				))}
			</section>
		</main>
	);
};

export default OrderPage;
