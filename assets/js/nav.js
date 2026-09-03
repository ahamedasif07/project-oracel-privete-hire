/* Mobile menu toggle */
var menuBtn = document.getElementById("menu-toggle");
var drawer = document.getElementById("mobile-drawer");
var menuIconOpen = document.getElementById("icon-menu");
var menuIconClose = document.getElementById("icon-close");

/* Fix: move the drawer out of #site-header and make it a direct child
   of <body>. If any ancestor (like the header, on scroll) ever gets a
   CSS transform/filter, a `position: fixed` descendant stops being
   positioned relative to the viewport and instead follows that
   ancestor — which is exactly why the drawer stopped opening after
   scrolling. Detaching it to <body> removes that dependency entirely. */
if (drawer && drawer.parentElement !== document.body) {
  document.body.appendChild(drawer);
}

function closeDrawer() {
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.classList.add("closed");
  document.body.style.overflow = "";
  if (menuIconOpen) menuIconOpen.classList.remove("hidden");
  if (menuIconClose) menuIconClose.classList.add("hidden");
}

if (menuBtn && drawer) {
  menuBtn.addEventListener("click", function () {
    var isOpen = drawer.classList.contains("open");
    if (isOpen) {
      closeDrawer();
    } else {
      drawer.classList.add("open");
      drawer.classList.remove("closed");
      document.body.style.overflow = "hidden";
      if (menuIconOpen) menuIconOpen.classList.add("hidden");
      if (menuIconClose) menuIconClose.classList.remove("hidden");
    }
  });

  document.querySelectorAll("#mobile-drawer a").forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });
}
