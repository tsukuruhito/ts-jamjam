import Layout from "../../components/Layout/Layout";
import { client } from "../../libs/client";
import { Blog, Categories } from "../../types";
import { GetStaticPaths, InferGetStaticPropsType, NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useRouter } from "next/router";

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const data = await client.get({ endpoint: "blogs" });

	const paths = data.contents.map((content: Blog) => `/blogs/${content.id}`);
	return { paths, fallback: false };
};

export const getStaticProps = async (context: {
	params: { id: string };
	previewData: { draftKey: string };
}) => {
	const id = context.params.id;
	const draftKey = context.previewData?.draftKey ? { draftKey: context.previewData.draftKey } : {};
	const blog: Blog = await client.get({ endpoint: "blogs", contentId: id, queries: draftKey });
	const category = await client.get({
		endpoint: "categories",
	});
	return {
		props: {
			blog,
			categories: category.contents
		}
	};
};

type Props = {
	blog: Blog;
	categories: Categories[];
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props: Props) => {
	const { blog, categories } = props;
	const router = useRouter();
	const resultHTML = () => {
		if (blog.table) {
			let html = blog.content;
			for (let i = 0; i < blog.table.length; i++) {
				html = html.replace(
					`<code>table${i + 1}</code>`,
					`<div>${blog.table[i].editor}</div>${blog.table[i].table}`
				);
			}
			return html;
		} else {
			return blog.content;
		}
	};

	const handlePageBack = () => {
		router.back();
	};

	return (
		<Layout
			title={blog.title}
			isHeader={true}
			isFooter={true}
			categories={categories}
			isPadding={true}
			pageId="blog_content"
		>
			<article>
				<div id="blog_head">
					<h1>{blog.title}</h1>
					<ul className="mt-2 flex flex-wrap gap-1.5">
						<li>
							<span className="text-white bg-slate-400 py-0.5 px-1 rounded-sm text-xs mr-1">
								公開日
							</span>
							{blog.publishedAt ? blog.publishedAt.substring(0, 10) : "xxxx-xx-xx"}
						</li>
						<li>
							<span className="text-white bg-slate-400 py-0.5 px-1 rounded-sm text-xs mr-1">
								更新日
							</span>
							{blog.updatedAt ? blog.updatedAt.substring(0, 10) : "更新日が入ります。"}
						</li>
					</ul>
				</div>
				<section dangerouslySetInnerHTML={{ __html: resultHTML() }} />
			</article>
			<button onClick={handlePageBack} className="btn ml-auto mt-auto">
				前のページに戻る
			</button>
		</Layout>
	);
};

export default BlogId;
