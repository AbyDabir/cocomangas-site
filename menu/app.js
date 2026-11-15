/* CoCoMangas — Guest menu logic */

let MENU = {};
let cart = {};
let currentCategory = "all";

const menuEl = document.getElementById("menu");
const categoriesEl = document.getElementById("categories");
const cartBadge = document.getElementById("cartBadge");
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartItemsEl = document.getElementById("cartItems");
const cartTotalEl = document.getElementById("cartTotal");
const closeCartBtn = document.getElementById("closeCart");
const itemModal = document.getElementById("itemModal");
const itemDetailEl = document.getElementById("itemDetail");
const closeItemBtn = document.getElementById("closeItem");

function loadMenuFromStore() {
  MENU = getMenu();
  const cats = Object.keys(MENU);
  categoriesEl.innerHTML = `
    <button class="cat-btn ${currentCategory === "all" ? "active" : ""}" data-category="all">Всё</button>
    ${cats.map(k => `
      <button class="cat-btn ${currentCategory === k ? "active" : ""}" data-category="${k}">${MENU[k].title}</button>
    `).join("")}
  `;
  renderMenu();
}

function availableItems(section) {
  return (section.items || []).filter(i => i.available !== false);
}

function renderMenu() {
  let html = "";
  const categories = currentCategory === "all" ? Object.keys(MENU) : [currentCategory];

  categories.forEach((catKey) => {
    const section = MENU[catKey];
    if (!section) return;
    const items = availableItems(section);
    if (!items.length) return;

    html += `
      <section class="section" data-cat="${catKey}">
        <h2 class="section-title">${section.title}</h2>
        <div class="grid">
          ${items.map((item) => renderCard(item)).join("")}
        </div>
      </section>
    `;
  });

  menuEl.innerHTML = html || `<p style="text-align:center;color:var(--text-dim);padding:40px">Меню пусто</p>`;

  menuEl.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-add")) return;
      openItemDetail(card.dataset.id);
    });
  });

  menuEl.querySelectorAll(".btn-add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
      btn.classList.add("added");
      btn.textContent = "Добавлено ✓";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.textContent = "В заказ";
      }, 1200);
    });
  });
}

function renderCard(item) {
  const tagsHtml = (item.tags || [])
    .map((t) => {
      let cls = "tag";
      if (t.includes("1000")) cls += " strength-strong";
      else if (t.includes("450")) cls += " strength-light";
      else if (t.includes("фирменный") || t.includes("авторский")) cls += " strength-medium";
      return `<span class="${cls}">${t}</span>`;
    })
    .join("");

  const priceText = item.price === 0 ? "Бесплатно" : `${item.price} ₽`;
  const descHtml = item.desc ? `<p class="card-desc">${item.desc}</p>` : "";

  return `
    <article class="card" data-id="${item.id}">
      <div class="card-top">
        <h3 class="card-name">${item.name}</h3>
        <span class="card-price">${priceText}</span>
      </div>
      ${descHtml}
      <div class="card-tags">${tagsHtml}</div>
      <div class="card-actions">
        <button class="btn-add" data-id="${item.id}">В заказ</button>
      </div>
    </article>
  `;
}

function findItem(id) {
  for (const cat of Object.values(MENU)) {
    const found = (cat.items || []).find((i) => i.id === id);
    if (found) return found;
  }
  return null;
}

function addToCart(id) {
  if (!cart[id]) cart[id] = 0;
  cart[id]++;
  updateCartUI();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id]--;
  if (cart[id] <= 0) delete cart[id];
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
  cartBadge.textContent = totalCount;
  cartBadge.classList.toggle("visible", totalCount > 0);
}

function calcTotal() {
  let total = 0;
  Object.keys(cart).forEach((id) => {
    const item = findItem(id);
    if (item) total += item.price * cart[id];
  });
  return total;
}

function renderCartItems() {
  const ids = Object.keys(cart);
  if (ids.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-cart">Заказ пока пуст</p>`;
    cartTotalEl.textContent = "0 ₽";
    updateSubmitArea(false);
    return;
  }

  let html = "";
  ids.forEach((id) => {
    const item = findItem(id);
    if (!item) return;
    const qty = cart[id];
    const volTag = (item.tags || []).find((t) => t.includes("мл"));
    const sizeNote = volTag ? ` (${volTag})` : "";

    html += `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${sizeNote}</div>
          <div class="cart-item-price">${item.price} ₽ × ${qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" data-action="minus" data-id="${id}">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" data-action="plus" data-id="${id}">+</button>
        </div>
      </div>
    `;
  });

  cartItemsEl.innerHTML = html;
  cartTotalEl.textContent = `${calcTotal()} ₽`;
  updateSubmitArea(true);

  cartItemsEl.querySelectorAll(".qty-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.action === "plus") addToCart(btn.dataset.id);
      else removeFromCart(btn.dataset.id);
      renderCartItems();
    });
  });
}

function updateSubmitArea(hasItems) {
  let area = document.getElementById("submitArea");
  if (!area) {
    area = document.createElement("div");
    area.id = "submitArea";
    const footer = cartModal.querySelector(".modal-footer");
    footer.insertBefore(area, footer.firstChild);
  }

  if (!hasItems) {
    area.innerHTML = "";
    const oldBtn = cartModal.querySelector(".btn-send-order");
    if (oldBtn) oldBtn.style.display = "none";
    return;
  }

  area.innerHTML = `
    <div style="margin-bottom:12px">
      <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:6px">Номер стола *</label>
      <input type="text" id="tableInput" placeholder="Например: 5"
        style="width:100%;padding:12px;border-radius:10px;border:1px solid rgba(201,168,76,0.3);
        background:#0a0a0c;color:var(--text);font-size:16px;margin-bottom:8px" />
      <label style="font-size:12px;color:var(--text-muted);display:block;margin-bottom:6px">Комментарий</label>
      <input type="text" id="commentInput" placeholder="Без льда, побыстрее…"
        style="width:100%;padding:12px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);
        background:#0a0a0c;color:var(--text);font-size:14px" />
    </div>
  `;

  let sendBtn = cartModal.querySelector(".btn-send-order");
  if (!sendBtn) {
    sendBtn = document.createElement("button");
    sendBtn.className = "btn-primary btn-send-order";
    sendBtn.type = "button";
    sendBtn.textContent = "Отправить заказ";
    const footer = cartModal.querySelector(".modal-footer");
    const callBtn = footer.querySelector("a.btn-primary");
    if (callBtn) callBtn.style.display = "none";
    const note = footer.querySelector(".cart-note");
    if (note) note.textContent = "Заказ сразу появится на терминале официанта";
    footer.appendChild(sendBtn);
    sendBtn.addEventListener("click", submitOrder);
  }
  sendBtn.style.display = "";
  sendBtn.disabled = false;
  sendBtn.textContent = "Отправить заказ";
}

function submitOrder() {
  const tableInput = document.getElementById("tableInput");
  const commentInput = document.getElementById("commentInput");
  const table = (tableInput && tableInput.value.trim()) || "";
  if (!table) {
    if (tableInput) {
      tableInput.style.borderColor = "#c45c5c";
      tableInput.focus();
    }
    return;
  }

  const items = [];
  Object.keys(cart).forEach((id) => {
    const item = findItem(id);
    if (!item) return;
    items.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: cart[id],
      tags: item.tags || []
    });
  });

  if (!items.length) return;

  createOrder({
    table,
    items,
    total: calcTotal(),
    comment: (commentInput && commentInput.value.trim()) || ""
  });

  cart = {};
  updateCartUI();
  renderCartItems();

  const sendBtn = cartModal.querySelector(".btn-send-order");
  if (sendBtn) {
    sendBtn.textContent = "Отправлено ✓";
    sendBtn.disabled = true;
  }

  setTimeout(() => {
    cartModal.classList.remove("open");
    if (sendBtn) {
      sendBtn.textContent = "Отправить заказ";
      sendBtn.disabled = false;
    }
  }, 1200);
}

function openItemDetail(id) {
  const item = findItem(id);
  if (!item || item.available === false) return;

  const tagsHtml = (item.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  const priceText = `${item.price} ₽`;
  const descHtml = item.desc ? `<p class="item-detail-desc">${item.desc}</p>` : "";

  itemDetailEl.innerHTML = `
    <h2 class="item-detail-name">${item.name}</h2>
    <div class="item-detail-price">${priceText}</div>
    ${descHtml}
    <div class="item-detail-tags">${tagsHtml}</div>
    <button class="btn-add" data-id="${item.id}" style="width:100%;padding:14px;font-size:15px">
      Добавить в заказ
    </button>
  `;

  itemDetailEl.querySelector(".btn-add").addEventListener("click", () => {
    addToCart(id);
    closeItemModal();
  });

  itemModal.classList.add("open");
}

function closeItemModal() {
  itemModal.classList.remove("open");
}

categoriesEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-btn");
  if (!btn) return;
  currentCategory = btn.dataset.category;
  categoriesEl.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderMenu();
  menuEl.scrollTop = 0;
});

cartBtn.addEventListener("click", () => {
  renderCartItems();
  cartModal.classList.add("open");
});

closeCartBtn.addEventListener("click", () => cartModal.classList.remove("open"));
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) cartModal.classList.remove("open");
});
closeItemBtn.addEventListener("click", closeItemModal);
itemModal.addEventListener("click", (e) => {
  if (e.target === itemModal) closeItemModal();
});

const observer = new MutationObserver(() => {
  const anyOpen = cartModal.classList.contains("open") || itemModal.classList.contains("open");
  document.body.style.overflow = anyOpen ? "hidden" : "";
});
observer.observe(cartModal, { attributes: true, attributeFilter: ["class"] });
observer.observe(itemModal, { attributes: true, attributeFilter: ["class"] });

async function boot() {
  if (window.cocoStoreReady && typeof window.cocoStoreReady.then === "function") {
    await window.cocoStoreReady;
  }
  loadMenuFromStore();
  subscribeMenu(() => {
    MENU = getMenu();
    renderMenu();
  });
  updateCartUI();
}
boot();
