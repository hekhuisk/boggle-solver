import React from 'react';
import PropTypes from 'prop-types';

import { solveTheBoggle } from '../util/BoggleSolverUtil';
import Trie from '../util/Trie';

import BoggleBoard from './boggleBoard/BoggleBoard';
import WordsFound from './WordsFound';

const headerStyle = {
    textAlign: 'center'
};

const boardContainerStyle = {
    display: 'flex',
    flexDirection: 'row-reverse',
    left: 0,
    position: 'absolute',
    width: '49%'
}

const wordsFoundContainerStyle = {
    position: 'absolute',
    right: 0,
    width: '49%'
}

const BoggleSolver = (props) => {
    const {
        alphabet,
        dictionaryTrie,
        numberOfColumns,
        numberOfRows
    } = props;

    const [boardState, setBoardState] = React.useState({});
    const [wordsFound, setWordsFound] = React.useState([]);

    React.useEffect(() => {
        const initialBoardState = {};

        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 0; j < numberOfColumns; j++) {
                initialBoardState[`(${i},${j})`] = '';
            }
        }

        setBoardState(initialBoardState);
    }, [numberOfColumns, numberOfRows]);

    const handleSolve = () =>
        setWordsFound(solveTheBoggle(boardState, numberOfColumns, numberOfRows, dictionaryTrie));

    return (
        <div>
            <h1 style={headerStyle}>
                Boggle Solver
            </h1>
            <div>
                <div style={boardContainerStyle}>
                    <BoggleBoard
                        alphabet={alphabet}
                        boardState={boardState}
                        numberOfColumns={numberOfColumns}
                        numberOfRows={numberOfRows}
                        setBoardState={setBoardState}
                        handleSolve={handleSolve}
                    />
                </div>
                <div style={wordsFoundContainerStyle}>
                    <WordsFound wordsFound={wordsFound} />
                </div>
            </div>
        </div>
    );
};

BoggleSolver.propTypes = {
    alphabet: PropTypes.instanceOf(Set).isRequired,
    dictionaryTrie: PropTypes.instanceOf(Trie).isRequired,
    numberOfColumns: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired,
};

export default BoggleSolver;
