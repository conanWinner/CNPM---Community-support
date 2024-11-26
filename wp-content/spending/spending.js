import { spendingAPI} from "../../common/common.js";

$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var idForm = urlParams.get("idForm");
  showModal();
  showTTGiaiNganModal(idForm, spendingAPI);
  postData(idForm, spendingAPI);
});

var postData = function (idForm, spendingAPI) {
  $("#spendingForm").submit(function (event) {
    event.preventDefault();
    const sotienthu = parseFloat($("#sotienthu").text().replace(/[^\d]/g, ""));
    const amount = parseFloat($("#amount").val());
    var description = CKEDITOR.instances.description.getData();
    // Lấy thời gian hiện tại
    let currentTime = new Date();
    // Chuyển đổi thời gian sang múi giờ Việt Nam (UTC+7)
    let options = {
      timeZone: "Asia/Ho_Chi_Minh", // Múi giờ Việt Nam
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    // Chuyển đổi thời gian sang chuỗi theo múi giờ Việt Nam
    let vietnamTime = currentTime.toLocaleString("en-US", options);
    // Chuyển đổi sang định dạng ISO 8601 và gửi đi (giả sử là UTC)
    let isoString = new Date(vietnamTime).toISOString(); // Lấy ISO string chuẩn UTC

    spendingAPI = spendingAPI.replace("{formId}", idForm);

    if (amount == "" || description == "") {
      alert("Có trường đang để trống!");
    } else {
        console.log("amount" + amount)
        console.log("sotienthu" + sotienthu);
      if (amount < sotienthu) {
        alert("Số tiền giải ngân không được nhỏ hơn số tiền đã thu");
      }else{
        var data = JSON.stringify({
          amount: amount,
          content: description,
          date: isoString,
        });

        $.ajax({
          url: spendingAPI,
          method: "POST",
          contentType: "application/json",
          data: data,
          success: function (response) {
            if (response.code == 1000) {
              alert("Thông tin đã được xác nhận!");
              $("#popupModal").fadeOut(); // Đóng modal sau khi xác nhận
              $("#showModalBtn").css("display", "none");
              $("#xem-thong-tin-giai-ngan").css("display", "block");
            }
          },
          error: function (xhr, status, error) {
            alert("Có lỗi xảy ra khi gọi API: " + error);
          },
        });
      }
    }

    
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

var showTTGiaiNganModal = function (idForm, spendingAPI) {
    spendingAPI = spendingAPI.replace("{formId}", idForm);
  $("#xem-thong-tin-giai-ngan").click(function () {
    $.ajax({
      url: spendingAPI,
      method: "GET",
      contentType: "application/json",
      success: function (response) {
        if (response.code == 1000) {
          var data = response.result;
          const amount = data.amount;
          const description = data.content;
          const currentTime = data.date;
          const nameOfForm = data.form.name;

          // Chuyển đổi ISO string thành đối tượng Date
          const dateObj = new Date(currentTime);

          // Định dạng thời gian theo hh:mm:ss dd/mm/yyyy
          const formattedTime = dateObj.toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour12: false, // Đảm bảo là định dạng 24 giờ
          });

          // Cập nhật thông tin vào modal
          $("#displayAmount").text(amount + "đ");
          $("#displayDescription").html(description);
          $("#displayTime").text(formattedTime);
          $("#displayName").text(nameOfForm);

          // Mở modal
          $("#infoModal").fadeIn();
        }
      },
      error: function (xhr, status, error) {
        alert("Có lỗi xảy ra khi gọi API: " + error);
      },
    });

  });

  // Sự kiện khi nút "X" đóng modal thông tin
  $("#closeInfoBtn").click(function () {
    $("#infoModal").fadeOut();
  });

  // Đảm bảo khi click bên ngoài modal, nó sẽ đóng
  $(window).click(function (event) {
    if ($(event.target).is("#infoModal")) {
      $("#infoModal").fadeOut();
    }
  });
};
