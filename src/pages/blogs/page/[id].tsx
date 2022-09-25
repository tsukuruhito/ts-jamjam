import Layout from "../../../components/Layout/Layout";
import Pagenation from "../../../components/Pagination";
import { client } from "../../../libs/client";
import { Blog, Categories } from "../../../types";
import Image from "next/image";
import Link from "next/link";

type Props = {
	blogs: Blog[];
	totalCount: number;
	categories: Categories[];
};
const PER_PAGE = 6;
const BlogPageId = ({ blogs, totalCount, categories }: Props) => {
	return (
		<Layout
			title={"記事一覧"}
			isHeader={true}
			isFooter={true}
			categories={categories}
			pageId={"blogs"}
			isPadding={true}
		>
			<div className="h-full">
				<h1 className="text-3xl mb-4">記事一覧</h1>

				<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
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
			<Pagenation totalCount={totalCount} path="/blogs/page/" />
		</Layout>
	);
};
export default BlogPageId;

export const getStaticPaths = async () => {
	const repos = await client.get({ endpoint: "blogs" });
	const range = (start: number, end: number) => {
		return [...Array(end - start + 1)].map((_, i) => i + start);
	};
	const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => {
		return `/blogs/page/${repo}`;
	});
	return { paths, fallback: true };
};

export const getStaticProps = async (context: { params: { id: number } }) => {
	const id = context.params.id;

	const data = await client.get({
		endpoint: "blogs",
		queries: {
			offset: (id - 1) * 6,
			limit: 6,
		},
	});

	const categories = await client.get({
		endpoint: "categories",
	});
	return {
		props: {
			blogs: data.contents,
			totalCount: data.totalCount,
			categories: categories.contents,
		},
		revalidate: 60,
	};
};
