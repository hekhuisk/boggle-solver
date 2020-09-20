// Represents directions to get to each neighbor from a position
const neighboringPositionDeltas = [
    '(-1,-1)', '(0,-1)', '(1,-1)',
    '(-1,0)',            '(1,0)',
    '(-1,1)',  '(0,1)',  '(1,1)'
];

/**
 * Parses X and Y coordinates from a string of format (X,Y).
 *
 * @param {String} position - Coordinates in the format of (X,Y)
 * @returns {[number, number]} array of coordinates in the format of [X,Y]
 */
const parseCoordinates = (position) => {
    // Parse out X and Y values from position
    const indexOfComma = position.indexOf(',');
    // Start at 1 to get rid of the (
    const x = parseInt(position.substring(1, indexOfComma));
    // Subtract 1 to get rid of the )
    const y = parseInt(position.substring(indexOfComma + 1, position.length - 1));

    return [x,y];
};

/**
 * Given the current position, already visited positions, and board size this method returns an
 * array containing all the valid neighboring positions you can get to from the current position.
 *
 * @param {String} currentPosition  - Current position in the board as '(x,y)'
 * @param {Set}    visitedPositions - Already visited positions on the board
 * @param {number} numberOfColumns  - Number of columns on the board
 * @param {number} numberOfRows     - Number of rows on the board
 * @returns {[]} array of coordinates that you can still go to from the current position
 */
const getValidNeighboringPositions = (currentPosition, visitedPositions, numberOfColumns, numberOfRows) => {
    const neighboringPositions = [];

    const [ currentX, currentY ] = parseCoordinates(currentPosition);

    neighboringPositionDeltas.forEach((neighboringPositionDelta) => {
        const [ neighboringPositionDeltaX, neighboringPositionDeltaY ] = parseCoordinates(neighboringPositionDelta);

        // Calculate new position
        const newPositionX = currentX + neighboringPositionDeltaX;
        const newPositionY = currentY + neighboringPositionDeltaY;

        // If the new position is within the board boundaries and we haven't visited it yet, add it to the array of neighbors
        if (newPositionX >= 0 && newPositionX < numberOfColumns
            && newPositionY >= 0 && newPositionY < numberOfRows)
        {
            const newPosition = `(${newPositionX},${newPositionY})`;

            if (!visitedPositions.has(newPosition)) {
                neighboringPositions.push(newPosition);
            }
        }
    });

    return neighboringPositions;
};

/**
 * Recursively searches for words by traversing down the board state.
 *
 * @param {Object} boardState      - Object representing the board where keys are coordinates and values are letters
 * @param {Set} wordsFound         - Words that have been found already
 * @param {String} currentWord     - Current 'word' that has been spelled by the visited positions
 * @param {Trie} dictionaryTrie    - Dictionary Trie to check for valid words
 * @param {Set} visitedPositions   - Already visited positions on the board
 * @param {String} currentPosition - Current position in the board as '(x,y)'
 * @param {number} numberOfColumns - Number of columns on the board
 * @param {number} numberOfRows    - Number of rows on the board
 */
const searchForWord = (
    boardState,
    wordsFound,
    currentWord,
    dictionaryTrie,
    visitedPositions,
    currentPosition,
    numberOfColumns,
    numberOfRows
) => {
    // Valid word has to be at least 3 letters so don't bother seeing if it's a valid word if it's too short
    if (currentWord.length >= 3 && dictionaryTrie.contains(currentWord)) {
        wordsFound.add(currentWord);
    }

    const wordsWithPrefx = dictionaryTrie.find(currentWord);
    // If there are words with the prefix of the current word, keep searching for more words. Otherwise, stop.
    if (wordsWithPrefx.length > 0) {
        const neighboringPositions = getValidNeighboringPositions(currentPosition, visitedPositions, numberOfColumns, numberOfRows);
        neighboringPositions.forEach((neighboringPosition) => {
            const newCurrentPosition = neighboringPosition;

            // Create a new Set so we don't alter the current reference of visistedPositions
            const newVisitedPositions = new Set(visitedPositions);
            newVisitedPositions.add(newCurrentPosition);

            const newCurrentWord = currentWord + boardState[newCurrentPosition];

            searchForWord(boardState, wordsFound, newCurrentWord, dictionaryTrie, newVisitedPositions, newCurrentPosition, numberOfColumns, numberOfRows);
        });
    }
};

/**
 * Solves the given Boggle represented by the board state and returns an array of any words found.
 *
 * @param {Object} boardState      - Object representing the board where keys are coordinates and values are letters
 * @param {number} numberOfColumns - Number of columns on the board
 * @param {number} numberOfRows    - Number of rows on the board
 * @param {Trie} dictionaryTrie    - Dictionary Trie to check for valid words
 * @returns {[]} array of any words that were found
 */
const solveTheBoggle = (boardState, numberOfColumns, numberOfRows, dictionaryTrie) => {
    const wordsFound = new Set();

    /*
     * Get the entries of board state which will give an array of [key,value] where key is the current board position
     * and value is the letter at that position. Letter will be the 'current word' at the point since it's our starting
     * position. We are going to go through every position on the board and do a depth-first-search looking for words.
     */
    for (const [currentPosition, letter] of Object.entries(boardState)) {
        const visistedPositions = new Set();
        visistedPositions.add(currentPosition);

        searchForWord(boardState, wordsFound, letter, dictionaryTrie, visistedPositions, currentPosition, numberOfColumns, numberOfRows);
    }

    return Array.from(wordsFound);
};

export {
    solveTheBoggle
};