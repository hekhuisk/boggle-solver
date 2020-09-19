import React from 'react';
import BoggleSolver from './views/BoggleSolver';

const ALPHABET = new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

const App = () => {
    return (
        <BoggleSolver
            alphabet={ALPHABET}
        />
    );
}

export default App;
