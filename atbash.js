import {ENGLISH_ALPHABET} from './constants';

String.prototype.map = Array.prototype.map;

export function encoding (str) {
    const encodedString = str.map (symbol => {
        if (isSpecialSymbol(symbol)) {
            const symbolIndex = ENGLISH_ALPHABET.indexOf(symbol);
            const encodedIndex = getEncodedIndex (symbolIndex, ENGLISH_ALPHABET.length);
            return ENGLISH_ALPHABET[encodedIndex];
        }
        else {
            return symbol;
        }
    }).join('');

    return encodedString;
}

function isSpecialSymbol (symbol) {
    return ENGLISH_ALPHABET.indexOf(symbol) != -1
}

function getEncodedIndex (index, strLength) {
    return strLength - (index + 1);
}

export function decoding (str) {
    return encoding(str);
}