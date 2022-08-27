import Layout from "../../components/Layout/Layout";
import { client } from "../../libs/client";
import { Blog, Categories } from "../../types";
import { GetStaticPaths, InferGetStaticPropsType, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const data = await client.get({ endpoint: "blogs" });

	const paths = data.contents.map((content: Blog) => `/blogs/${content.id}`);
	return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: string } }) => {
	const id = context.params.id;
	const blog: Blog = await client.get({ endpoint: "blogs", contentId: id });
	const category = await client.get({
		endpoint: "categories",
	});
	return {
		props: {
			blog,
			categories: category.contents,
		},
	};
};
type Props = {
	blog: Blog;
	categories: Categories[];
};
const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props: Props) => {
	const { blog, categories } = props;

	const resultHTML = () => {
		if (blog.table) {
			let html = blog.content;
			for (let i = 0; i < blog.table.length; i++) {
				html = html.replace(`<code>table${i + 1}</code>`, `${blog.table[i].table}`);
			}
			return html;
		} else {
			return blog.content;
		}
	};

	return (
		<Layout
			title={blog.title}
			isHeader={true}
			isFooter={true}
			categories={categories}
			isPadding={true}
		>
			<h1>{blog.title}</h1>
			<section dangerouslySetInnerHTML={{ __html: resultHTML() }} />
		</Layout>
	);
};
export default BlogId;
