import React from "react";
import ErrorBoundary from './ErrorBoundary'

const RootLayout: React.FC<any> = ({children}) => {
    return (
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    )
};
export default RootLayout;