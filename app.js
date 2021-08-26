var bill = document.querySelector("#bill");
var cash = document.querySelector("#cash");
var checkButton = document.querySelector("#check");
var errorMsg = document.querySelector("#error-msg");

const notes = [1000, 500, 100, 50, 20, 10, 5, 1];

checkButton.addEventListener("click", buttonClickHandler);

function buttonClickHandler() {
  // convert string to integer
  validateAmounts(parseInt(bill.value), parseInt(cash.value));
}

function validateAmounts(billAmount, cashGiven) {
  // check whether the user entered positive numbers
  if (((Math.sign(billAmount) === 1) && (Math.sign(cashGiven) === 1)) && (cashGiven > billAmount)) {
    calculateChange(billAmount, cashGiven);
    errorMsg.innerText = "Good job";
  } else if (bill.value === "" || cash.value === "") {
    errorMsg.innerText = "Enter both inputs first";
  } else {
    errorMsg.innerText = "Cash given should be more than the bill amount";
  }
}

function calculateChange(billAmount, cashGiven) {
  var returnAmount = cashGiven - billAmount;
  console.log("Initial return amount:", returnAmount);
  for (let i = 0; i < notes.length; i++) {
    var noOfNotes = Math.trunc(returnAmount / notes[i]);
    console.log(notes[i] + " rupee notes: " + noOfNotes);
    
    // updating the amount to be returned in every loop (for every note)
    returnAmount = returnAmount % notes[i];
    
    // alternative method or main logic given in below line
    // returnAmount = returnAmount - (notes[i] * noOfNotes);
    console.log("Current return amount:", returnAmount);
  }
  console.log("Final return amount:", returnAmount);
}