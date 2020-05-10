import {MORSE_ALPHABET} from './constants';

String.prototype.filter = Array.prototype.filter;
String.prototype.map = Array.prototype.map;

export function encoding (str) {
    const lowercaseStr = str.toLowerCase();
    const cleanString = deleteGramaticalSymbols(lowercaseStr);
    return getMorseString (cleanString);
}

function deleteGramaticalSymbols(str) {
    return str.filter (symbol=> MORSE_ALPHABET[symbol])
}

function getMorseString (str) {
    return str.map(symbol => MORSE_ALPHABET[symbol]).join(' ');
}

export function decoding (str) {
    const morseLetters = str.split(' ');
    const decodingAlphabet = getDecodingAlphabet(MORSE_ALPHABET);
    let cleanString = deleteExtraSymbols(morseLetters);

    cleanString = replaceEmptySymbotToSpace(cleanString);
    return cleanString.map(el => decodingAlphabet[el]).join('');
}

function deleteExtraSymbols (str) {
    return str.filter ((el, index, parentArray) => !isDeletedSymbols(el, parentArray[index+1]));
}

function isDeletedSymbols (firstComparedSymbol, secondComparedSymbol) {
    return firstComparedSymbol === '' && secondComparedSymbol === '';
}

function replaceEmptySymbotToSpace (str) {
    return str.map((el) => el === '' ? ' ': el);
}

function getDecodingAlphabet (alphabet) {
    const decodingAlphabet = {};
    
    for (let key in alphabet){
        decodingAlphabet[MORSE_ALPHABET[key]] = key;
    }

    return decodingAlphabet;
}