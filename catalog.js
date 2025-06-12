const wreaths = [] // Declare wreaths variable
let filteredWreaths = [...wreaths]

// DOM elements
const searchInput = document.getElementById("searchInput")
const categoryFilter = document.getElementById("categoryFilter")
const priceFilter = document.getElementById("priceFilter")
const catalogGrid = document.getElementById("catalogGrid")
const resultsCount = document.getElementById("resultsCount")

// Initialize catalog
document.addEventListener("DOMContentLoaded", () => {
  renderWreaths(filteredWreaths)
  updateResultsCount()

  // Add event listeners
  if (searchInput) searchInput.addEventListener("input", filterWreaths)
  if (categoryFilter) categoryFilter.addEventListener("change", filterWreaths)
  if (priceFilter) priceFilter.addEventListener("change", filterWreaths)
})

// Filter wreaths function
function filterWreaths() {
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : ""
  const selectedCategory = categoryFilter ? categoryFilter.value : "all"
  const selectedPriceRange = priceFilter ? priceFilter.value : "all"

  filteredWreaths = wreaths.filter((wreath) => {
    const matchesSearch = wreath.name.toLowerCase().includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || wreath.category === selectedCategory

    let matchesPrice = true
    if (selectedPriceRange === "low") {
      matchesPrice = wreath.price < 3000
    } else if (selectedPriceRange === "medium") {
      matchesPrice = wreath.price >= 3000 && wreath.price < 5000
    } else if (selectedPriceRange === "high") {
      matchesPrice = wreath.price >= 5000
    }

    return matchesSearch && matchesCategory && matchesPrice
  })

  renderWreaths(filteredWreaths)
  updateResultsCount()
}

// Render wreaths function
function renderWreaths(wreathsToRender) {
  if (!catalogGrid) return

  if (wreathsToRender.length === 0) {
    catalogGrid.innerHTML = `
            <div class="no-results">
                <h3>По вашему запросу ничего не найдено</h3>
                <p>Попробуйте изменить параметры поиска</p>
                <span class="btn btn-primary" onclick="resetFilters()">Сбросить фильтры</span>
            </div>
        `
    return
  }

  catalogGrid.innerHTML = wreathsToRender.map((wreath) => renderProductCard(wreath)).join("")

  // Re-observe new elements for animation
  const newCards = catalogGrid.querySelectorAll(".product-card")
  newCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"

    setTimeout(() => {
      card.style.opacity = "1"
      card.style.transform = "translateY(0)"
    }, 100)
  })
}

// Update results count
function updateResultsCount() {
  if (!resultsCount) return

  const count = filteredWreaths.length
  let text = `Найдено ${count}`

  if (count === 1) {
    text += " венок"
  } else if (count >= 2 && count <= 4) {
    text += " венка"
  } else {
    text += " венков"
  }

  resultsCount.textContent = text
}

// Reset filters function
function resetFilters() {
  if (searchInput) searchInput.value = ""
  if (categoryFilter) categoryFilter.value = "all"
  if (priceFilter) priceFilter.value = "all"
  filterWreaths()
}

function renderProductCard(wreath) {
  // Placeholder for renderProductCard function
  return `
        <div class="product-card">
            <h2>${wreath.name}</h2>
            <p>Категория: ${wreath.category}</p>
            <p>Цена: ${wreath.price}</p>
        </div>
    `
}
