import React, {Suspense} from "react";

function withSuspense<PT>(Component: React.ComponentType<PT>) {
    return (props:PT) => <Suspense fallback={<div>Loading...</div>}> <Component {...props} />    </Suspense>;
}

/*const withSuspense = <PT extends {}>(Component: React.ComponentType<PT>):React.ReactNode => {
    return (props:PT) => <Suspense fallback={<div>Loading...</div>}> <Component {...props} />    </Suspense>;
}*/

export default withSuspense



