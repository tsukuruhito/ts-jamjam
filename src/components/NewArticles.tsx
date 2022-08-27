import { Blog } from "../types";
import Image from "next/image";
import Link from "next/link";

type Props = {
	blogs: Blog[];
};

const NewArticles = ({ blogs }: Props) => {
	return (
		<ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
			{blogs.map((blog) => {
				return (
					<li key={blog.id} className="max-w-sm justify-self-center w-full h-full">
						<Link href={`/blogs/${blog.id}`} passHref>
							<a>
								<div className="rounded-xl bg-slate-400 h-full">
									<Image
										src={blog.eyecatch.url}
										alt="アイキャッチ"
										width={150}
										height={80}
										layout="responsive"
										className="block rounded-t-xl w-full"
										priority
									/>
									<div className="px-4 py-2 text-white box-border">
										<div className="h-auto">{blog.publishedAt.substring(0, 10)}</div>
										<div className="h-auto">{blog.title}</div>
									</div>
								</div>
							</a>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
export default NewArticles;
