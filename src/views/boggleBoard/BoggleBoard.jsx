import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import BoggleBoardColumn from './BoggleBoardColumn';

const BOGGLE_BLUE = '#0187BB';

const boardStyle = {
    background: BOGGLE_BLUE,
    border: '1px solid black',
    borderRadius: '10px',
    display: 'inline-flex',
    paddingLeft: '5px',
    paddingRight: '5px'
};

const containerStyle = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
}

const buttonStyle = {
    marginTop: '20px'
};

const BoggleBoard = (props) => {
    const {
        alphabet,
        boardState,
        handleOnSubmit,
        numberOfColumns,
        numberOfRows,
        setBoardState
    } = props;

    const columns = [];

    for (let i = 0; i < numberOfColumns; i++) {
        columns.push(
            <BoggleBoardColumn
                alphabet={alphabet}
                boardState={boardState}
                columnIndex={i}
                key={`column-${i}`}
                numberOfRows={numberOfRows}
                setBoardState={setBoardState}
            />
        )
    }

    return (
        <div style={containerStyle}>
            <div style={boardStyle}>
                {columns}
            </div>
            <div>
            <Button
                color="primary"
                variant="contained"
                style={buttonStyle}
                onClick={handleOnSubmit}
            >
                Solve
            </Button>
            </div>
        </div>
    );
};

BoggleBoard.propTypes = {
    alphabet: PropTypes.instanceOf(Set).isRequired,
    boardState: PropTypes.object.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    numberOfColumns: PropTypes.number.isRequired,
    numberOfRows: PropTypes.number.isRequired,
    setBoardState: PropTypes.func.isRequired
};

export default BoggleBoard;