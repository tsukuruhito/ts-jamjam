import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req.query.slug) {
		return res.status(404).json({ message: "Invalid token" });
	}
	//https://ts-jamjam.vercel.app
	const content = await fetch(
		`https://ts-jamjam.microcms.io/api/v1/blogs/${req.query.slug}?fields=id&draftKey=${req.query.draftKey}`,
		{ headers: { "X-MICROCMS-API-KEY": process.env.API_KEY || "" } }
	)
		.then((res) => res.json())
		.catch((error) => null);

	if (!content) {
		return res.status(401).json({ message: "Invalid slug" });
	}
	res.setPreviewData({
		slug: content.id,
		draftKey: req.query.draftKey,
	});
	res.writeHead(307, { Location: `/blogs/${content.id}` });
	res.end("Preview mode enabled");
};

export default handler;
