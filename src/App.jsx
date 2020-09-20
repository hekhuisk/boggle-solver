import React from 'react';

import { en_dictionary_test } from './util/Dictionary';
import { createDictionaryTrie } from './util/DictionaryReader';
import Trie from './util/Trie';

import BoggleSolver from './views/BoggleSolver';

/*
 * Things to still implement:
 * -Ability for user to select number of columns and rows
 * -Ability for user to select alphabet to use
 * -Ability for user to select dictionary to use
 * -Figure out how to read in entire English dictionary instead of a small subset without taking forever
 * -Make validation actually work
 * -Unit tests
 */

const App = () => {
    // Goal was to let the user select the number of columns and rows, but didn't have time to implement
    const [numberOfColumns, setNumberOfColumns] = React.useState(4);
    const [numberOfRows, setNumberOfRows] = React.useState(4);
    // Goal was to let the user select the alphabet they want to use, but didn't have time to implement
    const [alphabet, setAlphabet] = React.useState(new Set('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
    // Goal was to let the user select the dictionary they want to use, but didn't have time to implement
    const [dictionary, setDictionary] = React.useState(en_dictionary_test);
    const [dictionaryTrie, setDictionaryTrie] = React.useState(new Trie());

    React.useEffect(() => {
        const newDictionaryTrie = createDictionaryTrie(dictionary, 3, numberOfColumns * numberOfRows);
        setDictionaryTrie(newDictionaryTrie);
    }, [dictionary, numberOfColumns, numberOfRows]);

    return (
        <BoggleSolver
            alphabet={alphabet}
            dictionaryTrie={dictionaryTrie}
            numberOfColumns={numberOfColumns}
            numberOfRows={numberOfRows}
        />
    );
}

export default App;