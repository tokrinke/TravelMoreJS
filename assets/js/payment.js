document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const totalPrice = urlParams.get("totalPrice");

  if (totalPrice) {
    const toPay = document.querySelector("#toPay");
    if (toPay) {
      toPay.textContent = `Total: ${totalPrice} ₾`;
    }
  }
});

const nameOnCard = document.querySelector("#nameOnCard");
const cardNumber = document.querySelector("#cardNumber");
const payersEmail = document.querySelector("#payersEmail");
const cvc = document.querySelector("#cvc");
const monthOnCard = document.querySelector("#monthOnCard");
const yearOnCard = document.querySelector("#yearOnCard");
const pay = document.querySelector("#pay");

pay.addEventListener("click", () => {
  if (
    nameOnCard &&
    cardNumber &&
    payersEmail &&
    cvc &&
    monthOnCard &&
    yearOnCard
  ) {
    addElementInFirebase("payments", {
      paidBy: nameOnCard.value,
      chargedFrom: cardNumber.value,
      cvc: cvc.value,
      monthOnCard: monthOnCard.value,
      yearOnCard: yearOnCard.value,
      billingEmail: payersEmail.value,
      paidOn: new Date().toString(),
    });
    displayAlert("Success", "Payment processed", "success");
    setTimeout(() => {
      location.href = "./homepage.html";
    }, 2000);
  } else {
    displayAlert("Error", "Fill out payment information fully", "error");
  }
});
