import { FunctionComponent } from "react";

const Footer: FunctionComponent = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<footer className="bg-slate-400 text-white text-center p-4 bg-base-300 text-base-content">
				<div>
					<p>Copyright © {year} - All right reserved by Tsuku</p>
				</div>
			</footer>
		</>
	);
};

export default Footer;
