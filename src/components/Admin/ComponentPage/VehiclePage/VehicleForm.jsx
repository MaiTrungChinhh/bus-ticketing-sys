import React, { useEffect, useState } from 'react';
import vehicleService from '../../../../services/vehicleService';

const VehicleForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        vehicleName: initialData.vehicleName || '',
        licensePlate: initialData.licensePlate || '',
        vehicleType: initialData.vehicleType?.id || '',
        seatCount: initialData.seatCount || '',
        status: initialData.status || '',
    });

    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const fetchVehicleTypes = async () => {
            try {
                const fetchedVehicleTypes = await vehicleService.fetchVehicleTypes();
                setVehicleTypes(fetchedVehicleTypes);
            } catch (err) {
                console.error('Error fetching vehicle types:', err);
            }
        };
        fetchVehicleTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === 'vehicleType') {
            const selectedType = vehicleTypes.find((type) => type.id === value);
            if (selectedType) {
                setFormData((prev) => ({ ...prev, seatCount: selectedType.seatCount || '' }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Form inputs */}
        </form>
    );
};

export default VehicleForm;
