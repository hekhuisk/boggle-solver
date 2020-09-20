import React from 'react';
import PropTypes from 'prop-types';

import BoggleBoardCell from './BoggleBoardCell';

const BoggleBoardColumn = (props) => {
    const {
        alphabet,
        boardState,
        columnIndex,
        numberOfRows,
        setBoardState
    } = props;

    const rowCells = [];

    for (let i = 0; i < numberOfRows; i++) {
        rowCells.push(
            <BoggleBoardCell
                alphabet={alphabet}
                boardState={boardState}
                cellName={`(${i},${columnIndex})`}
                key={`cell-(${i},${columnIndex})`}
                setBoardState={setBoardState}
            />
        );
    }

    return (
        <div>
            {rowCells}
        </div>
    );
}

BoggleBoardColumn.propTypes = {
    alphabet: PropTypes.instanceOf(Set).isRequired,
    boardState: PropTypes.object.isRequired,
    columnIndex: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired,
    setBoardState: PropTypes.func.isRequired
};

export default BoggleBoardColumn;