import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async ({ params }: { params: { intentId: string } }) => {
	const { intentId } = params;

	try {
		await prisma.order.update({
			where: {
				intent_id: intentId,
			},
			data: { status: "Being prepared" },
		});

		return new NextResponse(
			JSON.stringify({ message: "Order has been updated" }),
			{ status: 200 },
		);
	} catch (err) {
		console.error(err);
		return new NextResponse(
			JSON.stringify({ message: "Something went wrong with your payment" }),
			{ status: 500 },
		);
	}
};
