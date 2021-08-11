// ALL SELECTORS
const billInput = document.querySelector("#bill");
const custom = document.querySelector("#custom");
const amount = document.querySelector("#amount-price");
const textAlert = document.querySelector(".alert-1");
const textAlert1 = document.querySelector(".alert-2");
const resetBtn = document.querySelector("#reset-btn");
const total = document.querySelector("#total-price");
const customId = document.querySelector(".custom-id");
const numberOfPeople = document.querySelector("#number-of-people");
const percentBtn = document.querySelectorAll("li");
const btnContainer = document.querySelector("ul");
const customBtn = document.querySelector("#custom-btn");
let customValue = [];

// PUSH CUSTOM PERCENTAGE VALUE TO AN ARRAY
customBtn.addEventListener("click", () => {
  customValue.push(custom.value);
  customValue.splice(0, 2, custom.value);
  customId.setAttribute("data-id", customValue[customValue.length - 1]);
});

// LOOPING THROUGH EACH BUTTON
percentBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id;
    customBtn.addEventListener("click", () => {
      customId.setAttribute("data-id", customValue[customValue.length - 1]);
    });
    let billValue = billInput.value;
    console.log(billValue);
    let peopleNum = numberOfPeople.value;
    const amountValue = percentage(id, billValue) / peopleNum;
    const totalValue =
      percentage(id, billValue) / peopleNum + billValue / peopleNum;
    if (parseInt(billValue) > 0 && parseInt(peopleNum) > 0) {
      // PRINT TIP AMOUNT AND TOTAL NUMBERS
      amount.textContent = "$" + amountValue.toFixed(2);
      total.textContent = "$" + totalValue.toFixed(2);

      // REMOVE ERROR CLASSES
      textAlert.classList.remove("people-text-err");
      textAlert1.classList.remove("people-text-err");
      billInput.classList.remove("people-input-err");
      numberOfPeople.classList.remove("people-input-err");
    } else {
      textAlert.classList.add("people-text-err");
      numberOfPeople.classList.add("people-input-err");
      textAlert1.classList.add("people-text-err");
      billInput.classList.add("people-input-err");
      amount.textContent = `$0.00`;
      total.textContent = `$0.00`;
    }
  });
});

// TOGGLE ACTIVE CLASSES FOR PERCENT BUTTONS
if (percentBtn) {
  percentBtn.forEach(function (el, key) {
    el.addEventListener("click", function () {
      el.classList.add("active");
      percentBtn.forEach(function (ell, els) {
        if (key !== els) {
          ell.classList.remove("active");
        }
      });
    });
  });
}

// REMOVE ACTIVE CLASS FROM BUTTON WHEN PRESSING OUTSIDE OF AN ELEMENT
document.addEventListener("click", (e) => {
  const isClickInside = btnContainer.contains(e.target);
  if (!isClickInside) {
    percentBtn.forEach((btn) => {
      btn.classList.remove("active");
    });
  }
});

// RESET FUNCTIONALITY
resetBtn.addEventListener("click", () => {
  percentBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
  textAlert.classList.remove("people-text-err");
  textAlert1.classList.remove("people-text-err");
  billInput.classList.remove("people-input-err");
  numberOfPeople.classList.remove("people-input-err");
  amount.textContent = `$0.00`;
  total.textContent = `$0.00`;
  numberOfPeople.value = "";
  billInput.value = "";
  custom.value = "";
  customValue = [];
});

// PERCENTAGE CALCULATION FORMULA //
function percentage(partialValue, totalValue) {
  return (partialValue * totalValue) / 100;
}
