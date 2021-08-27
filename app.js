var bill = document.querySelector("#bill");
var nextButton = document.querySelector("#next");
var cashLabel = document.querySelector("#label-cash");
var cash = document.querySelector("#cash");
var checkButton = document.querySelector("#check");
var messageText = document.querySelector("#message-text");
var message = document.querySelector("#message");
var changeTable = document.querySelector("#change-table");

const notes = [2000, 500, 100, 20, 10, 5, 1];

nextButton.addEventListener("click", nextButtonHandler);
checkButton.addEventListener("click", checkButtonHandler);

function nextButtonHandler() {
  // convert string to integer
  var billAmount = parseInt(bill.value);
  
  // check whether input box is empty or not
  if (bill.value !== "") {
    // check whether the user entered positive numbers
    if (Math.sign(billAmount) === 1) {
      cashLabel.style.display = "block";
      cash.style.display = "block";
      checkButton.style.display = "block";
      messageText.style.display = "none";
      changeTable.style.display = "none";
    } else {
      messageText.style.display = "block";
      messageText.innerText = "Input must be a positive number.";
      changeTable.style.display = "none";
    }
  } else {
    messageText.style.display = "block";
    messageText.innerText = "Enter bill amount first.";
    changeTable.style.display = "none";
  }
}

function checkButtonHandler() {
  // convert string to integer
  var billAmount = parseInt(bill.value);
  var cashGiven = parseInt(cash.value);
  
  // check whether input box is empty or not
  if ((bill.value !== "") && (cash.value !== "")) {
    // check whether the user entered positive numbers
    if ((Math.sign(billAmount) === 1) && (Math.sign(cashGiven) === 1)) {
      messageText.style.display = "block";
      messageText.innerText = "Good Job.";
      validateAmounts(billAmount, cashGiven);
    } else {
      messageText.style.display = "block";
      messageText.innerText = "Both inputs must be positive numbers.";
    }
  } else if ((bill.value === "") && (cash.value === "")) {
    messageText.style.display = "block";
    messageText.innerText = "Enter both bill amount and cash given amount.";
    changeTable.style.display = "none";
  } else if ((bill.value === "") || (cash.value === "")) {
    messageText.style.display = "block";
    messageText.innerText = "One out of two amounts is missing. Please enter both amounts.";
    changeTable.style.display = "none";
  }
}

function validateAmounts(billAmount, cashGiven) {
  if (cashGiven > billAmount) {
    calculateChange(billAmount, cashGiven);
    messageText.style.display = "block";
    messageText.innerText = "Return Change";
    message.style.display = "block";
    changeTable.style.display = "block";
  } else if (bill.value === "" || cash.value === "") {
    messageText.style.display = "block";
    messageText.innerText = "Enter both bill amount and cash given amount first.";
  } else {
    messageText.style.display = "block";
    messageText.innerText = "Cash given should be more than the bill amount.";
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