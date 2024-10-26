import { URLIndex } from "./common";

function login() {
  const _phoneNumber = localStorage.getItem("phoneNumber");
  console.log(_phoneNumber);
  return _phoneNumber ? _phoneNumber : null;
}

function logout() {
  localStorage.removeItem("phoneNumber");
}

$(document).ready(function () {
  if (login() != null) {
    $(".icon_user").css("display", "inline");
    $(".btn-sign-in").css("display", "none");
  }

  // ==================== btn logout =================
  $("#btn-log-out").on("click", function () {
    $(".icon_user").css("display", "none");
    $(".btn-sign-in").css("display", "inline");
    logout();
    window.location.href = URLIndex;
  });
});
