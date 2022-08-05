// DOM load
document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const DEBUG_PRINT = true;

    //const inputSelect = document.getElementById("input-select");
    const inputWidth = document.getElementById("input-width");
    const inputHeight = document.getElementById("input-height");
    const modeOptionsTag = document.getElementById("mode-options-tag");
    const errorTag = document.getElementById("error-tag");
    const imageSizeTag = document.getElementById("image-size-tag");
    const aspectRatioTag = document.getElementById("aspect-ratio-tag");
    const fractionTag = document.getElementById("fraction-tag");
    const modeResultTag = document.getElementById("mode-result-tag");

    var mode = modeOptionsTag.innerHTML;
    var modeValid = false;
    var mode_n1;
    var mode_n2;
    var initialWidth = 1920;
    var initialHeight = 1080;
    var width = initialWidth;
    var height = initialHeight;
    var size;
    var ratio;
    var fraction;
    var textMode;

    // -------------------- User actions, Auxiliary functions --------------------
    function consolePrint() {
        if (DEBUG_PRINT) {
            if (arguments.length == 0) { console.warn("Console.log(?) - arg missing"); }
            if (arguments.length > 0) {
                let arg = [];
                for (var i = 0; i < arguments.length; i++) {
                    arg.push(arguments[i]);
                }
                console.log(...arg);
            }
        }
    }
    function userPrint(message) {
        errorTag.innerHTML = message;
    }

    // User input
    inputWidth.onchange = function () {
        // Update values
        if (valid(this.value)) {
            width = this.value;
        } else {
            inputWidth.value = "";
            return;
        }
        if (modeValid) { calcRemainValue("h"); };
        asignStyle(this);
        updateCalc();
        printResult();
    };
    inputHeight.onchange = function () {
        // Update values
        if (valid(this.value)) {
            height = this.value;
        } else {
            inputHeight.value = "";
            return;
        }
        if (modeValid) { calcRemainValue("w"); }
        asignStyle(this);
        updateCalc();
        printResult();
    };
    
    function asignStyle(element) {
        if (modeValid) {
            inputWidth.classList.remove(("border-intense"));
            inputHeight.classList.remove(("border-intense"));
        };
        element.classList.add("border-intense");
    };

    // Functions and calculations
    function modeIsValid() {
        if(mode == "Custom Size") {
            return false;
        }
        mode_n1 = Number(mode.split(":")[0]);
        mode_n2 = Number(mode.split(":")[1]);
        if (mode_n1 && mode_n2) { return true; };
        userPrint("This URL is not valid Number. User will be redirected to root.")
        return false;
    }
    function isInteger(value) {
        return /^[0-9]+$/.test(value);
    }
    function isFloat(value) {
        if (!Number.isNaN(value) && !Number.isInteger(value)) { return true; }
        return false;
    }
    function rounded(value) {
        // Round to .001
        let fn = Math.round(value*1000)/1000;
        if (value > 10 || value < 100) {
            // Round to .01
            fn = Math.round(value*100)/100;
        }
        if (value >= 100) {
            // Round to .1
            fn = Math.round(value*10)/10;
        }
        return fn;
    }
    
    function valid(n) {
        if (isNaN(n) || !isFloat(n)) {
            userPrint('Please enter only integer numbers.');
            return false;
        } else if (n < 1) {
            userPrint('Please enter a number greater than 0.');
            return false;
        } else if (n > 20000) {
            userPrint('Please enter a number less than 20000.');
            return false;
        } else {
            errorTag.innerHTML = '';
            return true;
        }
    }
    function calcRemainValue(remain) {
        // Abort if not valid preset
        if (!modeValid) { return; }
        // Calculate remain value Width
        if (remain == "w") {
            let fraction = mode_n2 / mode_n1;
            let n = (height * 1 / fraction);

            // Assign to global variable > rounded width to avoid strange numbers
            let n_fixed = n.toFixed(2);  // TODO NOT WORKING
            let n_round = Math.round(n);  // TODO NOT WORKING
            width = n;

            // Inform user if doen't match
            if (Number(n_fixed) !== n_round && (width + 0.5) !== n_round) {
                width = n_round;
                calcRemainValue("h");
                userPrint("This height makes a complicated number, we rounded values to find the most closest combination possible.");
            }

            // Assign in input element
            //inputWidth.value = "";
            //inputWidth.placeholder = rounded(n);
            inputWidth.value = rounded(n);
        }
        // Calculate remain value Height
        if (remain == "h") {
            let fraction = mode_n2 / mode_n1;
            //let n = Math.round(width * f);
            let n = (width * fraction);

            // Assign to global variable
            height = n;

            // Assign in input element
            //inputHeight.value = "";
            //inputHeight.placeholder = rounded(n);
            inputHeight.value = rounded(n);
        }
        calcRatio(width, height);
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
    function calcTextMode(w, h) {
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
        size = rounded(width) + "x" + rounded(height);
        ratio = calcRatio(width, height);
        fraction = calcFraction(width, height);
        textMode = calcTextMode(width, height);
    }
    function printResult() {
        imageSizeTag.innerHTML = size;
        aspectRatioTag.innerHTML = ratio;
        fractionTag.innerHTML = fraction;
        modeResultTag.innerHTML = textMode;
    }

    // Default state
    modeValid = modeIsValid();
    consolePrint("Predefined mode valid: " + modeValid);
    if (mode_n1 && mode_n2) { consolePrint("Mode x:y :", mode_n1, mode_n2); }
    if (modeValid) { calcRemainValue("h"); };
    asignStyle(inputHeight);
    asignStyle(inputWidth);
    inputWidth.placeholder = width;
    inputHeight.placeholder = height;
    updateCalc();
    printResult();
});