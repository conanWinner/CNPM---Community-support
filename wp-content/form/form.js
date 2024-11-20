const provice_url = 'https://api.npoint.io/ac646cb54b295b9555be';
const district_url = 'https://api.npoint.io/34608ea16bebc5cffd42';
const ward_url = 'https://api.npoint.io/dd278dc276e65c68cdf5';

var province_list = [];
var district_list = [];
var ward_list = [];

$(document).ready(function () {
	getAllDataForDropdown();
	initProviceDropdown();
	hanldeOnchangeProvice();
	hanldeOnchangeDistrict();
	hanldeButtonGetData();
});

var getDataSelected = function () {
	return {
		ProvinceText: $('#Province').find('option:selected').text(),
		ProvinceId: $('#Province').val(),
		DistrictText: $('#District').find('option:selected').text(),
		DistrictId: $('#District').val(),
		WardText: $('#Ward').find('option:selected').text(),
		WardId: $('#Ward').val()
	};
};

var hanldeButtonGetData = function () {
	$('#BtnGetDataSelected').on('click', function (e) {
		e.preventDefault();
		let data = getDataSelected();
		$('#DataText').html('');
		$('#DataId').html('');

		$('#DataText').append('<li>Tỉnh/Thành Phố: <strong>' + data.ProvinceText + '</strong></li>');
		$('#DataText').append('<li>Quận/Huyện: <strong>' + data.DistrictText + '</strong></li>');
		$('#DataText').append('<li>Xã/Phường: <strong>' + data.WardText + '</strong></li>');

		$('#DataId').append('<li>Province Id: <strong>' + data.ProvinceId + '</strong></li>');
		$('#DataId').append('<li>District Id: <strong>' + data.DistrictId + '</strong></li>');
		$('#DataId').append('<li>Ward Id: <strong>' + data.WardId + '</strong></li>');
	});
};

var hanldeOnchangeProvice = function () {
	$('#Province').on('change', function () {
		var id = $(this).val();
		if (id) {
			$('#District').empty();

			var data_filter = district_list.filter((entry) => entry.ProvinceId === parseInt(id));

			singleSelectDropdown('District', 'Chọn Quận/Huyện', data_filter);
		}
	});
};

var hanldeOnchangeDistrict = function () {
	$('#District').on('change', function () {
		var id = $(this).val();
		if (id) {
			$('#Ward').empty();

			var data_filter = ward_list.filter((entry) => entry.DistrictId === parseInt(id));

			singleSelectDropdown('Ward', 'Chọn Xã/Phường', data_filter);
		}
	});
};

var initProviceDropdown = function () {
	var interval = setInterval(function () {
		if (province_list.length > 0) {
			singleSelectDropdown('Province', 'Chọn Tỉnh/Thành Phố', province_list);
			clearInterval(interval);
		}
	}, 100);
};

var getAllDataForDropdown = function () {
	getProviceData(function (list) {
		province_list = list;
	});

	getDistrictData(function (list) {
		district_list = list;
	});

	getWardData(function (list) {
		ward_list = list;
	});
};

var getProviceData = function (callback) {
	$.getJSON(provice_url, function (list) {
		callback(list);
	});
};

var getDistrictData = function (callback) {
	$.getJSON(district_url, function (list) {
		callback(list);
	});
};

var getWardData = function (callback) {
	$.getJSON(ward_url, function (list) {
		callback(list);
	});
};

var singleSelectDropdown = function (id, placeholder, data, selectItem) {
	setTimeout(function () {
		$('#' + id).select2({
			placeholder: placeholder,
			data: data.map(function (item) {
				return {
					id: item.Id,
					text: item.Name
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
					url: 'http://localhost:8080/api/files/images', // Đường dẫn API của server
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
		// Lấy giá trị của input họ và tên
		const fullName = $('input[name="fullName"]').val().trim();

		// Kiểm tra nếu input rỗng
		if (!fullName) {
			alert('Vui lòng nhập họ và tên!');
			return;
		}

		// Lấy giá trị của input số điện thoại
		const phoneNumber = $('input[name="phoneNumber"]').val().trim();

		// Kiểm tra nếu số điện thoại rỗng
		if (!phoneNumber) {
			alert('Vui lòng nhập số điện thoại!');
			return;
		}

		let regex = /^(0|\+84)[0-9]{9}$/;
		if (!regex.test(phoneNumber)) {
			alert('Số điện thoại không hợp lệ!');
			return;
		}

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

		var provinceText = $('#select2-Province-container').text().trim();
		if (provinceText === 'Chọn Tỉnh/Thành Phố') {
			alert('Vui lòng chọn Tỉnh/Thành Phố!');
			return;
		}
		provinceText = provinceText.slice(1);

		var districtText = $('#select2-District-container').text().trim();
		if (districtText === 'Chọn Quận/Huyện') {
			alert('Vui lòng chọn Quận/Huyện!');
			return;
		}
		districtText = districtText.slice(1);

		var wardText = $('#select2-Ward-container').text().trim();
		if (wardText === 'Chọn Xã/Phường') {
			alert('Vui lòng chọn Xã/Phường!');
			return;
		}
		wardText = wardText.slice(1);

		var address = $('input[name="addressDescription"]').val().trim();
		if (!address) {
			alert('Vui lòng nhập địa chỉ!');
			return;
		}

		var imageList = [];

		$('.images-preview img').each(function () {
			var imgSrc = $(this).attr('src');
			imageList.push(imgSrc); // Thêm src vào mảng
		});

		address = `${address}, ${wardText}, ${districtText}, ${provinceText}`;

		userId = localStorage.getItem('iduser');
		let time = new Date(deadline);
		$.ajax({
			url: 'http://localhost:8080/api/forms',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				fullName: fullName,
				phoneNumber: phoneNumber,
				address: address,
				target: target,
				deadline: time,
				images: imageList,
				temp: true,
				description: 'Hoàng cute quá',
				userId: userId
			}),
			success: function (response) {
				console.log(response);
				alert('upload thành công!');
				window.location.href = '/';
			},
			error: function (error) {
				console.log(error);
				alert('Có lỗi xảy ra khi đăng ký!');
			}
		});
	});
});
