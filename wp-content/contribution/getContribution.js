import {
  getContributionsAPI,
  URLchitietlachualanh,
} from "../../common/common.js";

$(document).ready(function(){
    var urlParams = new URLSearchParams(window.location.search);
    var idForm = urlParams.get("id");
    console.log("test")
    getContributeData(idForm, getContributionsAPI, URLchitietlachualanh);
})

var getContributeData = function (idForm, getContributionsAPI) {
  getContributionsAPI = getContributionsAPI.replace("{formId}", idForm);
  console.log(getContributionsAPI);

  $.ajax({
    url: getContributionsAPI,
    method: "GET",
    success: function (response) {
      var rows = response.result;
      console.log(rows);

      rows.forEach(function (item, index){
        const date = new Date(item.date);
        
        // Lấy giờ, phút, giây
        const time = date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        // Lấy ngày, tháng, năm
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        // Kết hợp lại thành định dạng "hh:mm:ss dd/MM/yyyy"
        const formattedDateTime = time + " " + formattedDate;

        var row =
          '<div class="qh_c">' +
          "<div>" +
          (index + 1) +
          "</div>" +
          "<div>" +
          item.userResponse.fullName +
          "</div>" +
          "<div>" +
          item.amount +
          "</div>" +
          "<div>" +
          formattedDateTime +
          "</div>" +
          "<div>" +
          item.content +
          "</div>" +
          "<div>" +
          item.form.name +
          "</div>" +
          '<div><a style="text-decoration: underline;" href="' +
          URLchitietlachualanh +
          "?id=" +
          item.form.id +
          '">Chi tiết</a></div>' +
          "</div>";

        // Thêm hàng mới vào phần tử có class .abody
        $(".abody").append(row);
      })

    },
    error: function (error) {},
  });
};
