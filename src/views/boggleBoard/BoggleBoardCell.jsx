import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

const cellStyle = {
    background: 'white',
    borderRadius: '10px',
    border: '1px solid black',
    height: '80px',
    marginBottom: '10px',
    marginLeft: '5px',
    marginTop: '10px',
    marginRight: '5px',
    width: '70px'
};

const formHelperTextProps = {
    style: {
        textAlign: 'center'
    }
}

const BoggleBoardCell = (props) => {
    const {
        alphabet,
        boardState,
        cellName,
        setBoardState
    } = props;

    const [cellValue, setCellValue] = React.useState('');
    const [hasError, setHasError] = React.useState(false);

    const handleOnChange = (event) => {
        // Only let the user input a single character and make it uppercase
        const newValue = event.target.value.charAt(0).toUpperCase();

        setCellValue(newValue);

        // Update board state
        boardState[cellName] = newValue;
        setBoardState(boardState);

        // If the character isn't in our alphabet make the input error
        setHasError(newValue.length > 0 && !alphabet.has(newValue));
    };

    const inputProps = {
        style: {
            color: hasError ? 'red' : '#000000',
            fontSize: '20px',
            textAlign: 'center',
        }
    };

    return (
        <div style={cellStyle}>
            <TextField
                error={hasError}
                FormHelperTextProps={formHelperTextProps}
                helperText={hasError ? "Invalid character" : undefined}
                inputProps={inputProps}
                value={cellValue}
                onChange={handleOnChange}
            />
        </div>
    );
};

BoggleBoardCell.propTypes = {
    alphabet: PropTypes.instanceOf(Set).isRequired,
    boardState: PropTypes.object.isRequired,
    cellName: PropTypes.string.isRequired,
    setBoardState: PropTypes.func.isRequired
};

export default BoggleBoardCell;