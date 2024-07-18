import React from "@rbxts/react";

import ErrorBoundary from "./error-boundary";
import ErrorPage from "./error-page";

type ErrorHandlerProps = Readonly<React.PropsWithChildren>;

export default function ErrorHandler({ children }: ErrorHandlerProps): React.Element {
	return (
		<ErrorBoundary
			Fallback={err => {
				return <ErrorPage Message={tostring(err)} />;
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
