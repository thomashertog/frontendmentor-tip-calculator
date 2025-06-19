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

const getInfo = function(){
    const form = document.getElementById("tip-calculator");
    const formData = {bill: new FormData(form).get('bill'),
                     tip: new FormData(form).get('tip'),
                     people: new FormData(form).get('people')};
    return formData;
}

const updateOutput = function(tip, amount) {
    document.getElementById("person-tip").textContent = `$${tip}`;
    document.getElementById("person-total").textContent = `$${amount}`
}

const allInputs = document.querySelectorAll('input');
for(inputEntry of allInputs){
    inputEntry.addEventListener('change', () => {
        const formData = getInfo();
        const result = calculate(formData.bill, formData.tip, formData.people);
        if (result === "Invalid input") {
            return;
        }
        updateOutput(result.tipPerPerson, result.amountPerPerson);
});
}