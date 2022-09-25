import Layout from "../../../../components/Layout/Layout";
import Pagenation from "../../../../components/Pagination";
import { client } from "../../../../libs/client";
import { Blog, Categories } from "../../../../types";
import Image from "next/image";
import Link from "next/link";

const PER_PAGE = 6;
type Props = {
	blogs: Blog[];
	categories: Categories[];
	totalCount: number;
	id: string;
};
const CategoryPageId = ({ blogs, categories, totalCount, id }: Props) => {
	return (
		<Layout
			title={"カテゴリ"}
			isHeader={true}
			isFooter={true}
			categories={categories}
			pageId={"blogs"}
			isPadding={true}
		>
			<div className="h-full">
				<h1 className="text-3xl mb-4">記事一覧</h1>
				{blogs.length === 0 && <div>記事がありません。</div>}
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
			<Pagenation totalCount={totalCount} path={`/category/${id}/page/`} />
		</Layout>
	);
};
export default CategoryPageId;

export const getStaticPaths = async () => {
	const categories = await client.get({ endpoint: "categories" });

	const range = (start: number, end: number) => {
		return [...Array(end - start + 1)].map((_, i) => i + start);
	};

	const ary: string[] = [];

	const genPaths = categories.contents.map(async (category: { id: string }) => {
		const i = await client.get({
			endpoint: `blogs`,
			queries: { filters: `category[equals]${category.id}` },
		});
		const initPath = `/category/${category.id}/page/1`;
		ary.push(initPath);

		range(1, Math.ceil(i.totalCount / PER_PAGE))
			.map((page) => `/category/${category.id}/page/${page}`)
			.forEach((page) => {
				ary.push(page);
			});
	});
	await Promise.all(genPaths);

	const paths = ary.filter((ele, pos) => {
		return ary.indexOf(ele) === pos;
	});

	return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: string; categoryPage: number } }) => {
	const id = context.params.id;
	const page = context.params.categoryPage;

	const data = await client.get({
		endpoint: "blogs",
		queries: {
			offset: (page - 1) * 6,
			filters: `category[equals]${id}`,
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
			id: id,
		},
	};
};
