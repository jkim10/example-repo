import { getInvoices } from "../../../lib/invoices";
export default async (req, res) => {
    const { query } = req;
    switch (req.method) {
        case 'GET':
            const [status, output] = await getInvoices(query);
            res.status(status).json(output);
            break;
    }
};
