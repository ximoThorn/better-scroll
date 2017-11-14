export function hasClass (el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function addClass(el, className) {
    if (hasClass(el, className)){
        return;
    };

    let newClassArr = el.className.split(" ");
    newClassArr.push(className);
    el.className = newClassArr.join(" ");
}

export function removeClass(el, className) {
    if (!hasClass) {
        return;
    };

    let newClassArr = el.className.split(" ");

    removeValue(className, newClassArr);
    
    el.className = newClassArr.join(" "); 
    
}

export function removeValue (item, arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == item) {
            arr.splice(i, 1);
            break;
        };
    };
}

export function mapArr(params, num) {
    return params.map(function (item) {
        return item += (params.length*num);
    });
}

export function _mapArr(params, num) {
    return params.map(function (item) {
        return item -= (params.length * num);
    });
}
