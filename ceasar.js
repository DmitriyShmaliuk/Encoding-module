import {CODING_SYMBOLS} from './constants';

String.prototype.filter = Array.prototype.filter;
String.prototype.map = Array.prototype.map;

export function encoding (str, key) {
    const lowerCaseStr = str.toLowerCase();
    return getEncodedString (lowerCaseStr, key); 
}

function getEncodedString (str, key){
    return str.map (symbol => {
        if (isSpecialSymbol(symbol)){
            const currentSymbolIndex = CODING_SYMBOLS.indexOf(symbol);
            const newSymbolIndex = calculateNewSymbolIndex(currentSymbolIndex, key, CODING_SYMBOLS.length);
            return CODING_SYMBOLS[newSymbolIndex];
        }
        else {
            return symbol;   
        }
    }).join('');
}

function isSpecialSymbol (symbol) {
    return CODING_SYMBOLS.indexOf(symbol) !== -1;
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
    const lowerCaseStr = str.toLowerCase();
    const offset = getOffset(key, CODING_SYMBOLS.length);
    return getDecodedString (lowerCaseStr, offset);
}

function getOffset (key, codingSymbolsCount) {
    const divisionKeyOnCodingSymbolsCount = Math.floor(key / codingSymbolsCount);
    return key - (divisionKeyOnCodingSymbolsCount * codingSymbolsCount) - 1;
}

function getDecodedString (str, offset) {
    return str.map ((symbol) => {
        if (isSpecialSymbol(symbol)){
            const currentSymbolIndex = CODING_SYMBOLS.indexOf(symbol);
            const decodedSymbolIndex = getDecodedSymbolIndex (currentSymbolIndex, offset);
            return CODING_SYMBOLS[decodedSymbolIndex];
        }
        else {
            return symbol;
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