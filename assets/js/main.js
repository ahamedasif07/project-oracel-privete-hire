// Oracle Private Hire — shared interactivity

document.addEventListener("DOMContentLoaded", function () {
  /* Navbar scroll shadow */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add(
        "bg-ink/85",
        "backdrop-blur-xl",
        "border-b",
        "border-white/5",
        "shadow-elegant",
      );
      header.classList.remove("bg-transparent");
    } else {
      header.classList.remove(
        "bg-ink/85",
        "backdrop-blur-xl",
        "border-b",
        "border-white/5",
        "shadow-elegant",
      );
      header.classList.add("bg-transparent");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* FAQ accordion */
  document.querySelectorAll(".faq-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var iconPlus = btn.querySelector(".icon-plus");
      var iconMinus = btn.querySelector(".icon-minus");
      var isOpen = panel.classList.contains("open");
      if (isOpen) {
        panel.classList.remove("open");
        panel.classList.add("hidden");
        iconPlus.classList.remove("hidden");
        iconMinus.classList.add("hidden");
      } else {
        panel.classList.add("open");
        panel.classList.remove("hidden");
        iconPlus.classList.add("hidden");
        iconMinus.classList.remove("hidden");
      }
    });
  });
});
