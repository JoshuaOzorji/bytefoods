"use client";
import React from "react";
import Image from "next/image";
import loginImg from "@/../../public/login-img4.png";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const LoginPage = () => {
	const { data, status } = useSession();
	const router = useRouter();

	console.log("data" + data);
	console.log("status " + status);
	if (status === "loading") {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (status === "authenticated") {
		router.push("/");
	}

	return (
		<section className='flex flex-row mx-auto font-barlow justify-center items-center min-h-[80vh]'>
			{/* IMAGE CONTAINER */}
			<div className='hidden md:flex md:w-[50%]'>
				<Image src={loginImg} alt='login image' className=''></Image>
			</div>

			{/* FORM CONTAINER */}
			<div className='md:w-[50%] p-20 mx-auto flex flex-col'>
				<span className='text-center'>
					<p className='font-bold font-chonburi text-lg md:text-5xl'>
						Welcome!
					</p>
					<p className='text-sm md:text-xl mt-4 px-8'>
						Log into your account or create a new one using social buttons
					</p>
				</span>

				<span className='mx-auto flex flex-col'>
					<button
						className='login-button animate'
						onClick={() => signIn("google")}>
						<FcGoogle className='md:w-10 md:h-10' />
						<p className='text-base md:text-xl'>Sign in with Google</p>
					</button>
					<button className='login-button animate'>
						<BsFacebook className='text-[#4267B2] md:w-10 md:h-10' />
						<p className='text-base md:text-xl'>Sign in with Facebook</p>
					</button>
				</span>
			</div>
		</section>
	);
};

export default LoginPage;
