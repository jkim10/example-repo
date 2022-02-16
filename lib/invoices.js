import axios from 'axios';
import { buildErrors } from '../utils/errors';


export const getInvoices = async (query = {}) => {
    try {
        const response = await axios({
            method: 'GET',
            withCredentials: true,
            url: 'https://random-data-api.com/api/invoice/random_invoice?size=15',
            params: query,
        });

        return [
            response.status,
            response.data || {},
        ];
    } catch (error) {
        return buildErrors(error, 'getInvoices');
    }
};