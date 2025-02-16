import paystack from "../services/paystack"; // Adjust path as needed

export const initializePayment = async (buyerEmail: string, amount: number, metadata: any) => {
  const response = await paystack.post('/transaction/initialize', {
    email: buyerEmail,
    amount: amount * 100, // Convert to kobo (smallest Paystack currency unit)
    metadata,
    callback_url: 'http://localhost:8000/api/v1/escrow/fundsRelease', // Update with your actual callback
  });
  return response.data; // Contains authorization URL and reference
};


export const verifyPayment = async (reference: string) => {
    const response = await paystack.get(`/transaction/verify/${reference}`);
    return response.data; // Contains transaction details
  };


  export const transferFunds = async (amount: number, recipientCode: string) => {
    const response = await paystack.post('/transfer', {
      source: 'balance',
      amount: amount * 100, // Convert to kobo
      recipient: recipientCode,
      reason: 'Escrow transaction release',
    });
    return response.data; // Contains transfer details
  };