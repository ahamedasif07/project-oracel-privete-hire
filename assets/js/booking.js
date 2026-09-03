/* Booking multi-step form */
var bookingForm = document.getElementById("booking-form");
if (bookingForm) {
  var steps = bookingForm.querySelectorAll(".booking-step");
  var stepIndicators = document.querySelectorAll(".step-indicator");
  var stepConnectors = document.querySelectorAll(".step-connector");
  var currentStep = 0;
  var backBtn = document.getElementById("booking-back");
  var nextBtn = document.getElementById("booking-next");
  var successPanel = document.getElementById("booking-success");

  function renderStep() {
    steps.forEach(function (s, i) {
      s.classList.toggle("active", i === currentStep);
    });
    stepIndicators.forEach(function (el, i) {
      if (i <= currentStep) {
        el.classList.add("border-gold", "bg-gold", "text-ink");
        el.classList.remove("border-white/20", "text-muted-foreground");
      } else {
        el.classList.remove("border-gold", "bg-gold", "text-ink");
        el.classList.add("border-white/20", "text-muted-foreground");
      }
      el.textContent = i < currentStep ? "✓" : String(i + 1);
    });
    document.querySelectorAll(".step-label").forEach(function (el, i) {
      el.classList.toggle("text-gold", i <= currentStep);
      el.classList.toggle("text-muted-foreground", i > currentStep);
    });
    stepConnectors.forEach(function (el, i) {
      el.classList.toggle("bg-gold", i < currentStep);
      el.classList.toggle("bg-white/10", i >= currentStep);
    });
    if (backBtn) backBtn.disabled = currentStep === 0;
    if (nextBtn)
      nextBtn.textContent =
        currentStep < steps.length - 1 ? "Continue" : "Confirm Booking";
  }

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      currentStep = Math.max(0, currentStep - 1);
      renderStep();
    });
  }

  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var activeStep = steps[currentStep];
    if (!activeStep.checkValidity()) {
      activeStep.reportValidity();
      return;
    }
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      bookingForm.classList.add("hidden");
      document.getElementById("booking-progress").classList.add("hidden");
      if (successPanel) successPanel.classList.remove("hidden");
    }
  });

  renderStep();
}
