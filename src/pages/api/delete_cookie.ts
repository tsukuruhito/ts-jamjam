import type { NextApiRequest, NextApiResponse } from "next";

const delete_cookie = (_req: NextApiRequest, res: NextApiResponse) => {
	res.clearPreviewData();
	res.writeHead(307, { Location: `/` });
	res.end("Preview mode disabled");
};
export default delete_cookie;
