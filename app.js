var bill = document.querySelector("#bill");
var nextButton = document.querySelector("#next");
var cashLabel = document.querySelector("#label-cash");
var cash = document.querySelector("#cash");
var checkButton = document.querySelector("#check");
var messageText = document.querySelector("#message-text");
var changeTable = document.querySelector("#change-table");
var trs = changeTable.getElementsByTagName("tr");
var tds = trs[0].getElementsByTagName("td");

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
      hideMessageText();
      hideChangeTable();
    } else {
      showMessageText("Input must be a positive number.");
      hideChangeTable();
    }
  } else {
    showMessageText("Enter bill amount first.");
    hideChangeTable();
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
      validateAmounts(billAmount, cashGiven);
    } else {
      showMessageText("Both inputs must be positive numbers.");
      hideChangeTable();
    }
  } else if ((bill.value === "") && (cash.value === "")) {
    showMessageText("Enter both bill amount and cash given amount.");
    hideChangeTable();
  } else if ((bill.value === "") || (cash.value === "")) {
    showMessageText("One out of two amounts is missing. Please enter both amounts.");
    hideChangeTable();
  }
}

function validateAmounts(billAmount, cashGiven) {
  if (cashGiven > billAmount) {
    var returnAmount = cashGiven - billAmount;
    messageText.style.display = "block";
    messageText.innerText = "Return Change = " + returnAmount;
    changeTable.style.display = "table";
    calculateChange(returnAmount);
  } else {
    showMessageText("Cash given should be more than the bill amount.");
    hideChangeTable();
  }
}

function calculateChange(returnAmount) {
  console.log("Initial return amount:", returnAmount);
  for (let i = 0; i < notes.length; i++) {
    var noOfNotes = Math.trunc(returnAmount / notes[i]);
    console.log(notes[i] + " rupee notes:", noOfNotes);

    // send the current loop index(i) too
    updateInTable(i, noOfNotes);

    // updating the amount to be returned in every loop (for every note)
    returnAmount = returnAmount % notes[i];

    // alternative method or main logic given in below line
    // returnAmount = returnAmount - (notes[i] * noOfNotes);
    console.log("Current return amount:", returnAmount);
  }
  console.log("Final return amount:", returnAmount);
}

function updateInTable(i, noOfNotes) {
  // Array(tds) done to create an array of the 7 empty <td> elements and map over them to render 'noOfNotes' there
  Array(tds).map(td => {
    console.log(td[i]);
    td[i].innerText = noOfNotes;
  });
}

function hideMessageText() {
  messageText.style.display = "none";
}

function showMessageText(msg) {
  messageText.style.display = "block";
  messageText.innerText = msg;
}

function hideChangeTable() {
  changeTable.style.display = "none";
}