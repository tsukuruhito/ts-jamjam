import { Categories } from "../types";
import Image from "next/image";
import Link from "next/link";

type Props = {
	categories: Categories[];
};
const Sidebar = ({ categories }: Props) => {
	return (
		<aside className="p-8 col-span-1 bg-gray-100 ">
			<h3 className="text-2xl mb-4">プロフィール</h3>
			<div className="pb-8 border-b-2 border-slate-400 mb-8 flex flex-wrap justify-center gap-4">
				<div className="max-w-[150px] w-full">
					<Image
						src="/tsukuruhito.jpg"
						alt="tsukuruhito"
						width={50}
						height={50}
						layout="responsive"
						className="rounded-full"
					/>
				</div>
				<dl className="justify-self-start">
					<dt className="text-2xl">つく</dt>
					<dd>フロントエンドエンジニア</dd>
					<dd>ガジェットや生産性を高めてくれるものが好きです。</dd>
				</dl>
			</div>
			<h3 className="text-2xl mb-4">カテゴリ</h3>
			<div className="pb-8 border-b-2 border-slate-400 mb-8">
				<ul>
					{categories.map((category) => {
						return (
							<li key={category.id}>
								<Link href={`/categories/${category.id}`} passHref>
									<a>{category.name}</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</aside>
	);
};
export default Sidebar;
