import {
  postUser,
  login,
  ADMIN_ROLE,
  USER_ROLE,
  URLIndex,
  postORG,
} from "../../common/common.js";

$(document).ready(function () {
  // =============== Change view =====================
  // Chuyển sang form đăng nhập
  $("#switch-to-login, #signIn").click(function () {
    $(".sign-in-container").css("left", "0");
    $(".sign-up-container").css("left", "100%");
    $(".overlay-container").removeClass("active");
  });

  // Chuyển sang form đăng ký người dùng
  $("#switch-to-register, #switch-to-user").click(function () {
    $("#register-organization").css("opacity", "0");
    $(".sign-up-container").removeClass("hidden");
    $(".sign-in-container").css("left", "-100%");
    $("#register-user").css("opacity", "1");
    $(".sign-up-container").css("left", "0");
    $(".overlay-container").addClass("active");
  });

  // Chuyển sang form đăng ký tổ chức
  $("#switch-to-org").click(function () {
    $("#register-organization").css("opacity", "1");
    $(".sign-in-container").css("left", "-100%");
    $("#register-user").css("opacity", "0");
    $(".sign-up-container").css("left", "0");
    $(".overlay-container").addClass("active");
  });

  // Quay lại đăng ký người dùng từ đăng ký tổ chức
  $("#switch-back-to-user").click(function () {
    $("#register-organization").css("opacity", "0");
    $("#register-user").css("opacity", "1");
  });

  // ============ Set role when click radio button ================
  const roleSelection = document.querySelector(".role-selection");
  roleSelection.innerHTML = `
      <label>
          <input type="radio" name="login-role" value="${USER_ROLE}" required />
          <span class="radio-label">Người dùng</span>
      </label>
      <label>
          <input type="radio" name="login-role" value="${ADMIN_ROLE}" required />
          <span class="radio-label">Tổ chức</span>
      </label>
  `;

  //============= Phone ===============
  const phoneInput = document.getElementById("user-phone");

  phoneInput.addEventListener("input", () => {
    let phone = phoneInput.value;
    let regex = /^(0|\+84)[0-9]{9}$/;

    if (!regex.test(phone)) {
      phoneInput.setCustomValidity("Số điện thoại không hợp lệ.");
    } else {
      phoneInput.setCustomValidity("");
    }
  });

  // ================= CCCD ==============
  const cccdInput = document.getElementById("user-cccd");

  cccdInput.addEventListener("input", () => {
    const cccd = cccdInput.value;
    const regex = /^(0)[0-9]{11}$/;

    if (!regex.test(cccd)) {
      cccdInput.setCustomValidity("Vui lòng nhập chính xác CCCD của bạn.");
    } else {
      cccdInput.setCustomValidity("");
    }
  });

  // ===============  password ======================
  const passwordInput = document.getElementById("user-password");

  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!regex.test(password)) {
      passwordInput.setCustomValidity(
        "Mật khẩu của bạn phải chứa ít nhất 6 kí tự\n ít nhất một chữ số \nmột chữ thường, một chữ hoa \n và một ký tự đặc biệt. "
      );
    } else {
      passwordInput.setCustomValidity("");
    }
  });

  //===============  Register USER===============

  /*
  "phoneNumber": "0374798126",
  "password": "thang2506",
  "fullName": "conanWinner",
  "cccd": "045204000999",
  "address": "Quảng Trị"
*/

  $("#register-user-form").submit(function (e) {
    e.preventDefault();
    const name = $("#user-name").val();
    const phoneNumber = $("#user-phone").val();
    const password = $("#user-password").val();
    const cccd = $("#user-cccd").val();
    const address = $("#user-address").val();

    console.log(name, phoneNumber, password, cccd, address);

    $.ajax({
      url: postUser,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        phoneNumber: phoneNumber,
        password: password,
        fullName: name,
        cccd: cccd,
        address: address,
      }),
      success: function (response) {
        console.log(response);
        alert("Đăng ký thành công!, vui lòng đăng nhập.");
      },
      error: function (error) {
        console.log(error);
        alert("Có lỗi xảy ra khi đăng ký!");
      },
    });
  });

  // ==============   Login  ===============
  $("#login-form").submit(function (e) {
    e.preventDefault();
    const phoneNumber = $("#login-phone").val();
    const password = $("#login-password").val();
    const whoAreYou = $('input[name="login-role"]:checked').val();

    if (!whoAreYou) {
      alert("Vui lòng chọn vai trò đăng nhập!");
    } else {
      console.log(`Đăng nhập với vai trò: ${whoAreYou}`);
    }
    $.ajax({
      url: login,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ phoneNumber, password, whoAreYou }),
      success: function (response) {
        const data = response.result;
        const userData = data.result;
        console.log(JSON.stringify(data, null, 2));
        // for (const key in response) {
        //   if (response.hasOwnProperty(key)) {
        //     console.log(`${key}: ${JSON.stringify(response[key])}`);
        //   }
        // }
        window.location.href =
          "http://127.0.0.1:5500/Community-Support-Project/index.html";

        var fullName = userData.fullName;
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("phoneNumber", phoneNumber);
        localStorage.setItem("roleName", whoAreYou);

        alert("Đăng nhập thành công!");
        window.location.href = URLIndex;
      },
      error: function (error) {
        console.log(error);
        console.log(phoneNumber + " " + password + " " + whoAreYou);
        alert("Sai thông tin đăng nhập!");
      },
    });
  });
});

//===============  Register ORG===============

// {
//   "phoneNumber": "",
//   "password": "",
//   "organizationName": "",
//   "representativeName": "",
//   "cccd": "",
//   "address": "",
//   "description": ""
// }

$("#register-organization-form").submit(function (e) {
  e.preventDefault();
  const phoneNumber = $("#org-phone").val();
  const password = $("#org-password").val();
  const organizationName = $("#org-representation_name").val();
  const representativeName = $("#org-name").val();
  const cccd = $("#org-cccd").val();
  const address = $("#org-address").val();
  const description = $("#org-description").val();

  console.log(
    phoneNumber,
    password,
    organizationName,
    representativeName,
    cccd,
    address,
    description
  );

  $.ajax({
    url: postORG,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      phoneNumber,
      password,
      organizationName,
      representativeName,
      cccd,
      address,
      description,
    }),
    success: function (response) {
      console.log(response);
      alert("Đăng ký thành công!, vui lòng đăng nhập.");
      $("#org-phone").val("");
      $("#org-password").val("");
      $("#org-representation_name").val("");
      $("#org-name").val("");
      $("#org-cccd").val("");
      $("#org-address").val("");
      $("#org-description").val("");
    },
    error: function (error) {
      console.log(error);
      alert("Có lỗi xảy ra khi đăng ký!");
      $("#org-phone").val("");
      $("#org-password").val("");
      $("#org-representation_name").val("");
      $("#org-name").val("");
      $("#org-cccd").val("");
      $("#org-address").val("");
      $("#org-description").val("");
    },
  });
});
