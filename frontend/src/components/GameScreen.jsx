import { useState } from 'react';

export default function GameScreen({data}) {

    return (
        <>
        <h2>
            hello i am a placeholder here is my data: 
            {JSON.stringify(data,null,2)}
        </h2>
        </>
    );
}