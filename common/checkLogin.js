import { URLIndex, ADMIN_ROLE, USER_ROLE } from "./common.js";

function login() {
  const _phoneNumber = localStorage.getItem("phoneNumber");
  const _iduser = localStorage.getItem("iduser");
  const _roleName = localStorage.getItem("roleName");

  console.log(_iduser + " " + _phoneNumber);
  return _iduser ? _iduser : null;
}

function logout() {
  localStorage.removeItem("phoneNumber");
  localStorage.removeItem("fullName");
  localStorage.removeItem("iduser");
  localStorage.removeItem("roleName");
}

$(document).ready(function () {
  if (login() != null) {
    $(".icon_user").css("display", "inline");
    $(".btn-sign-in").css("display", "none");
    const _roleName = localStorage.getItem("roleName");
    if (_roleName == ADMIN_ROLE){
      console.log("role name: " + _roleName)
      $("#menu-item-469\\ for-your-organization").css("display", "block");
    }else{
      console.log("role name: " + _roleName);
      $("#menu-item-469\\ for-your-organization").css("display", "none");
    }
  }else{
    console.log("check not login")
    $("#menu-item-469\\ for-your-organization").css("display", "none");
  }

  // ==================== btn logout =================
  $("#btn-log-out").on("click", function () {
    $(".icon_user").css("display", "none");
    $(".btn-sign-in").css("display", "inline");
    logout();
    window.location.href = URLIndex;
  });
});
