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

	// Form submission handling
	const form = document.querySelector("form");
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		// Form validation would go here

		// For demo purposes, just show an alert
		alert(
			"Thank you for your partner application! Our team will contact you shortly."
		);
		closeModal();
	});
});
