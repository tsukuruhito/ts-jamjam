import Link from "next/link";
import { useRouter } from "next/router";

const OffPreviewButton = () => {
	const isPreview = useRouter().isPreview;

	return (
		<>
			{isPreview && (
				<Link href="/api/delete_cookie" passHref>
					<a className="text-slate-400 border-2 p-2 rounded-md text-sm bg-white fixed right-2 top-2 z-50">
						プレビュー表示OFF
					</a>
				</Link>
			)}
		</>
	);
};
export default OffPreviewButton;
