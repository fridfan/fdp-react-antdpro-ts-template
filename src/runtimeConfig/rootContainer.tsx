import React from "react";
import RootLayout from "@/layout/RootLayout";


export default (container: any): React.FunctionComponentElement<any> => {
    return React.createElement(RootLayout, null, container);
    // return React.createElement(container);
}