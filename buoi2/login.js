



// ====== TẠO DỮ LIỆU MẪU ======
if (!localStorage.getItem("users")) {
  const defaultUsers = [
    { name: "Admin", email: "admin@example.com", password: "123456", role: "admin" },
    { name: "User", email: "user@example.com", password: "123456", role: "user" }
  ];
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

if (!localStorage.getItem("products")) {
  const sampleProducts = [
    { name: "Laptop", price: 20000000, desc: "Máy tính xịn", img: "https://via.placeholder.com/150" },
    { name: "Điện thoại", price: 10000000, desc: "Smartphone", img: "https://via.placeholder.com/150" }
  ];
  localStorage.setItem("products", JSON.stringify(sampleProducts));
}

// ====== ĐĂNG NHẬP ======
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.email === email && u.password === password);

    if (!found) {
      error.textContent = "Sai email hoặc mật khẩu!";
    } else {
      localStorage.setItem("currentUser", JSON.stringify(found));
      if (found.role === "admin") window.location.href = "admin.html";
      else window.location.href = "home.html";
    }
  });
}

// ====== ĐĂNG XUẤT ======
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}

// ====== TRANG HOME ======
if (window.location.pathname.includes("home.html")) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) window.location.href = "login.html";

  const products = JSON.parse(localStorage.getItem("products")) || [];
  const productList = document.getElementById("productList");

  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <span>${p.price.toLocaleString()}đ</span>
    `;
    productList.appendChild(card);
  });
}

// ====== TRANG ADMIN ======
if (window.location.pathname.includes("admin.html")) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "admin") window.location.href = "login.html";

  // USERS
  const userForm = document.getElementById("userForm");
  const userList = document.getElementById("userList");
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editUserIndex = null;

  function renderUsers() {
    userList.innerHTML = "";
    users.forEach((u, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${u.name} (${u.email}) - ${u.role}
        <button onclick="editUser(${i})">Sửa</button>
        <button onclick="deleteUser(${i})">Xóa</button>
      `;
      userList.appendChild(li);
    });
  }
  renderUsers();

  window.editUser = (i) => {
    const u = users[i];
    document.getElementById("name").value = u.name;
    document.getElementById("userEmail").value = u.email;
    document.getElementById("role").value = u.role;
    editUserIndex = i;
  };

  window.deleteUser = (i) => {
    users.splice(i, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUsers();
  };

  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("userEmail").value;
    const role = document.getElementById("role").value;
    if (editUserIndex !== null) {
      users[editUserIndex] = { ...users[editUserIndex], name, email, role };
      editUserIndex = null;
    } else {
      users.push({ name, email, password: "123456", role });
    }
    localStorage.setItem("users", JSON.stringify(users));
    userForm.reset();
    renderUsers();
  });

  // PRODUCTS
  const productForm = document.getElementById("productForm");
  const productList = document.getElementById("productList");
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let editProductIndex = null;

  function renderProducts() {
    productList.innerHTML = "";
    products.forEach((p, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${p.name} - ${p.price.toLocaleString()}đ
        <button onclick="editProduct(${i})">Sửa</button>
        <button onclick="deleteProduct(${i})">Xóa</button>
      `;
      productList.appendChild(li);
    });
  }
  renderProducts();

  window.editProduct = (i) => {
    const p = products[i];
    document.getElementById("productName").value = p.name;
    document.getElementById("productPrice").value = p.price;
    document.getElementById("productDesc").value = p.desc;
    document.getElementById("productImg").value = p.img;
    editProductIndex = i;
  };

  window.deleteProduct = (i) => {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  };

  productForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("productName").value;
    const price = +document.getElementById("productPrice").value;
    const desc = document.getElementById("productDesc").value;
    const img = document.getElementById("productImg").value;
    if (editProductIndex !== null) {
      products[editProductIndex] = { name, price, desc, img };
      editProductIndex = null;
    } else {
      products.push({ name, price, desc, img });
    }
    localStorage.setItem("products", JSON.stringify(products));
    productForm.reset();
    renderProducts();
  });
}