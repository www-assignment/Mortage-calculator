const amount = document.getElementById("amount");
const term = document.getElementById("term");
const rate = document.getElementById("rate");
const calculateBtn = document.getElementById("calculateBtn");
const resultsBox = document.getElementById("resultsBox");
const resultsPlaceholder = document.getElementById("resultsPlaceholder");
const monthlyRepay = document.getElementById("monthlyRepay");
const totalRepay = document.getElementById("totalRepay");
const clearAll = document.getElementById("clearAll");

calculateBtn.addEventListener("click", () => {
  const principal = Number(amount.value);
  const years = Number(term.value);
  const yearlyRate = Number(rate.value) / 100;
  const type = document.querySelector("input[name='type']:checked").value;

  // Validate
  if (!principal || !years || !yearlyRate) {
    alert("Please fill all fields correctly.");
    return;
  }

  let monthlyPayment = 0;
  let totalPayment = 0;

  // Monthly rate
  const r = yearlyRate / 12;
  const n = years * 12;

  if (type === "repayment") {
    // Standard amortization formula
    monthlyPayment = (principal * r * Math.pow(1 + r, n)) /
                     (Math.pow(1 + r, n) - 1);
    totalPayment = monthlyPayment * n;
  } else {
    // Interest-only formula
    monthlyPayment = principal * r;
    totalPayment = Number(principal) + (monthlyPayment * n);
  }

  monthlyRepay.textContent = "£" + monthlyPayment.toFixed(2);
  totalRepay.textContent = "£" + totalPayment.toFixed(2);

  resultsPlaceholder.classList.add("hidden");
  resultsBox.classList.remove("hidden");
});

// Clear All
clearAll.addEventListener("click", () => {
  amount.value = "";
  term.value = "";
  rate.value = "";
  document.querySelector("input[value='repayment']").checked = true;

  resultsBox.classList.add("hidden");
  resultsPlaceholder.classList.remove("hidden");
});
