import {
  formAPI,
  URLchitietlachualanh,
  URLDetailContribution,
  getContributionsAPI,
} from "../../common/common.js";

$(document).ready(function () {
  // Gọi API để lấy dữ liệu
  $.ajax({
    url: formAPI, // Thay đổi với URL API thực tế
    method: "GET",
    success: function (response) {
      // Giả sử API trả về một mảng các đối tượng chứa thông tin hàng
      var rows = response.result; // 'data' là mảng các đối tượng, nếu tên khác, thay đổi phù hợp


      console.log(rows)
      // Lặp qua các đối tượng trong mảng và thêm vào bảng
      rows.forEach(function (item, index) {
        let state = "";
        const date = new Date(item.deadline);
        const deadline = date.toLocaleDateString("en-GB"); // dd/MM/yyyy

        if (item.organization == null) {
          state = "Chưa tổ chức nào xác nhận";
        } else {
          state = "Đã xác nhận";
          if(item.done == true){
              state = "Đã giải ngân"
          }
        }
        // Tạo một hàng mới
        var row =
          '<div class="qh_c">' +
          "<div>" +
          (index + 1) +
          "</div>" +
          "<div>" +
          item.id +
          "</div>" +
          "<div>" +
          item.fullName +
          "</div>" +
          "<div>" +
          deadline +
          "</div>" +
          "<div>" +
          item.address +
          "</div>" +
          "<div>" +
          item.phoneNumber +
          "</div>" +
          '<div style="color: rgb(252, 3, 53)">' +
          state +
          "</div>" +
          "<div>" +
          (item.organization != null
            ? '<a style="text-decoration: underline;" href="' +
              URLDetailContribution +
              "?idForm=" +
              item.id +
              '">Xem các đóng góp</a>'
            : "Chưa xem được đóng góp") +
          "</div>" +
          '<div><a style="text-decoration: underline;" href="' +
          URLchitietlachualanh +
          "?idForm=" +
          item.id +
          '">Chi tiết</a></div>' +
          "</div>";

        // Thêm hàng mới vào phần tử có class .abody
            $(".abody").append(row);
      });
    },
    error: function (xhr, status, error) {
      console.error("Có lỗi xảy ra khi gọi API: " + error);
    },
  });
});
