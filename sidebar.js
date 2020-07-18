const toggleBar = document.querySelector(".toggle-bar");
const sidebar = document.querySelector(".sidebar");
const overlay = document.querySelector(".overlay");

const sidebarOn = function () {
  sidebar.style.left = "0";
  // Overlay on
  overlay.className = "overlay overlay-on";
};

const sidebarOff = function () {
  sidebar.style.left = "-600px";
  // Overlay off
  overlay.className = "overlay";
};

toggleBar.addEventListener("click", sidebarOn);
overlay.addEventListener("click", sidebarOff);
