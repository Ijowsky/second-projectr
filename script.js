// Generate stars function
function generateStars(rating) {
  let stars = ""
  for (let i = 0; i < rating; i++) {
    stars += '<i class="fas fa-star"></i>'
  }
  return stars
}

// Render product card
function renderProductCard(wreath) {
  return `
        <div class="product-card">
            <div class="product-image">
                <img src="${wreath.image}" alt="${wreath.name}" loading="lazy">
            </div>
            <div class="product-content">
                <span class="product-category">${wreath.category}</span>
                <h4 class="product-title">${wreath.name}</h4>
                <p class="product-description">${wreath.description}</p>
                <div class="product-rating">
                    ${generateStars(wreath.rating)}
                    <span>(${wreath.rating})</span>
                </div>
                <div class="product-price">${wreath.price} ₽</div>
            </div>
        </div>
    `
}

// Load featured products on home page
function loadFeaturedProducts() {
  const featuredContainer = document.getElementById("featuredProducts")
  const featuredWreaths = [
    // Declare featuredWreaths variable here
    {
      name: "Wreath 1",
      category: "Category 1",
      description: "Description 1",
      rating: 4,
      price: 1000,
      image: "image1.jpg",
    },
    {
      name: "Wreath 2",
      category: "Category 2",
      description: "Description 2",
      rating: 5,
      price: 1500,
      image: "image2.jpg",
    },
    // Add more wreaths as needed
  ]

  if (featuredContainer) {
    featuredContainer.innerHTML = featuredWreaths.map((wreath) => renderProductCard(wreath)).join("")
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProducts()

  // Smooth scrolling for anchor links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Add scroll effect to header
  const header = document.querySelector(".header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.transform = "translateY(-100%)"
    } else {
      header.style.transform = "translateY(0)"
    }

    lastScrollTop = scrollTop
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(".feature-card, .product-card, .section-title")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Add hover effects to product cards
  const productCards = document.querySelectorAll(".product-card")
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Phone number click tracking
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
  phoneLinks.forEach((link) => {
    link.addEventListener("click", function () {
      console.log("Phone number clicked:", this.href)
    })
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})
