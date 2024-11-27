import axiosInstance from './Axios';

export const fetchAllVehicleType = async () => {
  let allData = [];
  let page = 1;
  let pageSize = 10;
  let totalPages = 1;

  try {
    do {
      const response = await axiosInstance.get(
        `vehicleTypes?page=${page}&pageSize=${pageSize}`
      );
      const data = response.data;
      if (data.result && data.result.contents) {
        allData = [...allData, ...data.result.contents];
        totalPages = data.result.totalPages;
        page += 1;
      }
    } while (page <= totalPages);

    return allData;
  } catch (error) {
    return [];
  }
};
