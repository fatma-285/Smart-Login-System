let userName = document.getElementById("userName");
let userEmail = document.getElementById("userEmail");
let userPassword = document.getElementById("userPassword");
let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let welcomeUserName = document.getElementById("welcomeUserName");
let logoutBtn = document.getElementById("logoutBtn");
let emailToast = document.getElementById("emailToast");
let togglePassword = document.getElementById("togglePassword");
let allUsers = [];
let localStorageKey = "allUsers";

if (JSON.parse(localStorage.getItem(localStorageKey))) {
  allUsers = JSON.parse(localStorage.getItem(localStorageKey));
}

if (signUpBtn) {
  signUpBtn.addEventListener("click", function () {
    if (
      validateInputs(userName) &&
      validateInputs(userEmail) &&
      validateInputs(userPassword)
    ) {
      var user = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value,
      };

      if (isEmailExist()) {
        emailToast.classList.remove("d-none");
        const toast = new bootstrap.Toast(emailToast);
        toast.show();
      } else {
        allUsers.push(user);
        addToLocalStorage();
        clearForm();
        location.href = "index.html";
        console.log(allUsers);
      }
    }
  });
}

function clearForm() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}

function addToLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(allUsers));
}

function isEmailExist() {
  let isEmailExist = allUsers.some((ele) => ele.email === userEmail.value);
  return isEmailExist;
}

if (signInBtn) {
  signInBtn.addEventListener("click", function () {
    let userFound = allUsers.find((ele) => ele.email === userEmail.value);

    if (!userFound){
        userEmail.nextElementSibling.classList.replace("d-none", "d-block");
    }else if (userFound.password !== userPassword.value) {
        userPassword.nextElementSibling.classList.replace("d-none", "d-block");
    } else {
      localStorage.setItem("currentUser", JSON.stringify(userFound));
      location.href = "home.html";
    }
  });
}

if (welcomeUserName) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    welcomeUserName.textContent = currentUser.name;
  } else {
    location.href = "index.html";
  }
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () =>
    localStorage.removeItem("currentUser")
  );
}

function validateInputs(element) {
  var regex = {
    userName: /^[A-Z][a-z]{2,14}$/,
    userEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    userPassword: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  };
  let isValid = regex[element.id].test(element.value);

  if (isValid) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
  return isValid;
}



togglePassword.addEventListener("click", function () {
  let isPassword = userPassword.type === "password";
  userPassword.type = isPassword ? "text" : "password";
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
