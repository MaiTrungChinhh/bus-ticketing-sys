import axiosInstance from "./Axios";

export const fetchVehicles = async () => {
  const response = await axiosInstance.get("/vehicles");
  return response.data.result.contents || [];
};

export const fetchInactiveVehicles = async () => {
  const response = await axiosInstance.get("/vehicles");
  const vehicles = response.data.result.contents || [];
  return vehicles.filter((vehicle) => vehicle.status === 'OUT_OF_SERVICE')
};

export const fetchVehicleTypes = async () => {
  const response = await axiosInstance.get("/vehicleTypes");
  return response.data.result.contents || [];
};

export const addVehicleType = async (vehicleTypeName) => {
  const response = await axiosInstance.post("/vehicleTypes", { vehicleTypeName });
  return response.data;
};

export const addVehicle = async (vehicleData) => {
  const response = await axiosInstance.post("/vehicles", vehicleData);
  return response.data;
};

export const updateVehicle = async (vehicleId, payload) => {
  const response = await axiosInstance.put(`/vehicles/${vehicleId}`, payload);
  return response.data;
};

export const updateVehicleStatus = async (vehicleId, status) => {
  await axiosInstance.patch(`/vehicles/${vehicleId}`, { status });
};

export const updateVehicleType = async (id, data) => {
  const response = await axiosInstance.put(`/vehicleTypes/${id}`, data);
  return response.data;
};

export const deleteVehicle = async (vehicleId) => {
  await axiosInstance.delete(`/vehicles/${vehicleId}`);
};

export const deleteVehicleType = async (vehicleTypeId) => {
  await axiosInstance.delete(`/vehicleTypes/${vehicleTypeId}`);
};

export const fetchVehiclesByIdType = async (id) => {
  if (!id) {
    throw new Error("ID type is required");
  }
  const response = await axiosInstance.get(`/vehicles/type/${id}`);
  return response.data.result || [];
}; 