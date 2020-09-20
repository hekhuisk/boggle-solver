import Trie from './Trie';

/**
 * Filters a dictionary to only have words that are within the given word length limits.
 * It also upper cases every word.
 *
 * @param {Array}  dictionary        - Dictionary to filter
 * @param {number} minimumWordLength - Minimum length of words to keep
 * @param {number} maxWordLength     - Maximum length of words to keep
 * @returns {[]} the filtered dictionary
 */
const filterDictionary = (dictionary, minimumWordLength, maxWordLength) =>
    dictionary.reduce((filteredDictionary, word) => {
        if (word.length >= minimumWordLength && word.length <= maxWordLength) {
            filteredDictionary.push(word.toUpperCase());
        }
        return filteredDictionary;
    }, []);

/**
 * Filters the given dictionary to get rid of any words that aren't within the given word
 * length limits, upper cases the remaining words, and then creates a Trie from the
 * filtered dictionary.
 *
 * @param {Array}  dictionary        - Dictionary to filter
 * @param {number} minimumWordLength - Minimum length of words to keep
 * @param {number} maxWordLength     - Maximum length of words to keep
 * @returns {Trie}
 */
const createDictionaryTrie = (dictionary, minimumWordLength, maxWordLength) => {
    // First filter the dictionary to get rid of unneeded words
    const filteredDictionary = filterDictionary(dictionary, minimumWordLength, maxWordLength);

    // Construct the Trie from the filtered dictionary
    const dictionaryTrie = new Trie();
    filteredDictionary.forEach((word) => dictionaryTrie.insert(word));

    return dictionaryTrie;
};

export {
    createDictionaryTrie
};