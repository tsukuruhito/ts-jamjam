import { headerAtom } from "../../Atom";
import { Categories } from "../../types";
import Sidebar from "../Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import { useAtom } from "jotai";
import Head from "next/head";
import { FunctionComponent, ReactNode } from "react";

type Props = {
	title: string;
	isHeader: boolean;
	isFooter: boolean;
	children: ReactNode;
	categories: Categories[];
	isPadding?: boolean;
};

const Layout: FunctionComponent<Props> = ({
	title,
	isHeader,
	isFooter,
	children,
	categories,
	isPadding,
}) => {
	const [header] = useAtom(headerAtom);
	return (
		<div
			className="bg-transparent dark:bg-zinc-500
    "
		>
			<Head>
				<title>{title}</title>
			</Head>
			{isHeader && <Header />}
			<section
				className={
					isPadding
						? `md:grid md:grid-cols-4 lg:grid-cols-5 pt-[${header}px]`
						: `md:grid md:grid-cols-4 lg:grid-cols-5`
				}
			>
				<main className="p-4 bg-gray-200 md:col-span-3 lg:col-span-4">{children}</main>
				<Sidebar categories={categories} />
			</section>
			{isFooter && <Footer />}
		</div>
	);
};

export default Layout;
