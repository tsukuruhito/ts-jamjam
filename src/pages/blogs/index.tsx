import Layout from "../../components/Layout/Layout";
import { client } from "../../libs/client";
import { Blog } from "../../types";
import Image from "next/image";
import Link from "next/link";

type Props = {
	blogs: Blog[];
};
const blogs = ({ blogs }: Props) => {
	return (
		<Layout title={""} isHeader={true} isFooter={true} categories={[]} pageId={"blogs"}>
			<div className="mb-8">
				<h1 className="text-3xl mb-4">記事一覧</h1>

				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{blogs.map((blog) => {
						return (
							<li key={blog.id} className="max-w-sm justify-self-center w-full h-full">
								<Link href={`/blogs/${blog.id}`} passHref>
									<a>
										<div className="rounded-xl bg-slate-400 h-full">
											<div className="relative">
												<Image
													src={blog.eyecatch.url}
													alt="アイキャッチ"
													width={150}
													height={80}
													layout="responsive"
													className="block rounded-t-xl w-full"
													priority
												/>
												<span className="absolute top-1 left-1 text-white text-xs py-1 px-2 bg-stone-400 rounded-md">
													{blog.category.name}
												</span>
											</div>
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
			</div>
		</Layout>
	);
};
export default blogs;

export const getStaticProps = async () => {
	const data = await client.get({
		endpoint: "blogs",
		queries: {
			limit: 3,
			offset: 0,
		},
	});

	return {
		props: {
			blogs: data.contents,
		},
	};
};
