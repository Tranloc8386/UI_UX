const formlogin = document.getElementById("form-login");
if (formlogin) {
  formlogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const error = document.getElementById("error");

    if (email === "admin@example.com" && pass === "123456") {
      localStorage.setItem("isLoggedin", "true");
      window.location.href = "admin.html";
    } else {
      error.textContent = "Sai thong tin dang nhap!";
    }
  });
}

const isLoggedin = localStorage.getItemI("isLoggedin");

if (window.location.pathname.endsWith("admin.html")) {
  if (isLoggedin !== "true") {
    window.location.href = "login.html";
  }
}

const form = document.getElementById("form-admin");
const name = document.getElementById("name");
const email = document.getElementById("email");
const button = document.getElementById("button");
const usertable = document.getElementById("usertable");
const role = document.getElementById("role");
const logout =document.getElementById("logout")

let users = [];
let idIndex = null;

function renderusers() {
  usertable.innerHTML = "";
  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
      <button class="edit-btn" onclick="edituser ('${user.id}') ">Sua</button>
      <button class="delete-btn" onclick="deleteuser ('${user.id}') ">Xoa</button>

      </td>

    `;
    usertable.appendChild(tr);
  });
}

form.addEventListener("submit", (u) => {
  u.preventDefault();
  const name = name.value.trim();
  const email = email.value.trim();
  const role = role.value.trim();

  if (!name || !email || !role) {
    alert("Vui long nhap lai!");
    return;
  }

  if (idIndex) {
    users = users.map((u) => {
      u.id === idIndex ? { ...u, name, email, role } : u;
    });
    idIndex = null;
    button.textContent = "Them";
  } else {
    users.push({
      id: Math.random().toString(26).slice(2),
      name,
      email,
      role,
    });
  }
  form.reset();
  renderusers();
});

function edituser(id) {
  const user = users.find((u) => {
    u.id === id
  });
  if (!user) {
    return;
  }
  name.value = user.name;
  email.value = user.email;
  role.value = user.role;

  idIndex = id;
  button.textContent = "Cap nhat";
}
function deleteuser(id) {
  if (confirm("Ban chac chan muon xoa khong?")) {
    users = users.filter((u) => {
      u.id !== id
    });
  }
  renderusers();
}

button.addEventListener("click", ()=>{
    localStorage.removeItem("isLoggedin");
  window.location.href = "login.html";
})