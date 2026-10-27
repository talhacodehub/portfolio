(function () {
  "use strict";

  var data = window.SITE_DATA;
  if (!data) return;

  var email = data.profile.email;

  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mailto(subject, body) {
    var href = "mailto:" + email + "?subject=" + encodeURIComponent(subject || "Project inquiry");
    if (body) href += "&body=" + encodeURIComponent(body);
    return href;
  }

  function tagsHtml(tags) {
    return (tags || [])
      .map(function (t) {
        return '<span class="tag">' + esc(t) + "</span>";
      })
      .join("");
  }

  function listHtml(items) {
    return (
      "<ul class=\"bullet-list\">" +
      (items || [])
        .map(function (item) {
          return "<li>" + esc(item) + "</li>";
        })
        .join("") +
      "</ul>"
    );
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

  /* ---------- Services ---------- */
  var servicesFeatured = document.getElementById("servicesFeatured");
  var servicesMore = document.getElementById("servicesMore");
  if (servicesFeatured && servicesMore) {
    var featured = data.services.filter(function (s) {
      return s.featured;
    });
    var more = data.services.filter(function (s) {
      return !s.featured;
    });

    servicesFeatured.innerHTML = featured
      .map(function (s) {
        return (
          '<article class="service-card service-card--featured" id="service-' +
          esc(s.id) +
          '">' +
          '<h3 class="service-title">' +
          esc(s.name) +
          "</h3>" +
          '<p class="service-problem">' +
          esc(s.problem) +
          "</p>" +
          '<div class="service-label">What I deliver</div>' +
          listHtml(s.deliverables) +
          '<div class="service-label">Relevant systems</div>' +
          '<div class="tag-row">' +
          tagsHtml(s.tech) +
          "</div>" +
          '<a class="btn btn-ghost service-cta" href="' +
          mailto(s.mailtoSubject) +
          '">' +
          esc(s.cta) +
          "</a>" +
          "</article>"
        );
      })
      .join("");

    servicesMore.innerHTML = more
      .map(function (s) {
        return (
          '<article class="service-card" id="service-' +
          esc(s.id) +
          '">' +
          '<h3 class="service-title">' +
          esc(s.name) +
          "</h3>" +
          '<p class="service-problem">' +
          esc(s.problem) +
          "</p>" +
          '<div class="service-label">What I deliver</div>' +
          listHtml(s.deliverables.slice(0, 4)) +
          '<div class="tag-row">' +
          tagsHtml(s.tech) +
          "</div>" +
          '<a class="text-link service-cta" href="' +
          mailto(s.mailtoSubject) +
          '">' +
          esc(s.cta) +
          " →</a>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---------- Case studies ---------- */
  var caseGrid = document.getElementById("caseStudies");
  var archiveGrid = document.getElementById("projectArchive");
  if (caseGrid) {
    var primary = data.caseStudies.filter(function (c) {
      return c.featured;
    });
    var archive = data.caseStudies.filter(function (c) {
      return !c.featured;
    });

    caseGrid.innerHTML = primary
      .map(function (c) {
        return (
          '<article class="case-card" id="case-' +
          esc(c.id) +
          '">' +
          '<div class="case-meta">' +
          '<span class="feat-tag">' +
          esc(c.category) +
          "</span>" +
          '<span class="status-pill status-' +
          esc(c.status) +
          '">' +
          esc(c.statusLabel) +
          "</span>" +
          "</div>" +
          '<h3 class="feat-title">' +
          esc(c.title) +
          "</h3>" +
          '<p class="feat-desc"><strong>Context.</strong> ' +
          esc(c.context) +
          "</p>" +
          '<p class="feat-desc"><strong>Role.</strong> ' +
          esc(c.role) +
          "</p>" +
          '<div class="service-label">Approach</div>' +
          listHtml(c.approach) +
          '<p class="feat-desc"><strong>Challenges.</strong> ' +
          esc(c.challenges) +
          "</p>" +
          '<p class="feat-desc"><strong>Status / outcome.</strong> ' +
          esc(c.outcome) +
          "</p>" +
          (c.note ? '<p class="case-note">' + esc(c.note) + "</p>" : "") +
          '<div class="feat-stack">' +
          tagsHtml(c.stack) +
          "</div>" +
          '<a class="text-link" href="#contact">Discuss similar work →</a>' +
          "</article>"
        );
      })
      .join("");

    if (archiveGrid) {
      archiveGrid.innerHTML = archive
        .map(function (c) {
          return (
            '<article class="feat-card archive-card">' +
            '<div class="case-meta">' +
            '<span class="feat-tag">' +
            esc(c.category) +
            "</span>" +
            '<span class="status-pill status-' +
            esc(c.status) +
            '">' +
            esc(c.statusLabel) +
            "</span>" +
            "</div>" +
            '<h3 class="feat-title">' +
            esc(c.title) +
            "</h3>" +
            '<p class="feat-desc">' +
            esc(c.context) +
            "</p>" +
            '<div class="feat-stack">' +
            tagsHtml(c.stack) +
            "</div>" +
            "</article>"
          );
        })
        .join("");
    }
  }

  /* ---------- Experience ---------- */
  var expEl = document.getElementById("experienceList");
  if (expEl) {
    expEl.innerHTML = data.experience
      .map(function (e) {
        return (
          '<div class="tl-item">' +
          '<div class="tl-dates">' +
          esc(e.dates) +
          "</div>" +
          '<h3 class="tl-title">' +
          esc(e.title) +
          "</h3>" +
          '<div class="tl-co">' +
          esc(e.company) +
          "</div>" +
          '<p class="tl-desc">' +
          esc(e.description) +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Education ---------- */
  var eduEl = document.getElementById("educationGrid");
  if (eduEl) {
    eduEl.innerHTML = data.education
      .map(function (e) {
        return (
          '<div class="edu-card">' +
          '<div class="edu-years">' +
          esc(e.years) +
          "</div>" +
          '<div class="edu-degree">' +
          esc(e.degree) +
          "</div>" +
          '<div class="edu-school">' +
          esc(e.school) +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Capabilities ---------- */
  var capEl = document.getElementById("capabilitiesGrid");
  if (capEl) {
    capEl.innerHTML = data.capabilities
      .map(function (c) {
        return (
          '<div class="stack-card">' +
          '<div class="stack-title">' +
          esc(c.title) +
          "</div>" +
          '<p class="cap-summary">' +
          esc(c.summary) +
          "</p>" +
          '<div class="tag-row">' +
          tagsHtml(c.tags) +
          "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Approach ---------- */
  var approachEl = document.getElementById("approachGrid");
  if (approachEl) {
    approachEl.innerHTML = data.approach
      .map(function (a) {
        return (
          '<div class="approach-card">' +
          '<div class="approach-step">' +
          esc(a.step) +
          "</div>" +
          "<h3>" +
          esc(a.title) +
          "</h3>" +
          "<p>" +
          esc(a.text) +
          "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  /* ---------- Testimonials ---------- */
  var refEl = document.getElementById("referencesGrid");
  if (refEl) {
    refEl.innerHTML = data.testimonials
      .map(function (t) {
        return (
          '<article class="ref-card">' +
          '<p class="ref-quote">' +
          esc(t.quote) +
          "</p>" +
          '<div class="ref-name">' +
          esc(t.name) +
          "</div>" +
          '<div class="ref-role">' +
          esc(t.role) +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  /* ---------- WordPress portfolio ---------- */
  var grid = document.getElementById("wpGrid");
  var countEl = document.getElementById("wpCount");
  if (grid) {
    grid.innerHTML = data.wpProjects
      .map(function (p) {
        return (
          '<a class="wp-item" href="' +
          esc(p.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<span class="dot" aria-hidden="true"></span>' +
          '<span class="name">' +
          esc(p.name) +
          "</span>" +
          '<span class="ext" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>' +
          "</a>"
        );
      })
      .join("");
  }
  if (countEl) {
    countEl.textContent = data.wpProjects.length + " sites · 100+ delivered";
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

      window.location.href = mailto(service + " — project inquiry", body);
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
