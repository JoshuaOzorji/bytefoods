"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Loading from "./Loading";

const UserLinks = () => {
	const { status } = useSession();

	return (
		<div>
			{status === "authenticated" ? (
				<div className='flex flex-row gap-4'>
					<Link href='/orders'>ORDERS</Link>
					<span className='cursor-pointer' onClick={() => signOut()}>
						LOGOUT
					</span>
				</div>
			) : (
				<Link href='/login'>LOGIN</Link>
			)}
		</div>
	);
};

export default UserLinks;
