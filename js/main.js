/* ============================================================
   RIFT SMP - Main Script
   ============================================================ */

(function () {
  "use strict";

  const SERVER_IP = "riftsmp.fun";
  const DISCORD_LINK = "https://discord.gg/FycpnfvW";

  /* ---------- Helpers ---------- */
  function $(sel) {
    return document.querySelector(sel);
  }

  function getScrollY() {
    return window.pageYOffset ? window.pageYOffset : window.scrollY;
  }

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
    }, 2200);
  }

  /* ---------- Copy IP ---------- */
  function copyIp(button) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(SERVER_IP).then(function () {
        showToast("IP copied: " + SERVER_IP);
      });
    } else {
      const temp = document.createElement("textarea");
      temp.value = SERVER_IP;
      temp.style.position = "fixed";
      temp.style.opacity = "0";
      document.body.appendChild(temp);
      temp.select();
      try {
        document.execCommand("copy");
        showToast("IP copied: " + SERVER_IP);
      } catch (err) {
        showToast("Server IP: " + SERVER_IP);
      }
      document.body.removeChild(temp);
    }
    // Press animation
    if (button) {
      button.style.transform = "scale(0.96)";
      setTimeout(function () {
        button.style.transform = "";
      }, 150);
    }
  }

  const copyIpBtn = $("#copyIpBtn");
  const footerCopyIp = $("#footerCopyIp");
  if (copyIpBtn) copyIpBtn.addEventListener("click", function () { copyIp(this); });
  if (footerCopyIp) footerCopyIp.addEventListener("click", function () { copyIp(this); });

  /* ---------- Navbar: scroll shadow ---------- */
  const navbar = $(".navbar");
  const onScroll = function () {
    if (getScrollY() > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");

  function closeMenu() {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.classList.toggle("open", isOpen);
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.tagName === "A") closeMenu();
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const linkItems = document.querySelectorAll(".nav-link");

  function highlightNav() {
    let current = "home";
    const pos = getScrollY() + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (pos >= top && pos < bottom) current = section.id;
    });

    linkItems.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
        if (window.innerWidth < 861) closeMenu();
      }
    });
  }
  window.addEventListener("scroll", highlightNav, { passive: true });

  /* ---------- Shop tabs ---------- */
  const tabs = document.querySelectorAll(".shop-tab");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("active"); });
      tab.classList.add("active");

      const target = tab.getAttribute("data-tab");
      const ranks = $("#tab-ranks");
      const money = $("#tab-money");

      if (target === "ranks") {
        ranks.classList.remove("hidden");
        money.classList.add("hidden");
      } else {
        money.classList.remove("hidden");
        ranks.classList.add("hidden");
      }
    });
  });

  /* ---------- Buy buttons ---------- */
  const buyButtons = document.querySelectorAll(".btn-buy");
  buyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.getAttribute("data-item");
      const msg =
        "Hi RIFT SMP! I would like to buy: " + item + ". Please guide me through the payment.";
      const link =
        DISCORD_LINK + "?text=" + encodeURIComponent(msg);
      window.open(link, "_blank");
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".feature-card, .shop-card, .section-title, .section-desc");

  function reveal() {
    const trigger = window.innerHeight - 60;
    revealEls.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < trigger && !el.classList.contains("visible")) {
        el.classList.add("visible");
      }
    });
  }

  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  window.addEventListener("scroll", reveal, { passive: true });
  reveal();

  /* Expose for console debugging */
  window.RIFTSMP = {
    serverIp: SERVER_IP,
    discord: DISCORD_LINK,
    copyIp: copyIp
  };
})();