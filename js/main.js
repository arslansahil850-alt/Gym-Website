
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  const yearElements = document.querySelectorAll("#current-year, .current-year");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.setAttribute("aria-expanded", "false");
    answer.hidden = true;

    question.addEventListener("click", () => {
      const shouldOpen = question.getAttribute("aria-expanded") !== "true";

      faqItems.forEach((otherItem) => {
        const otherQuestion = otherItem.querySelector(".faq-question");
        const otherAnswer = otherItem.querySelector(".faq-answer");

        if (otherQuestion && otherAnswer) {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherAnswer.hidden = true;
          otherItem.classList.remove("is-open");
        }
      });

      if (shouldOpen) {
        question.setAttribute("aria-expanded", "true");
        answer.hidden = false;
        item.classList.add("is-open");
      }
    });
  });

  const bmiForm = document.querySelector("#bmi-form");

  if (bmiForm) {
    bmiForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const heightInput = bmiForm.querySelector("#bmi-height");
      const weightInput = bmiForm.querySelector("#bmi-weight");
      const result = document.querySelector("#bmi-result");
      const message = document.querySelector("#bmi-message");

      if (!heightInput || !weightInput || !result) return;

      const height = Number(heightInput.value);
      const weight = Number(weightInput.value);

      if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
        result.textContent = "Enter a valid height and weight.";
        if (message) message.textContent = "";
        return;
      }

      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);

      result.textContent = `Your BMI: ${bmi.toFixed(1)}`;

      if (message) {
        if (bmi < 18.5) {
          message.textContent = "BMI category: Underweight";
        } else if (bmi < 25) {
          message.textContent = "BMI category: Healthy weight";
        } else if (bmi < 30) {
          message.textContent = "BMI category: Overweight";
        } else {
          message.textContent = "BMI category: Obesity range";
        }

        message.textContent += " — BMI is a general screening measure, not a diagnosis.";
      }
    });
  }

  const membershipButtons = document.querySelectorAll("[data-plan]");
  const planSelect = document.querySelector("#contact-plan");

  membershipButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;

      if (planSelect && plan) {
        planSelect.value = plan;
      }
    });
  });

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (formStatus) {
      formStatus.textContent =
        "Thank you! We have received your message successfully. We will get back to you soon.";
      formStatus.classList.add("success-message");
      formStatus.setAttribute("role", "status");
    }

    contactForm.reset();
  });
}

});