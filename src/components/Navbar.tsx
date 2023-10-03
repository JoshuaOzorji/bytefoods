import React from "react";
import logo from "../../public/josh-logo.png";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
	return (
		<div className='md:px-10 flex justify-between items-center py-2 px-4 font-barlow border'>
			{/* LOGO */}
			<Link href='/' className='cursor-pointer'>
				<Image src={logo} alt='logo' width={40} height={40} />
			</Link>
			{/* NAVLINKS */}
			<div className='flex gap-x-4'>
				<Link href='/menu'>MENU</Link>
				<UserLinks />
				<CartIcon />
			</div>
		</div>
	);
};

export default Navbar;
