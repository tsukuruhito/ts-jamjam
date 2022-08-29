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
	isPadding: boolean;
	pageId: string;
};

const Layout: FunctionComponent<Props> = ({
	title,
	isHeader,
	isFooter,
	children,
	categories,
	isPadding,
	pageId,
}) => {
	const [header] = useAtom(headerAtom);
	return (
		<div
			className="bg-transparent dark:bg-zinc-500
    "
		>
			<Head>
				<title>{title !== "" ? `Gadget Tech Note | ${title}` : "Gadget Tech Note"}</title>
			</Head>
			{isHeader && <Header />}
			<section
				className="md:grid md:grid-cols-4 lg:grid-cols-5 relative min-h-screen"
				style={isPadding ? { paddingTop: header } : {}}
				id={pageId}
			>
				<main className="p-8 box-border md:col-span-3 lg:col-span-4 flex-col flex">{children}</main>
				<Sidebar categories={categories} />
			</section>
			{isFooter && <Footer />}
		</div>
	);
};

export default Layout;
