/* Névé — petit script commun : menu mobile, apparition douce au défilement, formulaire de contact. */
(function () {
  var root = document.documentElement;
  root.classList.remove("no-js");

  // Apparition douce des blocs marqués "reveal" (une seule fois, sans rien bloquer)
  var items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) root.classList.remove("js");
  if ("IntersectionObserver" in window && items.length) {
    root.classList.add("js", "reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  // Bandeau qui défile : avance en continu (le survol ne l'arrête pas),
  // un clic sur un nom d'événement l'amène sur cet événement,
  // le nom de l'événement affiché s'allume. Arrêt hors écran.
  var marquee = document.querySelector(".marquee");
  if (marquee) {
    var track = marquee.querySelector(".marquee-track");
    var group = marquee.querySelector(".marquee-group");
    var cards = group.querySelectorAll(".m-card");
    var buttons = document.querySelectorAll(".m-events button");
    var videos = marquee.querySelectorAll("video");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var SPEED = 45;              // pixels par seconde
    var x = 0, shown = -1, loopW = 0, visible = true, last = 0, jump = null, current = "";

    marquee.classList.add("is-js");
    var measure = function () { loopW = group.offsetWidth; };
    measure();
    window.addEventListener("resize", measure);

    var highlight = function () {
      var probe = x + 40, key = "";
      for (var i = 0; i < cards.length; i++) {
        var c = cards[i];
        if (c.offsetLeft + c.offsetWidth > probe) { key = c.getAttribute("data-event"); break; }
      }
      if (key && key !== current) {
        current = key;
        buttons.forEach(function (b) {
          var on = b.getAttribute("data-event") === key;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
    };
    var render = function () {
      track.style.transform = "translate3d(" + (-x).toFixed(1) + "px,0,0)";
      highlight();
    };
    var ease = function (t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };

    var frame = function (now) {
      var dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      if (jump) {
        var t = Math.min((now - jump.start) / jump.dur, 1);
        x = jump.from + (jump.to - jump.from) * ease(t);
        if (t >= 1) jump = null;
      } else if (visible && !reduce) {
        x += SPEED * dt;
      }
      if (loopW > 0) { while (x >= loopW) { x -= loopW; if (jump) { jump.from -= loopW; jump.to -= loopW; } } }
      if (x !== shown) { shown = x; render(); }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        var key = b.getAttribute("data-event");
        var first = group.querySelector('.m-card[data-event="' + key + '"]');
        if (!first) return;
        var target = Math.max(first.offsetLeft - 24, 0);
        if (target < x) target += loopW;        // toujours vers l'avant, sans retour en arrière
        jump = { from: x, to: target, start: performance.now(), dur: reduce ? 1 : 900 };
      });
    });

    var setPlaying = function (on) {
      visible = on;
      videos.forEach(function (v) {
        if (on && !reduce) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) { setPlaying(entries[0].isIntersecting); }).observe(marquee);
    } else { setPlaying(true); }
  }

  // Menu mobile : ouvre / ferme la liste des rubriques
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("menu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Fermer" : "Menu";
    });
  }

  // Formulaire de contact : envoi par EmailJS (mêmes identifiants que l'ancien site)
  var EMAILJS = {
    service_id: "service_zzznobb",
    template_id: "template_3n4wlcv",
    user_id: "eig7-6Zgx5-XNLWIH"
  };
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.website && form.website.value) return; // champ piège anti-robots
    var data = new FormData(form);
    data.append("service_id", EMAILJS.service_id);
    data.append("template_id", EMAILJS.template_id);
    data.append("user_id", EMAILJS.user_id);
    button.disabled = true;
    status.className = "form-status";
    status.textContent = "Envoi en cours…";
    fetch("https://api.emailjs.com/api/v1.0/email/send-form", { method: "POST", body: data })
      .then(function (res) {
        if (!res.ok) throw new Error("EmailJS " + res.status);
        form.reset();
        status.className = "form-status ok";
        status.textContent = "Merci, votre message a bien été envoyé.";
      })
      .catch(function () {
        status.className = "form-status err";
        status.textContent = "L'envoi n'a pas fonctionné. Écrivez-nous directement à contact@neve.paris ou appelez le 01 43 48 38 12.";
      })
      .then(function () { button.disabled = false; });
  });
})();
