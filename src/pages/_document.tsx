import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="ja">
			<Head>
				<meta name="description" content="This is my portfoio site to description my skills" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="https://use.typekit.net/bsj6fnl.css" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
