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
			className="fixed bg-white w-full z-30 flex justify-between items-center font-futura tracking-tight py-2 uppercase flex-row transition-all duration-500 ease-in-out"
		>
			<h1 className="cursor-pointer">
				<Link href="/" passHref>
					<a className="flex items-center">
						<span className="text-2xl font-semibold dark:text-white hidden md:block">ts port</span>
					</a>
				</Link>
			</h1>
			<ul className="text-lg flex items-center">
				<li className="cursor-pointer">
					<Link href="/" passHref>
						<a className="inline-block m-2 p-2 defaultLink dark:text-white">top</a>
					</Link>
				</li>
			</ul>
		</header>
	);
};

export default Header;
