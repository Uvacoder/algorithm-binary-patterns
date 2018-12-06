const DATA = [0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0];

/**
 * Take an array of 0's and 1's and convert to a bitmask.
 * @param {Array} binary 
 */
function getBitmask(binary) {
    let value = 0;
    for(let i = 0; i < binary.length; i++) {
        value += Math.pow(2,i+1) * binary[i];
    }
    return value;
}

/**
 * Discover patterns in an array of binary.
 * @param {Array} data 
 */
function getPatterns(data,preview=false) {

    let size = data.length;
    let patterns = [];

    for(let chunk = Math.floor(data.length / 2); chunk > 1; chunk--) {
        
        let bitmasks = [];
        for(let index = 0; (index+chunk-1) < size; index += chunk) {
            const slice = data.slice(index,index+chunk);
            bitmasks.push(getBitmask(slice));
        }
        
        let count = 1;
        let previous = null;
        for(let i = 0; i <= bitmasks.length; i++) {
            const current = bitmasks[i] || null;
            if(current === previous) { 
                count++;
            } else {
                if(count > 2) {
                    let pattern = {
                        start       : (i-count)*chunk,
                        size        : chunk,
                        repetitions : count
                    };
                    if(preview)
                        pattern['preview'] = data.slice(pattern.start,pattern.start+(count*chunk));
                    patterns.push(pattern);
                }
                count = 1;
            }
            previous = current;
        }
    }

    return patterns;
}

console.log('Patterns:');
console.log(getPatterns(DATA));