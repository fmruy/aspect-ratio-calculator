// DOM load
document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const inputWidth = document.getElementById("input-width");
    const inputHeight = document.getElementById("input-height");
    const errorTag = document.getElementById("error-tag");
    const imageSizeTag = document.getElementById("image-size-tag");
    const aspectRatioTag = document.getElementById("aspect-ratio-tag");
    const fractionTag = document.getElementById("fraction-tag");
    const modeTag = document.getElementById("mode-tag");

    var width = 1920;
    var height = 1080;
    var size;
    var ratio;
    var fraction;
    var mode;

    // User input
    inputWidth.onchange = function () {
        // Update values
        if(valid(this.value)) {
            width = this.value;
        }
        updateCalc();
        printResult();
    };
    inputHeight.onchange = function () {
        // Update values
        if(valid(this.value)) {
            height = this.value;
        }
        ratio = calcRatio(width, height);
        fraction = calcFraction(width, height);
        updateCalc();
        printResult();
    };

    // Functions and calculations
    function isInteger(value) {
        return /^[0-9]+$/.test(value);
    }
    function valid(n) {
        if (isNaN(n) || !isInteger(n)) {
            errorTag.innerHTML = 'Please enter only integer numbers.';
            return false;
        }
        else {
            errorTag.innerHTML = '';
            return true;
        }
    }
    function calcRatio(numerator, denominator) {
        var gcd, temp, divisor, left, right;

        gcd = function (a, b) {
            if (b === 0) return a;
            return gcd(b, a % b);
        }

        // Simple case
        if (numerator === denominator) return '1:1';

        // Make sure numerator is always the larger number
        if (+numerator < +denominator) {
            temp = numerator;
            numerator = denominator;
            denominator = temp;
        }

        divisor = gcd(+numerator, +denominator);

        if ('undefined' === typeof temp) {
            left = numerator / divisor;
            right = denominator / divisor;
        }
        else {
            left = denominator / divisor;
            right = numerator / divisor;
        }

        // Special case
        if (8 === left && 5 === right) {
            left = 16;
            right = 10;
        }
        return left + ":" + right;
    }
    function calcFraction(w, h) {
        let f = w / h;
        return f.toFixed(2);
    }
    function calcMode(w, h) {
        let f = w / h;
        if (f > 1) {
            return "Landscape";
        } else if (f < 1) {
            return "Portrait"
        } else if (f == 1) {
            return "Square"
        }
        return f.toFixed(2);
    }
    function updateCalc() {
        size = width.toString() + "x" + height.toString() + "px";
        ratio = calcRatio(width, height);
        fraction = calcFraction(width, height);
        mode = calcMode(width, height);
    }

    function printResult() {
        imageSizeTag.innerHTML = size;
        aspectRatioTag.innerHTML = ratio;
        fractionTag.innerHTML = fraction;
        modeTag.innerHTML = mode;
    }

    // Default state
    inputWidth.placeholder = width;
    inputHeight.placeholder = height;
    updateCalc();
    printResult();
});