import {
  formAPI,
  confirmFormAPI,
  ADMIN_ROLE,
  USER_ROLE,
} from "../../common/common.js";

$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var idForm = urlParams.get("id");
  var idOrganization = localStorage.getItem("iduser");
  var role_Name = localStorage.getItem('roleName')

  if (role_Name == USER_ROLE) {
    $("#showModalBtn").css("display", "none");
  }

  showModal();
  getFormData(idForm, role_Name);
  confirmForm(idForm, idOrganization, confirmFormAPI);
});

var getFormData = function (idForm, role_Name) {
  var breadcrum = $(".breadcrumb_last");
  var datetime = $(".datetime");
  var entrytitle = $(".entrytitle");
  var div_images = $(".images");
  var elementCaption = $(".wp-element-caption");
  var content = $(".entry-content");
  var account = $(".information_account");

  // Gọi API để lấy dữ liệu
  $.ajax({
    url: formAPI + "/" + idForm, // Thay đổi với URL API thực tế
    method: "GET",
    success: function (response) {
      var data = response.result;
      console.log(data);

      if (data.organization != null) {
        $("#showModalBtn").css("display", "none");
        $("#confirmationState").html(
          `<b><i>${data.organization.name}</i> đã xác nhận</b>`
        );

        $("#name_if").text(data.fullName);
        if (data.bankAccount != null) {
          $("#accountHolder_if").text(data.bankAccount.accountHolder);
          $("#accountNumber_if").text(data.bankAccount.accountNumber);
          $("#bankName_if").text(data.bankAccount.bankName);
          $("#transferContent_if").text(data.bankAccount.transferContent);
        }
      } else {
        if (role_Name == ADMIN_ROLE) $("#showModalBtn").css("display", "block");
      }

      const date = new Date(data.dateOfApplication);
      const deadline = date.toLocaleDateString("en-GB"); // dd/MM/yyyy

      breadcrum.text(data.fullName);
      datetime.text(deadline);
      entrytitle.text("Cặp lá yêu thương: " + data.fullName);

      data.images.forEach((element) => {
        var figure = $("<figure>")
          .css("margin", "auto")
          .addClass("wp-block-image size-large");

        var imgElement = $("<img>").attr({
          style: "max-width: 700px;",
          loading: "lazy",
          decoding: "async",
          width: "1024",
          height: "1024",
          src: element,
          alt: "Cặp lá yêu thương - " + data.fullName,
          sizes: "(max-width: 1024px) 100vw, 1024px",
        });

        var figcaptionElement = $("<figcaption>")
          .addClass("wp-element-caption")
          .text(data.fullName);

        figure.append(imgElement).append(figcaptionElement);

        div_images.append(figure);
      });

      elementCaption.text(data.fullName);
      content.html(data.description);
    },
    error: function (xhr, status, error) {
      alert("Có lỗi xảy ra khi gọi API: " + error);
    },
  });
};

var confirmForm = function (idForm, idOrganization, confirmFormAPI) {
  $("#transferForm").submit(function (event) {
    event.preventDefault(); // Ngừng hành động mặc định của form

    confirmFormAPI = confirmFormAPI
      .replace("{formId}", idForm)
      .replace("{organizationId}", idOrganization);

    const accountHolder = $("#accountName").val();
    const accountNumber = $("#accountNumber").val();
    const transferContent = $("#transferContent").val();
    const bankName = $("#bankName").val();

    if (
      accountHolder == "" ||
      accountNumber == "" ||
      transferContent == "" ||
      bankName == ""
    ) {
      alert("Có trường đang để trống!");
    }

    var data = JSON.stringify({
      accountHolder,
      accountNumber,
      transferContent,
      bankName,
    });

    $.ajax({
      url: confirmFormAPI,
      method: "POST",
      contentType: "application/json",
      data: data,
      success: function (response) {
        if (response.code == 1000) {
          alert("Thông tin đã được xác nhận!");
          $("#popupModal").fadeOut(); // Đóng modal sau khi xác nhận
        }
      },
      error: function (xhr, status, error) {
        alert("Có lỗi xảy ra khi gọi API: " + error);
      },
    });
  });
};

var showModal = function () {
  $("#showModalBtn").click(function () {
    $("#popupModal").fadeIn(); // Hiển thị modal với hiệu ứng fade in
  });

  $("#closeBtn").click(function () {
    $("#popupModal").fadeOut(); // Ẩn modal với hiệu ứng fade out
  });

  $(window).click(function (event) {
    if ($(event.target).is("#popupModal")) {
      $("#popupModal").fadeOut(); // Ẩn modal khi click ra ngoài
    }
  });
};
