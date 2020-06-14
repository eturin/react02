import React, {Suspense} from "react";

const withSuspense = (Component:any)=> {
    return (props:object) => <Suspense fallback={<div>Loading...</div>}> <Component {...props} />    </Suspense>;
}

export default withSuspense;

