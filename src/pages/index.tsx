import Kv from "../components/Kv";
import Layout from "../components/Layout/Layout";
import NewArticles from "../components/NewArticles";
import { client } from "../libs/client";
import { Blog, Categories } from "../types";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

type Props = {
	blogs: Blog[];
	categories: Categories[];
};
const Home: NextPage<InferGetStaticPropsType<Props>> = ({ blogs, categories }: Props) => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Kv />
			<Layout
				title={""}
				isHeader={false}
				isFooter={false}
				categories={categories}
				isPadding={false}
			>
				<h2 className="text-2xl mb-4">新着記事</h2>
				<NewArticles blogs={blogs} />
				<div className="text-right">
					<Link href="/blogs" passHref>
						<a className='mt-4 inline-block ml-auto mr-0 text-lg after:content-[">"] after:ml-2 after:text-2xl'>
							記事一覧
						</a>
					</Link>
				</div>
			</Layout>
		</div>
	);
};

export default Home;

export const getStaticProps = async () => {
	const data = await client.get({
		endpoint: "blogs",
		queries: {
			limit: 3,
			offset: 0,
		},
	});
	const category = await client.get({
		endpoint: "categories",
	});

	return {
		props: {
			blogs: data.contents,
			categories: category.contents,
		},
	};
};
