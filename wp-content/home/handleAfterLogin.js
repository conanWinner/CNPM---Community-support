$(document).ready(function () {
  const fullName = localStorage.getItem("fullName");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const roleName = localStorage.getItem("roleName");

console.log(localStorage.getItem("fullName"));
console.log(localStorage.getItem("phoneNumber"));
console.log(localStorage.getItem("roleName"));


  if (fullName && phoneNumber && roleName) {
    // Thay đổi nội dung trên màn lớn
    $("#desktop-login").html(fullName);
    $("#desktop-login").attr("href", "./profile.html"); 

    // Thay đổi nội dung trên di động
    $("#mobile-login").html(fullName);
    $("#mobile-login").attr("href", "./profile.html"); 
  }
});
