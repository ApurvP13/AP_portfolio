import { introPageRender } from "./introAnimation.js";
import { typeEffect } from "./typewriter.js";
// import { createStickerAnimation } from "./stickerAnimation.js";
console.log(document.body.scrollHeight, window.innerHeight);
introPageRender();
typeEffect;
// setTimeout(createStickerAnimation, "8000");

// Add to index.js or create new file
const projectCards = document.querySelectorAll(".project-card");

// Add click event to each card
projectCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    // Prevent click from propagating to document
    e.stopPropagation();

    // Close all other cards
    projectCards.forEach((otherCard) => {
      if (otherCard !== card) {
        otherCard.classList.remove("expanded");
      }
    });

    // Toggle expanded class on clicked card
    this.classList.toggle("expanded");
  });
});

// Add click event to document to close expanded cards when clicking outside
document.addEventListener("click", function () {
  projectCards.forEach((card) => {
    card.classList.remove("expanded");
  });
});

// Prevent closing when clicking on links inside cards
const links = document.querySelectorAll(".project-card a");
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

document.getElementById("info-sec-btn1").addEventListener("click", function () {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("info-sec-btn2").addEventListener("click", function () {
  document.getElementById("hire").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("take-top").addEventListener("click", function () {
  document
    .getElementById("main-content")
    .scrollIntoView({ behavior: "smooth" });
});

// ---------------------------- FORM SUBMISSION ---------------------------

let lastSubmission = 0;
const minDelay = 50000;

document.addEventListener("DOMContentLoaded", function () {
  // Load EmailJS SDK
  (function () {
    emailjs.init("cWucX-sBxTY9gSOsd"); // Add your public key here
  })();

  // Get the form element
  const form = document.getElementById("contact-form");
  const submitButton = document.getElementById("form-submit");

  // Add submit event listener
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const now = Date.now();
    if (now - lastSubmission < minDelay) {
      alert("Please wait before submitting again");
      return;
    }

    lastSubmission = now;

    // Disable the button during submission
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = document.getElementById("user-text").value;

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    // Send the email
    emailjs.send("service_h9w8gk2", "template_amqmpx4", templateParams).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
        form.reset();
        submitButton.textContent = "Message Sent!";
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Send Message <i data-lucide="send"></i>';
        }, 3000);
      },
      function (error) {
        console.log("FAILED...", error);
        submitButton.textContent = "Failed to send. Try again.";
        setTimeout(() => {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Send Message <i data-lucide="send"></i>';
        }, 3000);
      }
    );
  });
});

// ---------------------------- FORM SUBMISSION ---------------------------

const certCards = document.querySelectorAll(".cert-cards");
const image = document.querySelector(".floatingImage");

let followTween;
let lastX = 0;
let lastY = 0;

certCards.forEach((card) => {
  const text = card.querySelector(".hoverText");

  text.addEventListener("mouseenter", (e) => {
    const newSrc = text.dataset.image;
    if (newSrc) image.src = newSrc;
    text.style.zIndex = 28;
    text.style.borderBottom = "1px solid white";

    const rect = text.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;

    lastX = centerX;
    lastY = centerY;

    gsap.set(image, {
      left: centerX,
      top: centerY,
      opacity: 0,
      scale: 0.5,
      rotation: 0,
      visibility: "visible",
      xPercent: -50, // ✅ centers X
      yPercent: -50,
    });

    gsap.to(image, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  text.addEventListener("mousemove", (e) => {
    const dx = e.pageX - lastX;
    const dy = e.pageY - lastY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (followTween) followTween.kill();

    followTween = gsap.to(image, {
      left: e.pageX,
      top: e.pageY,
      rotation: angle * 0.03,
      duration: 0.3,
      ease: "power3.out",
      onUpdate: () => {
        lastX = parseFloat(image.style.left);
        lastY = parseFloat(image.style.top);
      },
    });
  });

  text.addEventListener("mouseleave", () => {
    if (followTween) followTween.kill();
    text.style.zIndex = 30;
    text.style.borderBottom = "none";

    gsap.to(image, {
      opacity: 0,
      scale: 0.95,
      rotation: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(image, { visibility: "hidden" });
      },
    });
  });
});
