const form = document.getElementById("form");

const onSubmit = (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const dateInput = document.getElementById("date");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const date = dateInput.value.trim();

  clearErrors();

  let hasError = false;

  if (name === "") {
    showError(nameInput, "Ad boş ola bilməz");
    hasError = true;
  }

  if (email === "") {
    showError(emailInput, "E-mail boş ola bilməz");
    hasError = true;
  }

  if (date === "") {
    showError(dateInput, "Tarix boş ola bilməz");
    hasError = true;
  }

  if (hasError) return;

  let arr = JSON.parse(localStorage.getItem("arr")) || [];

  arr.push({ name, email, date });

  localStorage.setItem("arr", JSON.stringify(arr));

  displayAll(arr);

  form.reset();
};

const showError = (input, message) => {
  const error = document.createElement("div");
  error.className = "error-message";
  error.innerText = message;
  input.classList.add("error");
  input.parentElement.appendChild(error);
};

const clearErrors = () => {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
  document
    .querySelectorAll(".error")
    .forEach((el) => el.classList.remove("error"));
};

const displayAll = (arr) => {
  const output = document.getElementById("output");
  output.innerHTML = arr
    .map(
      (item, index) => `
    <div>
      <p><strong>#${index + 1}</strong></p>
      <p><strong>Ad:</strong> ${item.name}</p>
      <p><strong>E-mail:</strong> ${item.email}</p>
      <p><strong>Tarix:</strong> ${item.date}</p>
      <hr>
    </div>
  `
    )
    .join("");
};
const setFormWithLastData = (arr) => {
  if (arr.length === 0) return;

  const last = arr[arr.length - 1];

  document.getElementById("name").value = last.name;
  document.getElementById("email").value = last.email;
  document.getElementById("date").value = last.date;
};
const clearLocalStorage = () => {
  localStorage.removeItem("arr");
  const output = document.getElementById("output");
  output.innerHTML = "<p>There is no data</p>";
};
window.addEventListener("DOMContentLoaded", () => {
  const arr = JSON.parse(localStorage.getItem("arr")) || [];
  displayAll(arr);
  setFormWithLastData(arr);  
});

form.addEventListener("submit", onSubmit);
