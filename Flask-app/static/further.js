function mergesort(_arr){
    if (_arr.length < 2){
        return _arr
    }
    const midpoint = Math.floor(_arr.length/2);
    const leftHalf = _arr.slice(0,midpoint);
    const rightHalf = _arr.slice(midpoint, _arr.length);
    return Combine(mergesort(leftHalf), mergesort(rightHalf));
}
function Combine(_left,_right){
    let runningAns = [], lIndex = 0, rIndex =0;
    while(lIndex < _left.length && rIndex < _right.length){
        if(_left[lIndex][1] < _right[rIndex][1]){
            runningAns.push(_left[lIndex]);
            lIndex++;
        }else{
            runningAns.push(_right[rIndex]);
            rIndex++;
        }
        console.log(runningAns.concat(_left.slice(lIndex, _left.length)).concat(_right.slice(rIndex, _right.length)));
        return runningAns.concat(_left.slice(lIndex, _left.length)).concat(_right.slice(rIndex, _right.length));
    }
}