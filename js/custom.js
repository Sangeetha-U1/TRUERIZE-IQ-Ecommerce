// =====================
// YEAR
// =====================
function getYear() {
    const el = document.querySelector("#displayYear");
    if (el) el.innerHTML = new Date().getFullYear();
}
getYear();

// =====================
// DARK MODE TOGGLE
// =====================
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // save preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}


// =====================
// LOAD THEME ON START
// =====================
(function () {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
})();
// =====================
// OWL CAROUSEL
// =====================
if (window.jQuery && $(".client_owl-carousel").length) {
    $(".client_owl-carousel").owlCarousel({
        loop: true,
        margin: 0,
        dots: false,
        nav: true,
        autoplay: true,
        navText: [
            '<i class="fa fa-angle-left"></i>',
            '<i class="fa fa-angle-right"></i>'
        ],
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1000: { items: 2 }
        }
    });
}


// =====================
// GOOGLE MAP
// =====================
function myMap() {
    if (!document.getElementById("googleMap")) return;

    const mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };

    new google.maps.Map(document.getElementById("googleMap"), mapProp);
}


// =====================
// PRODUCT QTY (CARD)
// =====================
function changeQty(btn, change) {
    const card = btn.closest(".card");
    const qtyEl = card?.querySelector(".qty");

    if (!qtyEl) return;

    let qty = parseInt(qtyEl.innerText);
    qty += change;

    if (qty < 1) qty = 1;

    qtyEl.innerText = qty;
}


// =====================
// CART STORAGE
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =====================
// FILTER PRODUCTS
// =====================
function filterProducts(category, event) {
    const sections = document.querySelectorAll(".product-section");

    sections.forEach(section => {
        section.style.display =
            category === "all" ? "block" : (section.id === category ? "block" : "none");
    });

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (event) event.target.classList.add("active");
}


// =====================
// TOGGLE SIDE CART
// =====================
function toggleCart() {
    const box = document.getElementById("cartBox");
    const overlay = document.getElementById("overlay");

    if (!box || !overlay) return;

    const isOpen = box.style.right === "0px";

    if (isOpen) {
        box.style.right = "-400px";
        overlay.style.display = "none";
    } else {
        box.style.right = "0px";
        overlay.style.display = "block";
        renderCart();
    }
}


// =====================
// ADD TO CART
// =====================
function addToCart(btn) {
    const card = btn.closest(".card");

    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const qty = parseInt(card.querySelector(".qty").innerText);

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ name, price, qty });
    }

    saveCart();
    updateCartCount();
}


// =====================
// RENDER CART
// =====================
function renderCart() {
    const box = document.getElementById("cartItems");
    const totalEl = document.getElementById("total");

    if (!box) return;

    box.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price * item.qty;

        box.innerHTML += `
            <div class="border p-2 mb-2">
                <strong>${item.name}</strong><br>
                ₹${item.price} × ${item.qty}

                <div class="mt-2">
                    <button onclick="updateQty(${i},-1)">-</button>
                    <button onclick="updateQty(${i},1)">+</button>
                    <button onclick="removeItem(${i})">X</button>
                </div>
            </div>
        `;
    });

    if (totalEl) totalEl.innerText = total;
}


// =====================
// UPDATE QTY IN CART
// =====================
function updateQty(i, change) {
    if (!cart[i]) return;

    cart[i].qty += change;

    if (cart[i].qty < 1) cart[i].qty = 1;

    saveCart();
}


// =====================
// REMOVE ITEM
// =====================
function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
}


// =====================
// SAVE CART
// =====================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}


// =====================
// CART COUNT
// =====================
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const el = document.getElementById("cart-count");
    if (el) el.innerText = totalItems;
}


// =====================
// CHECKOUT
// =====================
function checkout() {
    alert("Order placed 🎉");

    cart = [];
    saveCart();
    toggleCart();
}


// =====================
// INIT
// =====================
updateCartCount();