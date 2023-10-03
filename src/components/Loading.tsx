import { SpinnerCircularFixed } from "spinners-react";

const Loading = () => {
	return (
		<div className='flex justify-center min-h-[80vh] '>
			<SpinnerCircularFixed color='#000000' />
		</div>
	);
};

export default Loading;
