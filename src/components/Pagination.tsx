import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
	totalCount: number;
	path: string;
};
const Pagenation = ({ totalCount, path }: Props) => {
	const router = useRouter();
	const pathname = Number(router.asPath.replace(path, ""));
	const PER_PAGE = 6;

	const rage = (start: number, end: number) => {
		return [...Array(end - start + 1)].map((_, i) => start + i);
	};
	return (
		<ul className="flex flex-wrap gap-4 justify-center">
			{rage(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => {
				return (
					<li
						key={index}
						className={`border border-slate-200 rounded-md hover:bg-slate-400 hover:text-white transition-all duration-150 text-xs
                        ${pathname === index + 1 && "bg-slate-400 text-white"}`}
					>
						<Link href={`${path}${number}`} as={`${path}${number}`}>
							<a className="w-8 h-8 flex items-center justify-center">{number}</a>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
export default Pagenation;
