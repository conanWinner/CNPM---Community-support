import {
  uploadImage,
  contributionsAPI,
  provice_url,
  formAPI,
} from "../../common/common.js";

var province_list = [];

$(document).ready(function () {
	getAllDataForDropdown();
	initProviceDropdown();
	hanldeButtonGetData();
});

var getDataSelected = function () {
	return {
		ProvinceText: $('#form').find('option:selected').text(),
		ProvinceId: $('#form').val()
	};
};

var hanldeButtonGetData = function () {
	$('#BtnGetDataSelected').on('click', function (e) {
		e.preventDefault();
		let data = getDataSelected();
		$('#DataText').html('');
		$('#DataId').html('');

		$('#DataText').append('<li>Tỉnh/Thành Phố: <strong>' + data.fullName + '</strong></li>');

		$('#DataId').append('<li>Province Id: <strong>' + data.id + '</strong></li>');
	});
};

var initProviceDropdown = function () {
	var interval = setInterval(function () {
		if (province_list.length > 0) {
			singleSelectDropdown('form', 'Biểu mẫu', province_list);
			clearInterval(interval);
		}
	}, 100);
};

var getAllDataForDropdown = function () {
	getProviceData(function (list) {
		province_list = list.result;
	});
};

var getProviceData = function (callback) {
	$.getJSON(formAPI, function (list) {
    callback(list);
  });
};

var singleSelectDropdown = function (id, placeholder, data, selectItem) {
	setTimeout(function () {
		$('#' + id).select2({
			placeholder: placeholder,
			data: data.map(function (item) {
				return {
					id: item.id,
					text: item.fullName
				};
			}),
			allowClear: true
		});
	}, 200);

	if (selectItem !== null) {
		setTimeout(function () {
			$('#' + id)
				.val(selectItem)
				.trigger('change');
		}, 200);
	}
};

//
$(document).ready(function () {
	$('#uploadImage').on('change', function (e) {
		e.preventDefault();
		// Lấy danh sách các file từ input
		const files = this.files;

		// Kiểm tra nếu có file nào được chọn
		if (files.length > 0) {
			$.each(files, function (index, file) {
				// Tạo FormData để gửi file qua API
				const formData = new FormData();
				formData.append('file', file);

				// Gửi API tới server
				$.ajax({
					url: uploadImage, // Đường dẫn API của server
					type: 'POST',
					data: formData,
					contentType: false, // Bắt buộc phải đặt false để gửi FormData
					processData: false, // Không xử lý dữ liệu
					success: function (response) {
						// Nhận link URL từ server (giả định response trả về URL)
						const imageUrl = response.result; // Giả định response có { data: url }

						// Tạo thẻ div để chứa ảnh xem trước và nút xóa
						const imgContainer = $(`
                        <div class="image-upload" style="padding: 2px 8px; position: relative;">
                            <span class="remove-image" style="position: absolute; top: 15%; right: 10%; color: #000; font-weight: 700; cursor: pointer;">X</span>
                            <img src="${imageUrl}" alt="Ảnh xem trước" style="width: 100px; height: 100px; border-radius: 2px;">
                        </div>
                    `);

						// Thêm thẻ ảnh vào `.images-preview`
						$('.images-preview').append(imgContainer);
					},
					error: function (xhr, status, error) {
						console.error('Lỗi khi tải lên file:', error);
						alert('Tải ảnh lên server thất bại.');
					}
				});
			});
		}

		// Reset input file để có thể chọn cùng file lần sau
		$(this).val('');
	});

	// Xóa ảnh khi nhấn nút X
	$(document).on('click', '.remove-image', function () {
		$(this).parent().remove();
	});
});

$(document).ready(function () {
	$('input.wpcf7-submit').on('click', function (e) {
		e.preventDefault(); // Ngăn chặn hành động mặc định của form

		const target = Number($('input[name="target"]').val().trim()); // Chuyển sang số (có thể nguyên hoặc thực)

		// Kiểm tra nếu trường "target" rỗng
		if (!target) {
			alert('Vui lòng nhập chỉ tiêu!');
			return;
		}

		// Kiểm tra xem giá trị có phải là số hợp lệ
		if (isNaN(target) || Number(target) <= 0) {
			alert('Vui lòng nhập một số hợp lệ lớn hơn 0!');
			return;
		}

		// Lấy giá trị từ input "deadline"
		const deadline = $('input[name="deadline"]').val().trim();

		// Kiểm tra nếu giá trị rỗng
		if (!deadline) {
			alert('Vui lòng chọn thời gian liên lạc!');
			return;
		}

		if (deadline < new Date().toISOString().split('T')[0]) {
			alert('Thời gian liên lạc không hợp lệ!');
			return;
		}

		let selectedText = $('#form option:selected').text().trim();
		if (selectedText === 'Chọn Tỉnh/Thành Phố') {
			alert('Vui lòng chọn Tỉnh/Thành Phố!');
			return;
		}
		selectedText = selectedText;
		let selectedValue = $('#form').val();

		var imageList = [];

		$('.images-preview img').each(function () {
			var imgSrc = $(this).attr('src');
			imageList.push(imgSrc); // Thêm src vào mảng
		});

		let time = new Date(deadline);
		$.ajax({
			url: contributionsAPI,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				amount: target,
				date: time,
				formId: selectedValue,
				content: 'Chưa có nội dung',
				images: imageList
			}),
			success: function (response) {
				console.log(response);
				alert('Đăng thông tin thành công!');
				window.location.href = '/';
			},
			error: function (error) {
				console.log(error);
				alert('Biểu mẫu chưa được xác nhận. Vui lòng chờ xác nhận từ quản trị viên!');
			}
		});
	});
});
