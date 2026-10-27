const products = [
  {
    name: "Samsung Crystal 4K Smart TV",
    category: "TVs",
    price: "₹32,990",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=85",
    description: "Immersive 4K picture with a clean, modern design."
  },
  {
    name: "LG OLED 4K TV",
    category: "TVs",
    price: "₹89,990",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=900&q=85",
    description: "Deep contrast and cinematic colour for movie nights."
  },
  {
    name: "Samsung QLED Smart TV",
    category: "TVs",
    price: "₹54,990",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=900&q=85",
    description: "Bright, vivid entertainment for the whole family."
  },
  {
    name: "LG 1.5 Ton Split AC",
    category: "Air Conditioners",
    price: "₹39,490",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1631545806609-7b7a1f7a4b48?auto=format&fit=crop&w=900&q=85",
    description: "Comfortable cooling with a sleek indoor unit."
  },
  {
    name: "Haier 1.5 Ton Inverter AC",
    category: "Air Conditioners",
    price: "₹34,990",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=85",
    description: "Efficient cooling for everyday comfort."
  },
  {
    name: "Samsung WindFree AC",
    category: "Air Conditioners",
    price: "₹48,990",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1631545806609-7b7a1f7a4b48?auto=format&fit=crop&w=900&q=85",
    description: "Gentle airflow for a more relaxing room."
  },
  {
    name: "LG Front Load Washing Machine",
    category: "Washing Machines",
    price: "₹31,990",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85",
    description: "Thoughtful wash cycles for everyday laundry."
  },
  {
    name: "Samsung EcoBubble Washer",
    category: "Washing Machines",
    price: "₹28,490",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85",
    description: "A practical, family-friendly laundry companion."
  },
  {
    name: "Haier 8 kg Top Load Washer",
    category: "Washing Machines",
    price: "₹18,990",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=900&q=85",
    description: "Simple controls and generous capacity."
  },
  {
    name: "Samsung Double Door Refrigerator",
    category: "Refrigerators",
    price: "₹36,990",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85",
    description: "Flexible storage for fresh everyday essentials."
  },
  {
    name: "LG Convertible Refrigerator",
    category: "Refrigerators",
    price: "₹42,990",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85",
    description: "Adaptable space for changing family needs."
  },
  {
    name: "Haier 3-Star Refrigerator",
    category: "Refrigerators",
    price: "₹24,990",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=900&q=85",
    description: "Reliable everyday cooling with a modern finish."
  }
];

const moneyValue = product =>
  Number(product.price.replace(/[₹,]/g, ""));

const liked = new Set([0, 1, 3, 6]);

const popularGrid = document.getElementById("popularGrid");
const allGrid = document.getElementById("allProductsGrid");
const toast = document.getElementById("toast");

let toastTimer;

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function applianceIcon() {
  return `
    <svg viewBox="0 0 80 80" fill="none"
         stroke="currentColor" stroke-width="2">
      <rect x="12" y="12" width="56" height="42" rx="5"/>
      <path d="M30 66h20M40 54v12M18 20h44"/>
      <circle cx="24" cy="16" r="1" fill="currentColor"/>
    </svg>
  `;
}

function productCard(product, index) {
  const likedNow = liked.has(index);

  return `
    <article class="product-card">
      <div class="product-img">
        <img
          loading="lazy"
          src="${product.image}"
          alt="${product.name}"
          onerror="
            this.classList.add('bad-image');
            this.parentElement.classList.add('no-img');
          "
        >

        <div class="img-placeholder">
          ${applianceIcon()}
        </div>

        <span class="tag">${product.category}</span>

        <button
          class="like ${likedNow ? "liked" : ""}"
          data-like="${index}"
          aria-label="${likedNow ? "Remove from" : "Add to"} favourites"
          aria-pressed="${likedNow}"
        >
          ${likedNow ? "♥" : "♡"}
        </button>
      </div>

      <div class="product-info">
        <div class="rating">
          ★ ${product.rating}
          <span>customer rating</span>
        </div>

        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="product-bottom">
          <span class="price">${product.price}</span>
          <button class="mini-btn" data-support-product="${index}">
            Enquire
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderPopular() {
  if (!popularGrid) return;

  const ids = [...liked].slice(0, 4);

  popularGrid.innerHTML = ids
    .map(index => productCard(products[index], index))
    .join("");
}

function renderAll() {
  if (!allGrid) return;

  const searchInput = document.getElementById("productSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortProducts");

  const query = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  const category = categoryFilter
    ? categoryFilter.value
    : "All";

  const sort = sortSelect
    ? sortSelect.value
    : "popular";

  let rows = products
    .map((product, index) => ({ ...product, index }))
    .filter(product =>
      (category === "All" || product.category === category) &&
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(query)
    );

  if (sort === "low") {
    rows.sort((a, b) => moneyValue(a) - moneyValue(b));
  }

  if (sort === "high") {
    rows.sort((a, b) => moneyValue(b) - moneyValue(a));
  }

  if (sort === "popular") {
    rows.sort(
      (a, b) =>
        Number(liked.has(b.index)) -
        Number(liked.has(a.index))
    );
  }

  allGrid.innerHTML = rows.length
    ? rows
        .map(product => productCard(product, product.index))
        .join("")
    : `<div class="empty">
         No products found. Try another search or category.
       </div>`;
}

function renderProducts() {
  renderPopular();
  renderAll();
}

function showPage(page) {
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  const pageId =
    page === "products"
      ? "productsPage"
      : page === "thankyou"
        ? "thankyouPage"
        : "homePage";

  const targetPage = document.getElementById(pageId);

  if (!targetPage) return;

  targetPage.classList.add("active");

  document.querySelectorAll("[data-page-link]").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.pageLink === page
    );
  });

  if (page === "products") {
    renderAll();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openSupport(productIndex) {
  const modal = document.getElementById("supportModal");

  if (!modal) return;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  if (productIndex !== undefined && products[productIndex]) {
    const product = products[productIndex];
    const productSelect = document.getElementById("product");
    const subjectInput = document.getElementById("subject");

    // Set the product only if that field exists in the HTML.
    if (productSelect) {
      productSelect.value = product.name;
    }

    // The product name is included in the Subject.
    if (subjectInput) {
      subjectInput.value = "Question about " + product.name;
    }
  }

  setTimeout(() => {
    document.getElementById("customerName")?.focus();
  }, 100);
}

function closeSupport() {
  document.getElementById("supportModal")?.classList.remove("open");
  document.body.style.overflow = "";
}

// Handle favourites, enquiry buttons and navigation.
document.addEventListener("click", event => {
  const likeButton = event.target.closest("[data-like]");

  if (likeButton) {
    const index = Number(likeButton.dataset.like);

    if (liked.has(index)) {
      liked.delete(index);
    } else {
      liked.add(index);
    }

    renderProducts();
    return;
  }

  const enquiryButton = event.target.closest("[data-support-product]");

  if (enquiryButton) {
    openSupport(Number(enquiryButton.dataset.supportProduct));
    return;
  }

  const navigationLink = event.target.closest("[data-go]");

  if (navigationLink) {
    event.preventDefault();

    const page = navigationLink.dataset.go;

    showPage(page);
    history.replaceState(null, "", "#" + page);
    return;
  }

  const pageLink = event.target.closest("[data-page-link]");

  if (pageLink) {
    event.preventDefault();

    const page = pageLink.dataset.pageLink;

    showPage(page);
    history.replaceState(null, "", "#" + page);
  }
});

// Support form buttons.
document.getElementById("supportButton")
  ?.addEventListener("click", () => openSupport());

document.getElementById("heroSupport")
  ?.addEventListener("click", () => openSupport());

document.getElementById("footerSupport")
  ?.addEventListener("click", event => {
    event.preventDefault();
    openSupport();
  });

document.getElementById("closeModal")
  ?.addEventListener("click", closeSupport);

document.getElementById("supportModal")
  ?.addEventListener("click", event => {
    if (event.target.id === "supportModal") {
      closeSupport();
    }
  });

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSupport();
  }
});

// Search, filter and sorting.
document.getElementById("productSearch")
  ?.addEventListener("input", renderAll);

document.getElementById("categoryFilter")
  ?.addEventListener("change", renderAll);

document.getElementById("sortProducts")
  ?.addEventListener("change", renderAll);

// IMPORTANT:
// Do not prevent the support form's default submission.
// Its Salesforce Web-to-Case action must receive the form data.

document.getElementById("supportForm")
  ?.addEventListener("submit", event => {
    if (!event.currentTarget.reportValidity()) {
      event.preventDefault();
    }
  });

// Handle direct navigation by URL hash.
window.addEventListener("hashchange", () => {
  const page = location.hash.slice(1);

  if (page === "products" || page === "home") {
    showPage(page);
  }
});

// Render product cards when the page loads.
renderProducts();

const initialPage = location.hash.slice(1);

if (initialPage === "products" || initialPage === "home") {
  showPage(initialPage);
}