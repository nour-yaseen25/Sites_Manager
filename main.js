const create_form = document.querySelector(".create_form");

const btn_show = document.querySelector(".btn-show");

const btn_deleteall = document.querySelector(".btn-delete");

const Sites_info = document.querySelector(".Sites_info");
let Sites_array = JSON.parse(localStorage.getItem("Sites")) || [];
displayTable(Sites_array);
const siteNameInput = document.querySelector("input[name='siteName']");
const siteURLInput = document.querySelector("input[name='siteURL']");
const usernameInput = document.querySelector("input[name='username']");
const emailuserInput = document.querySelector("input[name='emailuser']");
const passwordInput = document.querySelector("input[name='password']");

create_form.onsubmit = (e) => {
  e.preventDefault();
  console.log(e.target.siteName.value);
  const t = {
    siteName: e.target.siteName.value,
    siteURL: e.target.siteURL.value,
    username: e.target.username.value,
    emailuser: e.target.emailuser.value,
    password: e.target.password.value,
  };
  if (
    !validate_emailuser() ||
    !validate_password() ||
    !validate_siteName() ||
    !validate_siteURL() ||
    !validate_username()
  )
    return;

   Swal.fire({
  title: "Do you want to save the data?",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Yes, save it",
  cancelButtonText: "No, cancel",
  confirmButtonColor:'#ffcc00',
     background:flag=="dark"? ' #1a1a1a':'#fff',
     color:flag=="dark"?'#fff':'#000',
     width:'80%',
}).then((result) => {
  if (result.isConfirmed) {
    Sites_array.push(t);
    localStorage.setItem("Sites", JSON.stringify(Sites_array));
    create_form.reset();
    displayTable(Sites_array);
document.querySelector(".message_password").textContent="";
   Swal.fire({
  title: "✅ Saved!",
  text: "The data was added successfully.",
  icon: "success",
  background: flag === "dark" ? "#1a1a1a" : "#fff",
  color: flag === "dark" ? "#fff" : "#000",
  confirmButtonColor: "#ffcc00"
});

  } else if (result.isDismissed) {
    Swal.fire({
  title: "Cancelled",
  text: "The data was not saved.",
  icon: "info",
  background: flag === "dark" ? "#1a1a1a" : "#fff",
  color: flag === "dark" ? "#fff" : "#000",
  confirmButtonColor: "#ffcc00"
});

  }
});


};
function displayTable(Sites_array) {
  const Sites_list = Sites_array.map((ele, index) => {
    return `
                    <tr>
                    <td>
                    <img src="${getIcon(
                      ele.siteURL
                    )}"   onerror="this.onerror=null; this.src='https://img.icons8.com/ios-filled/50/internet.png';"  alt="Icon" class="favicon"/></td>
                        <td>${ele.siteName}</td>
                        <td>${ele.siteURL}</td>
                        <td>${ele.username}</td>
                         <td>${ele.emailuser}</td>
                         <td>${ele.password}</td>
                          <td>
                          <button onclick="remove(${index})" class="btn btn-delete" >delete</button>
                       <button onclick="edit(${index})" class="btn btn-edit">edit</button>
                        </td>
                    </tr>`;
  }).join("");
  console.log(Sites_list);
  Sites_info.innerHTML = Sites_list;
}

function remove(index) {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
    confirmButtonColor:'#ffcc00',
     background:flag=="dark"? ' #1a1a1a':'#fff',
     color:flag=="dark"?'#fff':'#000',
     width:'80%',
  }).then((result) => {
    if (result.isConfirmed) {
      //save
      Sites_array.splice(index, 1);
      localStorage.setItem("Sites", JSON.stringify(Sites_array));
      displayTable(Sites_array);
       Swal.fire({
  title: '✅ Saved!',
  icon: 'success',
  background: flag == "dark" ? '#1a1a1a' : '#fff',
  color: flag == "dark" ? '#fff' : '#000',
  confirmButtonColor: '#ffcc00',
});
    } else if (result.isDenied) {
      //don't save
       Swal.fire({
  title: 'Changes are not saved',
  icon: 'info',
  background: flag == "dark" ? '#1a1a1a' : '#fff',
  color: flag == "dark" ? '#fff' : '#000',
  confirmButtonColor: '#ffcc00',
});

    }
  });
}
btn_deleteall.onclick=(e)=>{
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
    confirmButtonColor:'#ffcc00',
     background:flag=="dark"? ' #1a1a1a':'#fff',
     color:flag=="dark"?'#fff':'#000',
     width:'80%',
  }).then((result) => {
    if (result.isConfirmed) {
      //save
      localStorage.removeItem("Sites");
      Sites_array=[];
      displayTable(Sites_array);
      Swal.fire({
  title: '✅ Saved!',
  icon: 'success',
  background: flag == "dark" ? '#1a1a1a' : '#fff',
  color: flag == "dark" ? '#fff' : '#000',
  confirmButtonColor: '#ffcc00',
});

    } else if (result.isDenied) {
      //don't save
      Swal.fire({
  title: 'Changes are not saved',
  icon: 'info',
  background: flag == "dark" ? '#1a1a1a' : '#fff',
  color: flag == "dark" ? '#fff' : '#000',
  confirmButtonColor: '#ffcc00',
});

    }
  });
}
function edit(index) {
 
  Swal.fire({
    title: 'Edit Info',
    html: `
    <div class="text-center d-flex-col gap-15 jus">
    <div>
    <label>NameUser</label>
      <input id="swal-name" class="swal2-input" placeholder="NameUser" value="${Sites_array[index].username}">
      </div>
      <div>
      <label>EmailUser</label>
      <input id="swal-email" class="swal2-input" placeholder="EmailUser" value="${Sites_array[index].emailuser}">
      </div>
<div>
      <label>Password </label>
      <input id="swal-pass" class="swal2-input" placeholder="Password" value="${Sites_array[index].password}">
   </div>
   </div>
      `,
    confirmButtonText: 'Save',
     backdrop: true,
     confirmButtonColor:'#ffcc00',
     background:flag=="dark"? ' #1a1a1a':'#fff',
     color:flag=="dark"?'#fff':'#000',
     width:'80%',
    focusConfirm: false,
     customClass: {
    confirmButton: 'my-btn-confirm'
  },
    preConfirm: () => {
      const newName = document.getElementById('swal-name').value.trim();
      const newEmail = document.getElementById('swal-email').value.trim();
      const newPass = document.getElementById('swal-pass').value.trim();

      if (!newName || !newEmail || !newPass) {
        Swal.showValidationMessage("All fields are required!");
        return false;
      }
     if (!newEmail.includes('@')) {
  Swal.showValidationMessage("Please enter a valid email.");
  return false;
}
      return { newName, newEmail, newPass };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const data = result.value;
      // update the table
      Sites_array[index].username = data.newName;
      Sites_array[index].emailuser = data.newEmail;
      Sites_array[index].password = data.newPass;
      localStorage.setItem("Sites", JSON.stringify(Sites_array));
      displayTable(Sites_array);
      Swal.fire({
  title: '✅ Saved!',
  icon: 'success',
  background: flag == "dark" ? '#1a1a1a' : '#fff',
  color: flag == "dark" ? '#fff' : '#000',
  confirmButtonColor: '#ffcc00',
});

    }
  });
}
function toggleMenu() {
      document.getElementById('nav').classList.toggle('active');
    }
    
window.onscroll = function (e) {
 const image_move=document.querySelector(".image_move");
 const create_form=document.querySelector(".create-user");
  console.log(e);
  console.log(create_form.offsetTop);
  console.log(window.scrollY);
  if (window.scrollY > create_form.offsetTop) {
    image_move.classList.add("anim_slide");
  } 
};

/*validation */
siteNameInput.onblur = (e) => {
  console.log(e);
  validate_siteName();
};
function validate_siteName() {
  const regex = /^[\w\s\-]{3,50}$/;
  console.log(regex);
  console.log(siteNameInput.value);
  if (!regex.test(siteNameInput.value)) {
    document.querySelector(".message_siteName").textContent =
      "❌ Website name must be at least 3 characters and contain only letters, numbers, dashes or spaces!";
    return false;
  } else {
    document.querySelector(".message_siteName").textContent = "";
    return true;
  }
}
siteURLInput.onblur = (e) => {
  console.log(e);
  validate_siteURL();
};
function validate_siteURL() {
  const regex = /^https:\/\/[\w\-]+(\.[\w\-]+)+.*$/;
  console.log(regex);
  console.log(siteURLInput.value);
  if (!regex.test(siteURLInput.value)) {
    document.querySelector(".message_siteURL").textContent =
      "❌ Please enter the full website URL (e.g. https://example.com)!";
  } else {
    document.querySelector(".message_siteURL").textContent = "";
    return true;
  }
}
usernameInput.onblur = (e) => {
  console.log(e);
  validate_username();
};
function validate_username() {
  const regex = /^[a-zA-Z0-9_.-]{3,30}$/;
  console.log(regex);
  console.log(usernameInput.value);
  if (!regex.test(usernameInput.value)) {
    document.querySelector(".message_username").textContent =
      "❌ Username should be 3–30 characters and may include letters, numbers, underscores, or dots only!";
    return false;
  } else {
    document.querySelector(".message_username").textContent = "";
    return true;
  }
}
emailuserInput.onblur = (e) => {
  console.log(e);
  validate_emailuser();
};
function validate_emailuser() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  console.log(regex);
  console.log(emailuserInput.value);
  if (!regex.test(emailuserInput.value)) {
    document.querySelector(".message_emailuser").textContent =
      "❌ Please enter a valid email address (e.g. user@example.com)!";
    return false;
  } else {
    document.querySelector(".message_emailuser").textContent = "";
    return true;
  }
}
passwordInput.oninput = (e) => {
  console.log(e);
  validate_password();
};
function validate_password() {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$/;
  const message = document.querySelector(".message_password");
  const value = passwordInput.value;

  // reset classes
  message.classList.remove("green", "orange");

  if (value.length < 1) {
    message.textContent = "❗ Password is required!";
    message.classList.add("red");
    return false;
  } else if (!regex.test(value)) {
    message.textContent =
      "⚠️ Weak password – add uppercase, number, and symbol!";
    message.classList.add("orange");
  } else if(regex.test(value)){
    message.textContent = "✅ Strong password 💪";
    message.classList.add("green");
  }
  else{
    message.textContent = "";
  }
  return true;
}
let btn_eye = document.querySelector(".showpass");
btn_eye.onclick = () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
     btn_eye.innerHTML = '<i class="fa fa-eye"></i>';
  } else {
    passwordInput.type = "password";
    btn_eye.innerHTML = '<i class="fa fa-eye-slash"></i>';
   ;
  }
};
const btn_creatpass = document.querySelector(".btn_creatpass");
btn_creatpass.onclick = () => {
  let randomLength = Math.floor(Math.random() * 5) + 12;
  generatePassword(randomLength);
};
function generatePassword(length) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|:,.<>?";

  let password = "";
  password += lower[Math.floor(Math.random() * lower.length)];
  password += upper[Math.floor(Math.random() * upper.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|:,.<>?";
  for (let i = 4; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  passwordInput.value = password;
  validate_password();
}

const inputsearch = document.querySelector(".search_by_name");
inputsearch.addEventListener("input", function (e) {
  console.log(e);
  const arrfilter = Sites_array.filter((ele) => {
    return ele.siteName.toLowerCase().includes(inputsearch.value.trim().toLowerCase());
  });
  displayTable(arrfilter);
});

let flag = localStorage.getItem("theme") || "light";
const toggletheme = document.querySelector(".darkToggle");
toggletheme.onclick = (e) => {
  console.log(e);
  flag = (flag === "dark") ? "light" : "dark";
  document.body.classList.toggle("dark");
   toggletheme.textContent = flag === "light" ?"🌙 Dark Mode" : "☀️ Light Mode" ;
  localStorage.setItem("theme", flag);
};

if (localStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
  toggletheme.textContent = "☀️ Light Mode";
  flag = "dark";
}
function getIcon(Url_site) {
  console.log(Url_site);
  const domain = new URL(Url_site).origin;
  console.log(domain);
  try {
    const domain = new URL(Url_site).origin;
    return `${domain}/favicon.ico`;
  } catch {
    return "https://img.icons8.com/ios-filled/50/internet.png";
  }
}

console.log(
  getIcon(
    "https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_url"
  )
);
let currentLang = "en";

const translations = {
  en: {
    hero_title: "🔐 PassBox — Securely manage and store your passwords with ease.",
    add_site_btn: "Add Site",
    footer_text: "Copyright © 2025 All rights reserved.",
     footer_madeby: "Made with ❤️ by Nour Yaseen",
    footer_contact: "Contact Me!",
     th_icon: "Icon",
    th_site: "Site",
    th_username: "Username",
    th_url :"Site URL",
    th_email: "Email",
    th_password: "Password",
    th_actions: "Actions",
     form_site: "Enter Site_Name... ",
  form_user: "Enter Username...",
  form_url : "Enter Site_URL...",
  form_email: "Enter your Email...",
  form_pass: "Enter Password...",
  form_add: "Save"
   
  },
  ar: {
    hero_title: "🔐 باس بوكس – خزّن كلمات مرورك بأمان",
    add_site_btn: "أضف موقع",
    footer_text: "حقوق النشر © موقعك 2025",
      footer_madeby: "صُنع بواسطة Nour Yaseen",
    footer_contact: "تواصل معي",
     th_icon: "أيقونة",
    th_site: "الموقع",
    th_url :"الرابط",
    th_username: "اسم المستخدم",
    th_email: "البريد الإلكتروني",
    th_password: "كلمة السر",
    th_actions: "إجراءات",
      form_site: "أدخل اسم الموقع...",
  form_user: "أدخل اسم المستخدم...",
  form_url :"ادخل رابط الموقع...",
  form_email: "أدخل البريد الإلكتروني...",
  form_pass: "أدخل كلمة السر...",
  form_add: "إضافة"
  }
};

function updateLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || key;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = translations[lang][key] || key;
  });

  document.getElementById("toggle-lang").textContent = lang === "ar" ? "English" : "Arabic";
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  currentLang = lang;
}
//toggle button
document.getElementById("toggle-lang").addEventListener("click", () => {
  const newLang = currentLang === "en" ? "ar" : "en";
  updateLanguage(newLang);
});
//update first time
updateLanguage(currentLang);

