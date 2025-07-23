/** @format */

// Mobile menu toggle
document.getElementById("menuBtn").addEventListener("click", function () {
	const menu = document.getElementById("mobileMenu");
	menu.classList.toggle("hidden");
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".carousel-indicator");

function showSlide(index) {
	// Hide all slides
	slides.forEach((slide) => slide.classList.remove("active"));
	indicators.forEach((indicator) => indicator.classList.remove("bg-primary"));

	// Show the selected slide
	slides[index].classList.add("active");
	indicators[index].classList.add("bg-primary");

	currentSlide = index;
}

// Initialize the carousel
showSlide(currentSlide);

// Add click events to indicators
indicators.forEach((indicator, index) => {
	indicator.addEventListener("click", () => {
		showSlide(index);
	});
});

// Auto-rotate slides
setInterval(() => {
	currentSlide = (currentSlide + 1) % slides.length;
	showSlide(currentSlide);
}, 5000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});

		// Close mobile menu if open
		document.getElementById("mobileMenu").classList.add("hidden");
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const openButton = document.getElementById("openModal");
	const closeButton = document.getElementById("closeModal");
	const modal = document.getElementById("modal");
	const backdrop = document.getElementById("modalBackdrop");

	function openModal() {
		// Show backdrop with fade-in animation
		backdrop.classList.remove("hidden");
		setTimeout(() => {
			backdrop.classList.remove("opacity-0");
		}, 10);

		// Show modal
		modal.classList.remove("hidden");

		// Prevent scrolling on body
		document.body.style.overflow = "hidden";
	}

	function closeModal() {
		// Hide backdrop with fade-out
		backdrop.classList.add("opacity-0");
		setTimeout(() => {
			backdrop.classList.add("hidden");
		}, 300);

		// Hide modal
		modal.classList.add("hidden");

		// Restore scrolling on body
		document.body.style.overflow = "auto";
	}

	openButton.addEventListener("click", openModal);
	closeButton.addEventListener("click", closeModal);

	// Close modal when clicking on backdrop
	backdrop.addEventListener("click", closeModal);

	// Close modal when pressing Escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !modal.classList.contains("hidden")) {
			closeModal();
		}
	});

	// Partner form submission handling (modal form)
	const partnerForm = document.getElementById("partnerForm");
	partnerForm.addEventListener("submit", (e) => {
		e.preventDefault();
		sendPartnerEmail(partnerForm);
	});

	// Contact form submission handling
	const contactForm = document.getElementById("contactForm");
	contactForm.addEventListener("submit", (e) => {
		e.preventDefault();
		sendContactEmail(contactForm);
	});

	// Email sending functions
	function sendPartnerEmail(form) {
		const name = form.querySelector("#name").value;
		const mobile = form.querySelector("#mobile").value;
		const email = form.querySelector("#email").value;
		const businessType = form.querySelector("#businessType").value;
		const message = form.querySelector("#message").value;

		const templateParams = {
			to_name: "GramPay Team",
			from_name: name,
			from_email: email,
			from_mobile: mobile,
			business_type: businessType,
			message: message,
			subject: "New Partner Application",
		};

		emailjs.send("service_b7sb6lo", "template_7nz7thr", templateParams).then(
			function () {
				alert(
					"Thank you for your partner application! Our team will contact you shortly."
				);
				form.reset();
				closeModal();
			},
			function (error) {
				console.error("Email sending failed:", error);
				alert(
					"Sorry, there was an error sending your application. Please try again later."
				);
			}
		);
	}

	function sendContactEmail(form) {
		const name = form.querySelector("#cname").value;
		const email = form.querySelector("#cemail").value;
		const subject = form.querySelector("#subject").value;
		const message = form.querySelector("#message").value;

		const templateParams = {
			to_name: "GramPay Team",
			from_name: name,
			from_email: email,
			subject: subject,
			message: message,
		};

		emailjs.send("service_b7sb6lo", "template_369nn8t", templateParams).then(
			function () {
				alert("Thank you for your message! We will get back to you soon.");
				form.reset();
			},
			function (error) {
				console.error("Email sending failed:", error);
				alert(
					"Sorry, there was an error sending your message. Please try again later."
				);
			}
		);
	}
});
