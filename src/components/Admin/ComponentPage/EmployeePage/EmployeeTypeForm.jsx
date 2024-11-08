import React, { useState } from 'react';

const EmployeeTypeForm = ({ initialData, onSubmit, onCancel }) => {
    const [nameEmployeeType, setNameEmployeeType] = useState(initialData?.nameEmployeeType || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ nameEmployeeType });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
            <h2 className="text-2xl mb-4">{initialData ? 'Chỉnh sửa loại nhân viên' : 'Thêm loại nhân viên'}</h2>
            <div className="mb-4">
                <label className="block mb-2">Loại nhân viên</label>
                <input
                    type="text"
                    value={nameEmployeeType}
                    onChange={(e) => setNameEmployeeType(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="flex justify-end">
                <button type="button" onClick={onCancel} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">
                    Hủy
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default EmployeeTypeForm;
