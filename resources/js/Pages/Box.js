import React from 'react';

export default function Box(props){

    function BoxComponent(){
        return(
            <div className="h-12 w-20"></div>
        );
    }

    return(
        <>
            <BoxComponent />
            <h1 className="text-6xl">Hello</h1>
        </>

    );

}
