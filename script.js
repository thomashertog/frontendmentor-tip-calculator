const calculate = function(bill, tip, people) {
    if (bill <= 0 || tip < 0 || people <= 0 || isNaN(bill) || isNaN(tip) || isNaN(people)) {
        return "Invalid input";
    }
    
    const tipAmount = bill * tip;
    const tipPerPerson = tipAmount / people;
    
    const totalAmount = parseFloat(bill) + parseFloat(tipAmount);
    const amountPerPerson = totalAmount / people;

    return {
        tipPerPerson: tipPerPerson.toFixed(2),
        amountPerPerson: amountPerPerson.toFixed(2)
    };
}

function getInfo(event){
    const form = document.getElementById("tip-calculator");
    let tip = new FormData(form).get('tip');
    if(tip === null || tip === 'custom'){
        tip = parseFloat(document.getElementById('tip-custom-input').value) / 100;
    }else{
        document.getElementById('tip-custom-input').value = '';
    }
    const formData = {bill: new FormData(form).get('bill'),
                     tip,
                     people: new FormData(form).get('people')};
    return formData;
}

const updateOutput = function(tip, amount) {
    document.getElementById("person-tip").textContent = `$${tip}`;
    document.getElementById("person-total").textContent = `$${amount}`
}

document.getElementById('tip-custom').addEventListener('focus', (event) => {
    const customTip = event.target.value;
    const relatedTarget = event.relatedTarget;
    if(customTip === 'custom' && relatedTarget.id !== 'tip-custom-input') {
        document.getElementById('tip-custom-input').focus();
    }
});
document.getElementById('tip-custom-input').addEventListener('keydown', (event) => {
    if(event.key === 'ArrowLeft' && event.target.selectionStart === 0) {
        const tip50 = document.getElementById('tip-50');
        tip50.focus();
        tip50.checked = true;
        event.target.value = '';
    }
});


document.querySelector(('button[type="reset"]')).addEventListener('click', () => {
    const personTip = document.getElementById("person-tip");
    const personTotal = document.getElementById("person-total");
    personTip.textContent = "$0.00";
    personTotal.textContent = "$0.00";
});


const allInputs = document.querySelectorAll('input');
for(let inputEntry of allInputs){
    inputEntry.addEventListener('change', (event) => {
        const formData = getInfo(event);
        const result = calculate(formData.bill, formData.tip, formData.people);
        if (result === "Invalid input") {
            return;
        }
        updateOutput(result.tipPerPerson, result.amountPerPerson);
});
}