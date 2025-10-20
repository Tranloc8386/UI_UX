const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  window.location.href = "login.html";
});


const products = JSON.parse(localStorage.getItem("products")) || [];


function renderProducts() {
  const list = document.getElementById("productList");

  if (products.length === 0) {
    list.innerHTML = "<p>Chưa có sản phẩm nào!</p>";
    return;
  }

  list.innerHTML = products.map((p) => `
    <div class="card" style="border:1px solid #ccc; padding:10px; margin:5px;">
      <img src="${p.img}" alt="${p.name}" width="100">
      <h4>${p.name}</h4>
      <p>${p.desc}</p>
      <p><b>Giá:</b> ${p.price}₫</p>
    </div>
  `).join("");
}

// Gọi hiển thị khi vào trang
renderProducts();