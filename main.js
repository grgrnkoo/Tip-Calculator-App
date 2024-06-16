/* 
    1. reset button
    2. bill event 
    3. choose between percentage and custom value
    4. number of people + bill validation
    5. tip amount
    6. total
*/

// Inputs

const form = document.querySelector('form');
const billField = document.getElementById('bill');
const tipNumber = form.querySelectorAll('input[type="radio"]');
const tipCustom = document.getElementById('custom');
const numberOfPeople = document.getElementById('number');
const resetButton = document.querySelector('button');

const inputObject = {
    bill: 0,
    tip: 0,
    number: 0
};

// Total Function

form.addEventListener('change', (e) => {
    getData(e);
    sumTotals();
    revealResetButton();
});

// Validation 

const validateNumber = (number) => {
    if (Number(number) <= 0) {
        const togglingClass = document.querySelectorAll('.noerror');

        for (const element of togglingClass) {
            element.classList.replace('noerror', 'error');
        };

        return 0;

    } else {
        const togglingClass = document.querySelectorAll('.error');

        for (const element of togglingClass) {
            element.classList.replace('error', 'noerror');
        };

        return number;
    }
}

// Both total sums

function getData(e) {
    if (e.target.name === 'number') {
        inputObject[e.target.name] = Number(validateNumber(e.target.value));
    } else {
        inputObject[e.target.name] = Number(e.target.value);
    }
}

function sumTotals() {
    let totalTip = document.getElementById('total');
    let tipAmount = document.getElementById('tipamount');

    let tempSum = inputObject.bill * inputObject.tip * 0.01;
    let tempAmount = tempSum / inputObject.number;

    totalTip.textContent = tempSum ? `$${tempSum.toFixed(2)}` : '$0.00';
    tipAmount.textContent = (tempAmount && tempAmount !== Infinity) ? `$${tempAmount.toFixed(2)}` : '$0.00';
}

function revealResetButton() {
    if (
        inputObject.bill !== 0 ||
        inputObject.tip !== 0 ||
        inputObject.number !== 0
    ) {
        resetButton.classList.add('active');
    } else {
        resetButton.classList.remove('active');
    }
}

const resetAllFields = () => {
    inputObject.bill = 0;
    inputObject.tip = 0;
    inputObject.number = 0;

    billField.value = '';
    numberOfPeople.value = '';
    tipCustom.value = '';
    resetRadio();
    console.log(inputObject)

    revealResetButton();
}

const resetRadio = () => {
    for (const radio of tipNumber) {
        radio.checked = false;
    }
}

resetButton.addEventListener('click', resetAllFields);

tipCustom.addEventListener('focus', resetRadio);

for (const radio of tipNumber) {
    radio.addEventListener('change', () => {
        if (tipCustom.value !== '') {
            tipCustom.value = '';
        }
    })
}