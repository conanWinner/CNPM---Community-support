import { formAPI, URLchitietlachualanh } from "../../common/common.js";

$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var idForm = urlParams.get("id");

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
});
