import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	const handleRouteChange = useCallback(
		(url: string) => {
			if (router.isPreview && url.indexOf("?preview=true") <= -1) {
				router.replace(`${url}?preview=true`);
			} else {
				return false;
			}
		},
		[router]
	);

	useEffect(() => {
		handleRouteChange(router.asPath);
		router.events.on("routeChangeComplete", handleRouteChange);
	}, [handleRouteChange, router]);
	return <Component {...pageProps} />;
}

export default MyApp;
