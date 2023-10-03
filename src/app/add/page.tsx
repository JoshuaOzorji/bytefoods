"use client";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type Inputs = {
	title: string;
	desc: string;
	price: number;
	catSlug: string;
};

type Option = {
	title: string;
	additionalPrice: number;
};

const AddPage = () => {
	const { data: session, status } = useSession();

	const [inputs, setInputs] = useState<Inputs>({
		title: "",
		desc: "",
		price: 0,
		catSlug: "",
	});

	const [option, setOption] = useState<Option>({
		title: "",
		additionalPrice: 0,
	});

	const [options, setOptions] = useState<Option[]>([]);
	const [file, setFile] = useState<File>();

	const router = useRouter();

	if (status === "loading") {
		return <Loading />;
	}

	if (status === "unauthenticated" || !session?.user.isAdmin) {
		router.push("/");
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInputs((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOption((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target as HTMLInputElement;
		const item = (target.files as FileList)[0];
		setFile(item);
	};

	// const upload = async () => {
	// 	const data = new FormData();
	// 	data.append("file", file!);
	// 	data.append("upload_preset", "restaurant");

	// 	const res = await fetch(
	// 		"https://api.cloudinary.com/v1_1/ozorjijoshua/image",
	// 		{
	// 			mode: "no-cors",
	// 			method: "POST",
	// 			headers: { "Content-Type": "multipart/form-data" },
	// 			body: data,
	// 		},
	// 	);

	// 	const resData = await res.json();
	// 	console.log(resData);
	// 	return resData.url;
	// };

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// const url = await upload();
			const res = await fetch("http://localhost:3000/api/products", {
				method: "POST",
				body: JSON.stringify({ ...inputs, options }),
				// body: JSON.stringify({ img: url, ...inputs, options }),
			});

			const data = await res.json();

			router.push(`/product/${data.id}`);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<section className='font-barlow p-4 w-full md:w-[50%] mx-auto items-center justify-center min-h-[80vh]'>
			<form
				className='border rounded-lg p-4 flex flex-col gap-4'
				onSubmit={handleSubmit}>
				<h1 className='font-chonburi text-2xl md:text-4xl text-center'>
					Add New Product
				</h1>

				{/* IMAGE */}
				<div className='flex flex-col'>
					<label htmlFor='file'>Upload image</label>
					<input
						className='border outline-none py-1 px-3'
						type='file'
						onChange={handleChangeImg}
						id='file'
					/>
				</div>

				{/* TITLE */}
				<div className='flex flex-col'>
					<label>Title</label>
					<input
						className='border outline-none py-1 px-3'
						type='title'
						name='title'
						placeholder='Bella Napoli'
						onChange={handleChange}
					/>
				</div>

				{/* DESCRIPTION */}
				<div className='flex flex-col'>
					<label>Description</label>
					<textarea
						className='border outline-none py-1 px-3'
						placeholder='A timeless favorite with a twist, showcasing a thin crust topped with sweet tomatoes, fresh basil and creamy mozzarella.'
						name='desc'
						rows={4}
						onChange={handleChange}
					/>
				</div>

				{/* PRICE */}
				<div className='flex flex-col'>
					<label>Price</label>
					<input
						className='border outline-none py-1 px-3'
						placeholder='29'
						type='number'
						name='price'
						onChange={handleChange}
					/>
				</div>

				{/* CATEGORY */}
				<div className='flex flex-col'>
					<label>Category</label>
					<input
						className='border outline-none py-1 px-3'
						placeholder='pizzas'
						type='text'
						name='catSlug'
						onChange={handleChange}
					/>
				</div>

				{/* OPTIONS */}
				<div className='flex-col block'>
					<label>Options</label>
					<div className='flex flex-col gap-4'>
						<input
							className='border outline-none py-1 px-3'
							type='text'
							placeholder='Title'
							name='title'
							onChange={changeOption}
						/>
						<input
							className='border outline-none py-1 px-3'
							type='number'
							placeholder='Additional Price'
							name='additionalPrice'
							onChange={changeOption}
						/>
					</div>
					<button
						className='button mt-4'
						onClick={() => setOptions((prev) => [...prev, option])}>
						Add Option
					</button>

					<div className='flex flex-wrap gap-4 mt-2'>
						{options.map((opt) => (
							<div className='' key={opt.title}>
								<div className='flex items-center gap-2'>
									<div className='flex border rounded-lg cursor-pointer py-1 px-2'>
										<span>{opt.title}</span>
										<span>(+ ${opt.additionalPrice})</span>
									</div>
									<button
										className='animate'
										onClick={() =>
											setOptions((prev) =>
												prev.filter((item) => item.title !== opt.title),
											)
										}>
										<RxCross2 />
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				<button className='block button animate' type='submit'>
					Submit
				</button>
			</form>
		</section>
	);
};

export default AddPage;
