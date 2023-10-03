"use client";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	if (status === "loading") {
		return;
	}

	if (status === "unauthenticated" || !session?.user.isAdmin) {
		return;
	}

	const handleDelete = async () => {
		const res = await fetch(`http://localhost:3000/api/products/${id}`, {
			method: "DELETE",
		});
		if (res.status === 200) {
			router.push("/menu");
			toast("The product has been deleted");
		} else {
			const data = await res.json();
			toast.error(data.message);
		}
	};

	return (
		<section>
			<button className='underline text-gray-400' onClick={handleDelete}>
				Delete this item from menu?
			</button>
		</section>
	);
};

export default DeleteButton;
