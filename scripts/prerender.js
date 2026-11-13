#!/usr/bin/env node
/*
 * Prerender portfolio content from assets/site-data.js into index.html.
 *
 * The page ships fully rendered HTML so it works without JavaScript and is
 * readable by crawlers and link-preview bots. Run this after editing
 * assets/site-data.js:
 *
 *   node scripts/prerender.js
 *
 * Content is written between <!-- prerender:ID --> and <!-- /prerender:ID -->
 * markers inside index.html, so re-running is safe (idempotent).
 * No dependencies — plain Node.js.
 */
"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");

var ROOT = path.resolve(__dirname, "..");
var DATA_FILE = path.join(ROOT, "assets", "site-data.js");
var HTML_FILE = path.join(ROOT, "index.html");

/* ---------- Load data (site-data.js assigns window.SITE_DATA) ---------- */
var sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(DATA_FILE, "utf8"), sandbox, { filename: DATA_FILE });
var data = sandbox.window.SITE_DATA;
if (!data) throw new Error("window.SITE_DATA not defined in " + DATA_FILE);

var email = data.profile.email;

/* ---------- Helpers ---------- */
function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
    '<ul class="bullet-list">' +
    (items || [])
      .map(function (item) {
        return "<li>" + esc(item) + "</li>";
      })
      .join("") +
    "</ul>"
  );
}

function statusPill(c) {
  return '<span class="status-pill status-' + esc(c.status) + '">' + esc(c.statusLabel) + "</span>";
}

/* ---------- Section renderers ---------- */
function featuredService(s) {
  return (
    '<article class="service-card service-card--featured" id="service-' + esc(s.id) + '">' +
    '<h3 class="service-title">' + esc(s.name) + "</h3>" +
    '<p class="service-problem">' + esc(s.problem) + "</p>" +
    '<div class="service-label">What I deliver</div>' +
    listHtml(s.deliverables) +
    '<div class="service-label">Relevant systems</div>' +
    '<div class="tag-row">' + tagsHtml(s.tech) + "</div>" +
    '<a class="btn btn-ghost service-cta" href="' + esc(mailto(s.mailtoSubject)) + '">' + esc(s.cta) + "</a>" +
    "</article>"
  );
}

function moreService(s) {
  return (
    '<article class="service-card" id="service-' + esc(s.id) + '">' +
    '<h3 class="service-title">' + esc(s.name) + "</h3>" +
    '<p class="service-problem">' + esc(s.problem) + "</p>" +
    '<div class="service-label">What I deliver</div>' +
    listHtml((s.deliverables || []).slice(0, 4)) +
    '<div class="tag-row">' + tagsHtml(s.tech) + "</div>" +
    '<a class="text-link service-cta" href="' + esc(mailto(s.mailtoSubject)) + '">' + esc(s.cta) + " →</a>" +
    "</article>"
  );
}

function caseStudy(c) {
  return (
    '<article class="case-card" id="case-' + esc(c.id) + '">' +
    '<div class="case-meta"><span class="feat-tag">' + esc(c.category) + "</span>" + statusPill(c) + "</div>" +
    '<h3 class="feat-title">' + esc(c.title) + "</h3>" +
    '<p class="feat-desc"><strong>Context.</strong> ' + esc(c.context) + "</p>" +
    '<p class="feat-desc"><strong>Role.</strong> ' + esc(c.role) + "</p>" +
    '<div class="service-label">Approach</div>' +
    listHtml(c.approach) +
    '<p class="feat-desc"><strong>Challenges.</strong> ' + esc(c.challenges) + "</p>" +
    '<p class="feat-desc"><strong>Status / outcome.</strong> ' + esc(c.outcome) + "</p>" +
    (c.note ? '<p class="case-note">' + esc(c.note) + "</p>" : "") +
    '<div class="feat-stack">' + tagsHtml(c.stack) + "</div>" +
    '<a class="text-link" href="#contact">Discuss similar work →</a>' +
    "</article>"
  );
}

function archiveCard(c) {
  return (
    '<article class="feat-card archive-card">' +
    '<div class="case-meta"><span class="feat-tag">' + esc(c.category) + "</span>" + statusPill(c) + "</div>" +
    '<h3 class="feat-title">' + esc(c.title) + "</h3>" +
    '<p class="feat-desc">' + esc(c.context) + "</p>" +
    '<div class="feat-stack">' + tagsHtml(c.stack) + "</div>" +
    "</article>"
  );
}

function experienceItem(e) {
  return (
    '<div class="tl-item">' +
    '<div class="tl-dates">' + esc(e.dates) + "</div>" +
    '<h3 class="tl-title">' + esc(e.title) + "</h3>" +
    '<div class="tl-co">' + esc(e.company) + "</div>" +
    '<p class="tl-desc">' + esc(e.description) + "</p>" +
    "</div>"
  );
}

function educationCard(e) {
  return (
    '<div class="edu-card">' +
    '<div class="edu-years">' + esc(e.years) + "</div>" +
    '<div class="edu-degree">' + esc(e.degree) + "</div>" +
    '<div class="edu-school">' + esc(e.school) + "</div>" +
    "</div>"
  );
}

function capabilityCard(c) {
  return (
    '<div class="stack-card">' +
    '<div class="stack-title">' + esc(c.title) + "</div>" +
    '<p class="cap-summary">' + esc(c.summary) + "</p>" +
    '<div class="tag-row">' + tagsHtml(c.tags) + "</div>" +
    "</div>"
  );
}

function approachCard(a) {
  return (
    '<div class="approach-card">' +
    '<div class="approach-step">' + esc(a.step) + "</div>" +
    "<h3>" + esc(a.title) + "</h3>" +
    "<p>" + esc(a.text) + "</p>" +
    "</div>"
  );
}

function testimonialCard(t) {
  return (
    '<article class="ref-card">' +
    '<p class="ref-quote">' + esc(t.quote) + "</p>" +
    '<div class="ref-name">' + esc(t.name) + "</div>" +
    '<div class="ref-role">' + esc(t.role) + "</div>" +
    "</article>"
  );
}

var EXT_ICON =
  '<span class="ext" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>';

function wpItem(p) {
  return (
    '<a class="wp-item" href="' + esc(p.url) + '" target="_blank" rel="noopener noreferrer">' +
    '<span class="dot" aria-hidden="true"></span>' +
    '<span class="name">' + esc(p.name) + "</span>" +
    EXT_ICON +
    "</a>"
  );
}

function isFeatured(x) { return !!x.featured; }
function notFeatured(x) { return !x.featured; }
function each(list, fn) { return "\n" + (list || []).map(fn).join("\n") + "\n"; }

var sections = {
  servicesFeatured: each(data.services.filter(isFeatured), featuredService),
  servicesMore: each(data.services.filter(notFeatured), moreService),
  caseStudies: each(data.caseStudies.filter(isFeatured), caseStudy),
  projectArchive: each(data.caseStudies.filter(notFeatured), archiveCard),
  experienceList: each(data.experience, experienceItem),
  educationGrid: each(data.education, educationCard),
  capabilitiesGrid: each(data.capabilities, capabilityCard),
  approachGrid: each(data.approach, approachCard),
  referencesGrid: each(data.testimonials, testimonialCard),
  wpGrid: each(data.wpProjects, wpItem),
  wpCount: esc(data.wpProjects.length + " sites · 100+ delivered")
};

/* ---------- Inject into index.html ---------- */
var html = fs.readFileSync(HTML_FILE, "utf8");

Object.keys(sections).forEach(function (id) {
  var re = new RegExp("(<!-- prerender:" + id + " -->)[\\s\\S]*?(<!-- /prerender:" + id + " -->)");
  if (!re.test(html)) throw new Error("Missing prerender markers for #" + id + " in index.html");
  html = html.replace(re, function (_, open, close) {
    return open + sections[id] + close;
  });
});

// Keep the contact form's mailto target in sync with profile.email.
html = html.replace(/(id="inquiryForm" data-email=")[^"]*(")/, "$1" + esc(email) + "$2");

fs.writeFileSync(HTML_FILE, html);
console.log("Prerendered " + Object.keys(sections).length + " sections into " + path.relative(process.cwd(), HTML_FILE));
