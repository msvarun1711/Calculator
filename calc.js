document.addEventListener('DOMContentLoaded', function () {
    const inputBox = document.querySelector('.inputbox input');
    const buttons = document.querySelectorAll('.calc form input:not(.inputbox input)');
    let container = document.getElementById('cont');
    let calc = document.getElementById('calc');
    let icon = document.getElementById('icon');

    icon.addEventListener('click', function (){
        document.getElementById('cont').classList.toggle('dark-mode-container');
        calc.classList.toggle('dark-mode-calc');
        icon.classList.toggle('dark-mode-icon');
        document.getElementById('h1').classList.toggle('dark-mode-h1');


    });
    // Load saved input from local storage
    const savedInput = localStorage.getItem('calculatorInput');
    if (savedInput) {
        inputBox.value = savedInput;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.value;

            if (value === '=') {
                try {
                    // Evaluate the expression safely
                    const result = math.evaluate(inputBox.value);
                    inputBox.value = result;
                    localStorage.setItem('calculatorInput', result);
                } catch (error) {
                    inputBox.value = 'Error';
                    localStorage.setItem('calculatorInput', '');
                }
            } else if (value === 'C') {
                // Clear the input
                inputBox.value = '';
                localStorage.setItem('calculatorInput', '');
            } else if (value === 'De') {
                // Remove the last character from the input
                inputBox.value = inputBox.value.slice(0, -1);
                localStorage.setItem('calculatorInput', inputBox.value);
            } else {
                // Append number or operator to input
                if (inputBox.value === 'Error') {
                    inputBox.value = '';
                }
                inputBox.value += value;
                localStorage.setItem('calculatorInput', inputBox.value);
            }
        });
    });
});