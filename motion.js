const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const hero = document.querySelector(".hero");
const layers = [...hero.querySelectorAll("[data-depth]")];
let queued = false;
function update() {
  queued = false;
  const offset = Math.min(220, Math.max(0, -hero.getBoundingClientRect().top));
  for (const layer of layers) {
    const skew = layer.classList.contains("hero-lines") ? " skewX(-20deg)" : "";
    layer.style.transform = reduceMotion.matches ? "" : "translate3d(0," + offset * Number(layer.dataset.depth) + "px,0)" + skew;
  }
}
function requestUpdate() {
  if (queued || hero.getBoundingClientRect().bottom <= 0) return;
  queued = true;
  requestAnimationFrame(update);
}
addEventListener("scroll", requestUpdate, { passive: true });
reduceMotion.addEventListener("change", update);
update();
