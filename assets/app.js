(function () {
  "use strict";

  /*
   * Page content is prerendered into index.html by scripts/prerender.js
   * (source: assets/site-data.js). This file only handles interactions.
   */

  function mailto(email, subject, body) {
    var href = "mailto:" + email + "?subject=" + encodeURIComponent(subject || "Project inquiry");
    if (body) href += "&body=" + encodeURIComponent(body);
    return href;
  }

  /* ---------- Year ---------- */
  var yEl = document.getElementById("y");
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ---------- Theme ---------- */
  var root = document.documentElement;
  var KEY = "ts-theme";
  var stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {}
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  } else {
    root.setAttribute("data-theme", "dark");
  }
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
    });
  }

  /* ---------- Sticky header ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 16);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menuToggle");
  var navLinks = document.getElementById("nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Accordion ---------- */
  var accordion = document.getElementById("wpAccordion");
  var accBtn = document.getElementById("wpAccBtn");
  var accBody = document.getElementById("wpAccBody");
  if (accordion && accBtn && accBody) {
    accBody.setAttribute("hidden", "");
    accBtn.addEventListener("click", function () {
      var isOpen = accordion.classList.toggle("open");
      accBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (isOpen) {
        accBody.removeAttribute("hidden");
        accBody.style.maxHeight = accBody.scrollHeight + "px";
      } else {
        accBody.style.maxHeight = "0px";
        window.setTimeout(function () {
          if (!accordion.classList.contains("open")) {
            accBody.setAttribute("hidden", "");
          }
        }, 500);
      }
    });
    window.addEventListener("resize", function () {
      if (accordion.classList.contains("open")) {
        accBody.style.maxHeight = accBody.scrollHeight + "px";
      }
    });
  }

  /* ---------- Inquiry form → mailto (no fake backend) ---------- */
  var form = document.getElementById("inquiryForm");
  var formNote = document.getElementById("inquiryNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.elements.namedItem("name") || {}).value || "";
      var fromEmail = (form.elements.namedItem("email") || {}).value || "";
      var service = (form.elements.namedItem("service") || {}).value || "General inquiry";
      var message = (form.elements.namedItem("message") || {}).value || "";

      if (!name.trim() || !fromEmail.trim() || !message.trim()) {
        if (formNote) {
          formNote.textContent = "Please fill in name, email, and a short project description.";
          formNote.className = "form-note form-note--error";
        }
        return;
      }

      var body =
        "Name: " +
        name.trim() +
        "\nEmail: " +
        fromEmail.trim() +
        "\nService: " +
        service +
        "\n\n" +
        message.trim();

      if (formNote) {
        formNote.textContent = "Opening your email client to send the inquiry…";
        formNote.className = "form-note form-note--ok";
      }

      window.location.href = mailto(form.getAttribute("data-email"), service + " — project inquiry", body);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }
})();
