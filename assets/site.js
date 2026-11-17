    // ==========================================================
    // EDIT THESE DETAILS WITH YOUR OWN INFORMATION
    // ==========================================================
    const SITE = {
      name: "Rosjos",
      whatsappNumber: "17029633767", // country code + number, digits only (no + or spaces)
      email: "admin@rosoen.com", // leave empty to hide email buttons until you add an address
      phone: "+1 702 963 3767"
    };
    // ==========================================================

    // Let CSS know JavaScript is running so scroll animations can start
    document.documentElement.classList.add("js");

    // Fill in details from the SITE block
    document.querySelectorAll('[data-bind="name"]').forEach(el => {
      el.textContent = SITE.name;
    });
    document.querySelectorAll('[data-bind="email"]').forEach(el => {
      el.textContent = SITE.email;
    });
    document.querySelectorAll('[data-bind="phone"]').forEach(el => {
      el.textContent = SITE.phone;
    });
    document.querySelectorAll('[data-bind="year"]').forEach(el => {
      el.textContent = new Date().getFullYear();
    });

    // WhatsApp links
    document.querySelectorAll('[data-whatsapp]').forEach(el => {
      const message = encodeURIComponent(el.dataset.whatsapp);
      el.href = `https://wa.me/${SITE.whatsappNumber}?text=${message}`;
      el.target = "_blank";
      el.rel = "noopener";
    });

    // Email links (hidden when no address is set)
    document.querySelectorAll('[data-email-link], [data-email-group]').forEach(el => {
      if (!SITE.email) {
        el.style.display = "none";
        return;
      }
      if (el.hasAttribute("data-email-link")) {
        const subject = encodeURIComponent(`Tutoring inquiry for ${SITE.name}`);
        el.href = `mailto:${SITE.email}?subject=${subject}`;
      }
    });

    // Phone links
    document.querySelectorAll('[data-phone-link]').forEach(el => {
      el.href = `tel:${SITE.phone.replace(/\s/g, "")}`;
    });

    // Mobile menu
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.getElementById("site-nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });

    // Header shadow once the page is scrolled
    const header = document.querySelector(".site-header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Reveal elements as they scroll into view
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add("in"));
    }
