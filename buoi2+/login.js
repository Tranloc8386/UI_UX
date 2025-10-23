const loginForm = document.getElementById("loginForm");
const error = document.getElementById("error");

const accounts = [
  { email: "admin@example.com", password: "123456", role: "admin" },
  { email: "user@example.com", password: "123456", role: "user" },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const user = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!user) {
    error.textContent = "Email hoac password khong dung!";
    return;
  }
  localStorage.setItem("currentUser", JSON.stringify(user));
  if (user.role === "admin") window.location.href = "admin.html";
  else window.location.href = "home.html";
});
