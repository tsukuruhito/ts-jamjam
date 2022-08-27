import Image from "next/image";

const Kv = () => {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="title">
				<h1 className="title_text">
					Gadget <br /> Tech Note
				</h1>
			</div>
			<Image
				src="/gadget.jpg"
				alt="mainvisual"
				layout="fill"
				className="object-cover pointer-events-none"
				priority
			/>
		</div>
	);
};

export default Kv;
