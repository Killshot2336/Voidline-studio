(function () {
  if (typeof gsap === "undefined") return;

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.to(".reveal-nav", { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" });

  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
    .to(".hero-title", { autoAlpha: 1, y: 0, duration: 0.9 }, 0.08)
    .to(".hero-lines span", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.22)
    .to(".hero-copy-block", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.48)
    .to(".hero-actions-block", { autoAlpha: 1, y: 0, duration: 0.75 }, 0.62);

  if (typeof ScrollTrigger !== "undefined") {
    gsap.utils.toArray(".reveal-up").forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 36 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });

    gsap.utils.toArray(".reveal-group").forEach((group) => {
      const items = group.querySelectorAll(".reveal-item");
      gsap.fromTo(items, { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 88%", once: true }
      });
    });
  }

  document.querySelectorAll(".magnetic").forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(button, { x: x * 0.14, y: y * 0.14, duration: 0.25, ease: "power2.out" });
    });
    button.addEventListener("mouseleave", () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.35, ease: "power3.out" });
    });
  });

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 8;
      const rotateX = (0.5 - py) * 6;
      gsap.to(card, { rotateY, rotateX, y: -6, duration: 0.22, ease: "power2.out", transformPerspective: 900 });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, y: 0, duration: 0.35, ease: "power3.out" });
    });
  });
})();
