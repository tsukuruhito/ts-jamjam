import { headerAtom } from "../../Atom";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useRef } from "react";

const Header = () => {
	const ref = useRef<HTMLElement>(null);
	const [, setHeader] = useAtom(headerAtom);
	useEffect(() => {
		if (ref.current) {
			setHeader(ref.current.clientHeight);
		}
	}, [setHeader]);

	return (
		<header
			ref={ref}
			className="fixed bg-slate-400 w-full z-30 flex justify-between items-center font-noka tracking-tight p-4 py-2  flex-row transition-all duration-500 ease-in-out"
		>
			<span className="cursor-pointer">
				<Link href="/" passHref>
					<a className="flex items-center p-2">
						<span className="text-2xl font-semibold text-white">Gaget Tech Note</span>
					</a>
				</Link>
			</span>
		</header>
	);
};

export default Header;
