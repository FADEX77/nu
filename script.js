document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonials.length > 0 && prevBtn && nextBtn) {
    let currentTestimonial = 0

    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none"
      }
    })

    // Show next testimonial
    nextBtn.addEventListener("click", () => {
      testimonials[currentTestimonial].style.display = "none"
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      testimonials[currentTestimonial].style.display = "block"
    })

    // Show previous testimonial
    prevBtn.addEventListener("click", () => {
      testimonials[currentTestimonial].style.display = "none"
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
      testimonials[currentTestimonial].style.display = "block"
    })
  }

  // University Search and Filter
  const universitySearch = document.getElementById("universitySearch")
  const locationFilter = document.getElementById("locationFilter")
  const universityCards = document.querySelectorAll(".university-card[data-location]")

  if (universitySearch && locationFilter && universityCards.length > 0) {
    const filterUniversities = () => {
      const searchTerm = universitySearch.value.toLowerCase()
      const locationValue = locationFilter.value.toLowerCase()

      universityCards.forEach((card) => {
        const universityName = card.querySelector("h3").textContent.toLowerCase()
        const universityLocation = card.getAttribute("data-location").toLowerCase()

        const matchesSearch = universityName.includes(searchTerm)
        const matchesLocation = locationValue === "" || universityLocation === locationValue

        if (matchesSearch && matchesLocation) {
          card.style.display = "grid"
        } else {
          card.style.display = "none"
        }
      })
    }

    universitySearch.addEventListener("input", filterUniversities)
    locationFilter.addEventListener("change", filterUniversities)
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const university = document.getElementById("university").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // In a real application, you would send this data to a server
      // For this demo, we'll just show a success message
      alert(
        `Thank you, ${name}! Your message has been sent. We will contact you soon regarding ${university ? university : "your inquiry"}.`,
      )

      // Reset form
      contactForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navLinks && navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          menuToggle.classList.remove("active")
        }
      }
    })
  })
})

