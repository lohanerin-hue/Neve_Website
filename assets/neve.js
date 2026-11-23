/* Névé — petit script commun : menu mobile et formulaire de contact. Aucune animation. */
(function () {
  document.documentElement.classList.remove("no-js");

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
