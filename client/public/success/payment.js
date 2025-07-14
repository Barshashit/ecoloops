document.addEventListener("DOMContentLoaded", function () {
  const payBtn = document.getElementById("payBtn");
  if (payBtn) {
    payBtn.addEventListener("click", function () {
      // Simulate a payment process
      setTimeout(function () {
        window.location.href = "success/success.html"; // adjust if your folder name is different
      }, 1000);
    });
  }
});
