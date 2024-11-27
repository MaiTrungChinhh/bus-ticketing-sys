import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/accounts';

const accountService = {
    fetchAccounts: async () => {
        const response = await axios.get(BASE_URL);
        return response.data;
    },
};

export default accountService;
