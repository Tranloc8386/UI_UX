const loginForm = document.getElementById("loginForm");
const error = document.getElementById("error");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "admin@example.com" && password === "123456") {
    window.location.href = "admin.html";
  } 
  else if (email === "user@example.com" && password === "123456") {
    window.location.href = "home.html";
  } 
  else {
    error.textContent = "Sai email hoặc mật khẩu!";
  }
});