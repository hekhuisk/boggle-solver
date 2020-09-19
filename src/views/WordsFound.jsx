import React from 'react';
import PropTypes from 'prop-types';

const wordListStyle = {
    display: 'flex',
    flexDirection: 'column'
}

const WordsFound = (props) => {
    const { wordsFound } = props;

    return (
        <>
            <h4>
                Words Found
            </h4>
            <div style={wordListStyle}>
                {wordsFound.map((word) =>
                    <span>{word}</span>
                )}
            </div>
        </>
    );
};

WordsFound.propTypes = {
    wordsFound: PropTypes.array.isRequired
};

export default WordsFound;