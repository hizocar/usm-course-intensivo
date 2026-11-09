/*
 * Grades page: each team's result stays hidden until someone presses its
 * Reveal button. This only keeps grades out of sight at a glance; the page
 * still contains them, so it is not access control.
 *
 *   <div class="hz-team"> … <button class="hz-reveal">Reveal</button> … <div class="hz-revealed" hidden>…</div></div>
 */
(function () {
  function enhance() {
    document.querySelectorAll("button.hz-reveal:not([data-ready])").forEach((btn) => {
      btn.dataset.ready = "1";
      const box = btn.closest(".hz-team");
      const result = box ? box.querySelector(".hz-revealed") : btn.nextElementSibling;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        btn.textContent = open ? "Reveal" : "Hide";
        result.hidden = open;
      });
    });
  }

  if (typeof document$ !== "undefined") document$.subscribe(enhance);
  else document.addEventListener("DOMContentLoaded", enhance);
})();
