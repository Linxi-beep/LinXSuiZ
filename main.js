(function () {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuToggle = document.getElementById("menuToggle");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");

  // Header scroll state
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("open");
    document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Custom cursor (desktop)
  if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorRing) {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = "a, button, .collection-card, .lookbook-item";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(
    ".section-header, .collection-card, .about-visual, .about-content, .lookbook-item, .cta-inner, .contact-info, .contact-form"
  );
  revealEls.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));

  // Contact form (mailto fallback)
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(`【霖兮官网留言】来自 ${name}`);
    const body = encodeURIComponent(
      `姓名：${name}\n邮箱：${email}\n\n留言内容：\n${message}`
    );
    window.location.href = `mailto:fujingqi03@gmail.com?subject=${subject}&body=${body}`;

    formNote.hidden = false;
    contactForm.reset();
  });
})();
