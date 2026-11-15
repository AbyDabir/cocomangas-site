/* CoCoMangas — Shared data layer (Firebase + localStorage fallback) */

const STORAGE_KEYS = {
  menu: "cocomangas_menu",
  orders: "cocomangas_orders",
  settings: "cocomangas_settings"
};

const DEFAULT_PASSWORD = "coco2026";

const DEFAULT_MENU = {
  hookah: {
    title: "Кальяны",
    items: [
      { id: "h1", name: "Классический", price: 900, desc: "Любой вкус на выбор из нашей коллекции табаков.", tags: ["стандарт"], available: true },
      { id: "h2", name: "Авторский микс", price: 1100, desc: "Уникальная смесь от нашего кальянщика.", tags: ["авторский"], available: true },
      { id: "h3", name: "Премиум", price: 1400, desc: "Премиальные табаки: Darkside, MustHave, BlackBurn и др.", tags: ["премиум"], available: true },
      { id: "h4", name: "На фрукте / молоке", price: 1500, desc: "Кальян на гранате, апельсине, грейпфруте или молоке.", tags: ["на фрукте"], available: true },
      { id: "h5", name: "Двойная чаша", price: 1600, desc: "Две чаши одновременно — для компании.", tags: ["на компанию"], available: true }
    ]
  },
  lemonades: {
    title: "Лимонады",
    items: [
      { id: "l1", name: "Мохито классический", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l2", name: "Грейпфрут–ананас", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l3", name: "Манго–маракуйя", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l4", name: "Манго–ананас", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l5", name: "Земляника–ананас", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l6", name: "Клубника–лайм", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l7", name: "Малина–мята", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l8", name: "Гранат–смородина", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l9", name: "Клюква–апельсин", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l10", name: "Огурец–апельсин", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l11", name: "Ежевика–фиалка", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l12", name: "Яблоко–киви", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l13", name: "Черника–мята", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l14", name: "Вишня–мята", price: 420, desc: "", tags: ["450 мл"], available: true },
      { id: "l15", name: "Мохито классический", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l16", name: "Грейпфрут–ананас", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l17", name: "Манго–маракуйя", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l18", name: "Манго–ананас", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l19", name: "Земляника–ананас", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l20", name: "Клубника–лайм", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l21", name: "Малина–мята", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l22", name: "Гранат–смородина", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l23", name: "Клюква–апельсин", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l24", name: "Огурец–апельсин", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l25", name: "Ежевика–фиалка", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l26", name: "Яблоко–киви", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l27", name: "Черника–мята", price: 700, desc: "", tags: ["1000 мл"], available: true },
      { id: "l28", name: "Вишня–мята", price: 700, desc: "", tags: ["1000 мл"], available: true }
    ]
  },
  cocktails: {
    title: "Алкогольные коктейли",
    items: [
      { id: "c1", name: "Текила санрайз", price: 480, desc: "", tags: ["алкогольный"], available: true },
      { id: "c2", name: "Негрони", price: 570, desc: "", tags: ["алкогольный"], available: true },
      { id: "c3", name: "Кейп кодер", price: 430, desc: "", tags: ["алкогольный"], available: true },
      { id: "c4", name: "Мохито классический", price: 570, desc: "", tags: ["алкогольный"], available: true },
      { id: "c5", name: "Мохито", price: 590, desc: "", tags: ["алкогольный"], available: true },
      { id: "c6", name: "Том Коллинз", price: 450, desc: "", tags: ["алкогольный"], available: true },
      { id: "c7", name: "Апероль спритц", price: 530, desc: "", tags: ["алкогольный"], available: true },
      { id: "c8", name: "Секс на пляже", price: 420, desc: "", tags: ["алкогольный"], available: true },
      { id: "c9", name: "Пина колада", price: 480, desc: "", tags: ["алкогольный"], available: true },
      { id: "c10", name: "CoCoMangas Tai", price: 1400, desc: "Фирменный авторский коктейль", tags: ["авторский", "фирменный"], available: true },
      { id: "c11", name: "Изи спритс", price: 580, desc: "", tags: ["алкогольный"], available: true },
      { id: "c12", name: "Ред эпл", price: 470, desc: "", tags: ["алкогольный"], available: true },
      { id: "c13", name: "Тропик бург", price: 480, desc: "", tags: ["алкогольный"], available: true },
      { id: "c14", name: "Прайм", price: 460, desc: "", tags: ["алкогольный"], available: true },
      { id: "c15", name: "Голубая лагуна", price: 390, desc: "", tags: ["алкогольный"], available: true },
      { id: "c16", name: "Манговый дайкири", price: 430, desc: "", tags: ["алкогольный"], available: true },
      { id: "c17", name: "Люмьер руж", price: 480, desc: "", tags: ["алкогольный"], available: true },
      { id: "c18", name: "Помпей", price: 470, desc: "", tags: ["алкогольный"], available: true },
      { id: "c19", name: "Тропик рэй", price: 490, desc: "", tags: ["алкогольный"], available: true },
      { id: "c20", name: "Май тай", price: 550, desc: "", tags: ["алкогольный"], available: true },
      { id: "c21", name: "Гламур", price: 530, desc: "", tags: ["алкогольный"], available: true },
      { id: "c22", name: "Куба либре", price: 510, desc: "", tags: ["алкогольный"], available: true },
      { id: "c23", name: "Космо", price: 410, desc: "", tags: ["алкогольный"], available: true },
      { id: "c24", name: "Фьюжн", price: 420, desc: "", tags: ["алкогольный"], available: true },
      { id: "c25", name: "Виски кола", price: 450, desc: "", tags: ["алкогольный"], available: true },
      { id: "c26", name: "Campari тоник", price: 570, desc: "", tags: ["алкогольный"], available: true }
    ]
  },
  tea: {
    title: "Авторские чаи",
    items: [
      { id: "t1", name: "Облепиховый", price: 520, desc: "Чёрный чай, облепиховое пюре, ягоды, апельсин, корица", tags: ["облепиха"], available: true },
      { id: "t2", name: "Клюквенный", price: 530, desc: "", tags: ["клюква"], available: true },
      { id: "t3", name: "Вишнёвый", price: 520, desc: "", tags: ["вишня"], available: true },
      { id: "t4", name: "Согревающий", price: 560, desc: "", tags: ["согревающий"], available: true },
      { id: "t5", name: "Малина–имбирь", price: 540, desc: "", tags: ["малина"], available: true },
      { id: "t6", name: "Клубника–базилик", price: 530, desc: "", tags: ["клубника"], available: true },
      { id: "t7", name: "Банан–груша", price: 530, desc: "", tags: ["банан"], available: true },
      { id: "t8", name: "Грейпфрут–апельсин", price: 530, desc: "", tags: ["цитрус"], available: true },
      { id: "t9", name: "Гранат–смородина", price: 540, desc: "", tags: ["гранат"], available: true },
      { id: "t10", name: "Ежевика–черника", price: 530, desc: "", tags: ["ягоды"], available: true },
      { id: "t11", name: "Яблоко–киви", price: 520, desc: "", tags: ["яблоко"], available: true },
      { id: "t12", name: "Тайга саунд", price: 580, desc: "", tags: ["авторский"], available: true },
      { id: "t13", name: "Мандарин–пихта", price: 580, desc: "", tags: ["авторский"], available: true },
      { id: "t14", name: "Ананас–лемонграсс", price: 580, desc: "", tags: ["ананас"], available: true },
      { id: "t15", name: "Персик молочный улун", price: 580, desc: "", tags: ["улун"], available: true },
      { id: "t16", name: "Домашний", price: 610, desc: "Чёрный чай, мята, розмарин, шафран, имбирь, душица, лимон, мёд, шиповник", tags: ["фирменный"], available: true },
      { id: "t17", name: "Мохито", price: 580, desc: "Зелёный улун, лайм, мята, лемонграсс, тимьян", tags: ["мохито"], available: true },
      { id: "t18", name: "Массала", price: 580, desc: "Чёрный чай массала со специями, корица, молоко, мёд", tags: ["специи"], available: true }
    ]
  },
  mors: {
    title: "Морсы",
    items: [
      { id: "m1", name: "Клубнично–базиликовый", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m2", name: "Бананово–грушевый", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m3", name: "Смородиновый", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m4", name: "Облепиховый", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m5", name: "Клюквенный", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m6", name: "Малиновый", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m7", name: "Ежевичный", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m8", name: "Черничный", price: 370, desc: "", tags: ["450 мл"], available: true },
      { id: "m9", name: "Клубнично–базиликовый", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m10", name: "Бананово–грушевый", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m11", name: "Смородиновый", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m12", name: "Облепиховый", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m13", name: "Клюквенный", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m14", name: "Малиновый", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m15", name: "Ежевичный", price: 580, desc: "", tags: ["1000 мл"], available: true },
      { id: "m16", name: "Черничный", price: 580, desc: "", tags: ["1000 мл"], available: true }
    ]
  }
};

let fbApp = null;
let fbDb = null;
let firebaseReady = false;
let cachedMenu = null;
let cachedOrders = [];

function isFirebaseConfigured() {
  if (window.USE_FIREBASE === false) return false;
  const c = window.FIREBASE_CONFIG;
  if (!c || !c.apiKey || c.apiKey === "YOUR_API_KEY") return false;
  if (!c.databaseURL || c.databaseURL.includes("YOUR_PROJECT")) return false;
  return true;
}

async function initFirebase() {
  if (!isFirebaseConfigured()) {
    console.info("[CoCoMangas] Firebase не настроен — режим localStorage");
    return false;
  }
  if (typeof firebase === "undefined") {
    console.warn("[CoCoMangas] Firebase SDK не загружен");
    return false;
  }
  try {
    fbApp = firebase.initializeApp(window.FIREBASE_CONFIG);
    fbDb = firebase.database();
    firebaseReady = true;
    console.info("[CoCoMangas] Firebase подключён");

    const menuSnap = await fbDb.ref("menu").once("value");
    if (!menuSnap.exists()) {
      await fbDb.ref("menu").set(DEFAULT_MENU);
    }

    fbDb.ref("menu").on("value", (snap) => {
      cachedMenu = snap.val() || DEFAULT_MENU;
      localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(cachedMenu));
      window.dispatchEvent(new CustomEvent("menu-updated"));
    });

    fbDb.ref("orders").on("value", (snap) => {
      const val = snap.val();
      if (!val) {
        cachedOrders = [];
      } else if (Array.isArray(val)) {
        cachedOrders = val.filter(Boolean);
      } else {
        cachedOrders = Object.keys(val)
          .map((k) => ({ ...val[k], id: val[k].id || k }))
          .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      }
      localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(cachedOrders));
      window.dispatchEvent(new CustomEvent("orders-updated"));
    });

    return true;
  } catch (err) {
    console.error("[CoCoMangas] Firebase init error:", err);
    firebaseReady = false;
    return false;
  }
}

function getMenu() {
  if (firebaseReady && cachedMenu) return cachedMenu;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.menu);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_MENU));
}

function saveMenu(menu) {
  cachedMenu = menu;
  localStorage.setItem(STORAGE_KEYS.menu, JSON.stringify(menu));
  if (firebaseReady && fbDb) {
    fbDb.ref("menu").set(menu).catch((e) => console.error("saveMenu fb:", e));
  }
  window.dispatchEvent(new CustomEvent("menu-updated"));
}

function resetMenu() {
  const menu = JSON.parse(JSON.stringify(DEFAULT_MENU));
  saveMenu(menu);
}

function getOrders() {
  if (firebaseReady) return cachedOrders.slice();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.orders);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function saveOrdersLocal(orders) {
  cachedOrders = orders;
  localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
  window.dispatchEvent(new CustomEvent("orders-updated"));
}

function createOrder({ table, items, total, comment }) {
  const order = {
    id: "ord_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
    table: table || "—",
    items: items,
    total: total,
    comment: comment || "",
    status: "new",
    createdAt: new Date().toISOString()
  };

  if (firebaseReady && fbDb) {
    fbDb.ref("orders/" + order.id).set(order).catch((e) => console.error("createOrder fb:", e));
    cachedOrders = [order, ...cachedOrders];
    window.dispatchEvent(new CustomEvent("orders-updated"));
  } else {
    const orders = getOrders();
    orders.unshift(order);
    if (orders.length > 100) orders.length = 100;
    saveOrdersLocal(orders);
  }
  return order;
}

function updateOrderStatus(orderId, status) {
  if (firebaseReady && fbDb) {
    fbDb.ref("orders/" + orderId).update({
      status: status,
      updatedAt: new Date().toISOString()
    }).catch((e) => console.error("updateOrder fb:", e));
    const idx = cachedOrders.findIndex((o) => o.id === orderId);
    if (idx !== -1) {
      cachedOrders[idx].status = status;
      cachedOrders[idx].updatedAt = new Date().toISOString();
      window.dispatchEvent(new CustomEvent("orders-updated"));
    }
    return cachedOrders[idx] || null;
  }

  const orders = getOrders();
  const idx = orders.findIndex((o) => o.id === orderId);
  if (idx === -1) return null;
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  saveOrdersLocal(orders);
  return orders[idx];
}

function checkAdminPassword(pass) {
  const settings = getSettings();
  return pass === (settings.password || DEFAULT_PASSWORD);
}

function getSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.settings);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { password: DEFAULT_PASSWORD };
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function subscribeOrders(callback) {
  const handler = () => callback(getOrders());
  window.addEventListener("orders-updated", handler);
  let last = JSON.stringify(getOrders());
  const id = setInterval(() => {
    if (firebaseReady) return;
    const now = JSON.stringify(getOrders());
    if (now !== last) {
      last = now;
      callback(getOrders());
    }
  }, 1500);
  callback(getOrders());
  return () => {
    clearInterval(id);
    window.removeEventListener("orders-updated", handler);
  };
}

function subscribeMenu(callback) {
  const handler = () => callback(getMenu());
  window.addEventListener("menu-updated", handler);
  let last = JSON.stringify(getMenu());
  const id = setInterval(() => {
    if (firebaseReady) return;
    const now = JSON.stringify(getMenu());
    if (now !== last) {
      last = now;
      callback(getMenu());
    }
  }, 2000);
  callback(getMenu());
  return () => {
    clearInterval(id);
    window.removeEventListener("menu-updated", handler);
  };
}

window.cocoStoreReady = initFirebase();
