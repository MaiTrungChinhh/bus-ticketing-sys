import React from 'react';

const FormTicketInformation = () => {
    const submitForm = (e) => {
        e.preventDefault();
        // Logic xử lý gửi form
    };

    return (
        <div className="lg:w-10/12 md:w-10/12 sm:w-10/12 xs:w-full sm:ml-0 md:ml-0 lg:ml-0">
            <div className="border rounded-lg p-4 min-h-[100px]">
                <p className="text-center text-blue-600 uppercase font-bold">
                    Thông tin vé
                </p>
                <div id="info_ticket" className="mt-2">
                    <p>
                        Vị trí đang chọn: <strong id="vitridangchon">Chưa chọn</strong>
                    </p>
                    <p>
                        Tổng tiền vé: <strong id="tongtien" className="text-red-500">0</strong> VND
                    </p>
                </div>
            </div>
            <div className="clearfix"></div>
            <div className="border rounded-lg p-4 min-h-[400px] mt-4">
                <p className="text-center text-blue-600 uppercase font-bold">
                    Thông tin khách hàng
                </p>
                <form id="form-steps" onSubmit={submitForm}>
                    <fieldset>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block mb-1">Họ và tên</label>
                                <input
                                    type="text"
                                    className="form-control w-full border rounded-lg p-2"
                                    name="hoten"
                                    maxLength="20"
                                    placeholder="Nhập họ tên người đi"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control w-full border rounded-lg p-2"
                                    name="dienthoai"
                                    maxLength="12"
                                    placeholder="SĐT nhận tin nhắn xác nhận"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Email</label>
                                <input
                                    type="text"
                                    className="form-control w-full border rounded-lg p-2"
                                    name="email"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Điểm lên xe</label>
                                <select id="kieudon" className="form-control w-full border rounded-lg p-2">
                                    <option value="0">Bx.Chín Nghĩa</option>
                                    <option value="103">Thành phố Quảng Ngãi</option>
                                    <option value="2">Cây xăng ông Hùng</option>
                                    <option value="4">Tư Nghĩa</option>
                                    <option value="1">La Hà</option>
                                    <option value="6">Ngã 3 Chợ Tre</option>
                                    <option value="8">Ngã 3 Thanh Long</option>
                                    <option value="9">Ngã 3 Bà Đạt</option>
                                    <option value="10">Đức Nhuận</option>
                                    <option value="11">Quán Lát</option>
                                    <option value="12">Mỏ Cày</option>
                                    <option value="13">Thi Phổ</option>
                                    <option value="14">Cống Ông Liếu</option>
                                    <option value="15">Cầu Đập</option>
                                    <option value="16">Mộ Đức</option>
                                    <option value="17">Quán Bà Ba</option>
                                    <option value="18">Quán Hồng</option>
                                    <option value="19">Cầu Tú Sơn</option>
                                    <option value="20">Thạch Trụ</option>
                                    <option value="280">Cây Xăng Đại Thành</option>
                                    <option value="21">Tao Ngộ</option>
                                    <option value="22">Trà Câu</option>
                                    <option value="23">Đức Phổ</option>
                                    <option value="24">Phổ Cường</option>
                                    <option value="25">Chợ Cung</option>
                                    <option value="26">Phổ Khánh</option>
                                    <option value="27">Sa Huỳnh</option>
                                    <option value="28">Tam Quan</option>
                                    <option value="29">Bình Định</option>
                                    <option value="282">Phù Mỹ - B.Đinh</option>
                                    <option value="283">Bồng Sơn - B.Định</option>
                                    <option value="284">Quán cơm B.Định 1</option>
                                    <option value="285">Phù Cát B.Đình</option>
                                    <option value="286">An Nhơn B.Định</option>
                                    <option value="287">TP Qui Nhơn</option>
                                    <option value="288">Sông Cầu</option>
                                    <option value="56">Tuy Hòa</option>
                                    <option value="289">Vạn Giã</option>
                                    <option value="290">Nha Trang</option>
                                    <option value="291">Cam Ranh</option>
                                </select>
                                <div className="border border-red-500 p-4 mt-2 hidden" id="diemdoninffo"></div>
                            </div>
                            <div className="hidden" id="diemdon">
                                <input
                                    type="text"
                                    className="form-control w-full border rounded-lg p-2"
                                    name="diemdon"
                                    id="diemdoninput"
                                    placeholder="Nhập nơi đón"
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Mã giảm giá</label>
                                <input
                                    type="text"
                                    className="form-control w-full border rounded-lg p-2"
                                    name="magiamgia"
                                />
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <div id="pictureUploading" className="col-sm-24 mt-2">
                            <span className="fa fa-refresh fa-spin"></span> Đang tải dữ liệu...
                        </div>
                        <div className="form-section mt-4">
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="btn bg-blue-500 text-white rounded-lg px-4 py-2"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="fa fa-arrow-left"></i> Quay lại
                                </button>
                                <button
                                    name="submit"
                                    type="submit"
                                    id="submit"
                                    className="btn bg-green-500 text-white rounded-lg px-4 py-2"
                                >
                                    <i className="fa fa-arrow-right"></i> Tiếp tục
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default FormTicketInformation;
