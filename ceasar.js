import {CODING_SYMBOLS} from './constants';

String.prototype.filter = Array.prototype.filter;
String.prototype.map = Array.prototype.map;

export function encoding (str, key) {
    const cleanStr = deleteExtraSymbols (str).toLowerCase();
    return getEncodedString (cleanStr, key); 
}

function deleteExtraSymbols (str) {
    return str.filter((symbol) => CODING_SYMBOLS.indexOf(symbol) !== -1).join('');
}

function getEncodedString (str, key){
    return str.map (symbol => {
        if (isSpace(symbol)){
            return symbol;
        }
        else {
            const currentSymbolIndex = CODING_SYMBOLS.indexOf(symbol);
            const newSymbolIndex = calculateNewSymbolIndex(currentSymbolIndex, key, CODING_SYMBOLS.length);
            return CODING_SYMBOLS[newSymbolIndex];
        }
    }).join('');
}

function isSpace (symbol) {
    return symbol === ' ';
}

function calculateNewSymbolIndex (symbolIndex, key, codingSymbolsCount) {
    const sumSymbolIndexAndKey = symbolIndex + key; 

    if (isSumInAllowableRange(sumSymbolIndexAndKey, codingSymbolsCount)) {
        return sumSymbolIndexAndKey;
    }
    else {
        const divisionSumOnStrLength = Math.floor(sumSymbolIndexAndKey / codingSymbolsCount);
        return sumSymbolIndexAndKey - (codingSymbolsCount * divisionSumOnStrLength) - 1;
    }
}

function isSumInAllowableRange (sum, length) {
    return sum <= length-1;
}

export function decoding (str, key) {
    const cleanStr = deleteExtraSymbols (str).toLowerCase();
    const offset = getOffset(key, CODING_SYMBOLS.length);
    return getDecodedString (cleanStr, offset);
}

function getOffset (key, codingSymbolsCount) {
    const divisionKeyOnCodingSymbolsCount = Math.floor(key / codingSymbolsCount);
    return key - (divisionKeyOnCodingSymbolsCount * codingSymbolsCount) - 1;
}

function getDecodedString (str, offset) {
    return str.map ((symbol) => {
        if (isSpace(symbol)){
            return symbol;
        }
        else {
            const currentSymbolIndex = CODING_SYMBOLS.indexOf(symbol);
            const decodedSymbolIndex = getDecodedSymbolIndex (currentSymbolIndex, offset);
            return CODING_SYMBOLS[decodedSymbolIndex];

        }
        
    }).join('');
}

function getDecodedSymbolIndex (symbolIndex, offset) {
    const subtractionOffsetFromSymbolIndex = symbolIndex - offset;

    if(isSubtractionInAllowableRange(subtractionOffsetFromSymbolIndex)) {
        return subtractionOffsetFromSymbolIndex;
    }
    else {
        return CODING_SYMBOLS.length - subtractionOffsetFromSymbolIndex;
    }
}

function isSubtractionInAllowableRange (subtraction){
    return subtraction >= 0
}