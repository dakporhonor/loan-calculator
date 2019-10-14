//Listen for submit

document.querySelector('#loan-form').addEventListener('submit', (e) => {
  //Hide results
  document.querySelector('#results').style.display = 'none'

  //Show loader
  document.querySelector('#loading').style.display = 'block'

  setTimeout(calculateResult, 2000);

  e.preventDefault()
}) 

//calculate results

function calculateResult(e) {
//UI vars
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');

const monthlyPpayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterst= document.getElementById('total-interest');

const principal = parseFloat(amount.value);
const calculatedInterst = parseFloat(interest.value)/100/12;
calculatedPayments = parseFloat(years.value) * 12;

//Compute monthly payment 
const x = Math.pow(1 + calculatedInterst, calculatedPayments);
const monthly = (principal * x * calculatedInterst)/ (x-1);

if (isFinite(monthly)) {
  monthlyPpayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayments).toFixed(2);
  totalInterst.value = ((monthly * calculatedPayments) - principal).toFixed(2);

  //show result
  document.querySelector('#results').style.display = 'block'

  //hide loader
  document.querySelector('#loading').style.display = 'none'
} else {
  showError('Please Check Your Numbers')
}

 
}

//Show Error
function showError(error) {

  //hide result
  document.querySelector('#results').style.display = 'none'

  //hide loader
  document.querySelector('#loading').style.display = 'none'

  //create div, get elements, add class
  const errorDiv = document.createElement('div');

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading')

  errorDiv.className = 'alert alert-danger';

  //create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error))

  //Insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}