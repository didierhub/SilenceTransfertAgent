export const sendInputFields = (formData, setFormData) => [
  
  {
    label: "Amount",
    id: "amount",
    type: "number",
    required: true,
    value: formData.amount,
    onChange: (e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 }),
  },
  {
    label: "Fees",
    id: "fees",
    type: "number",
    required: true,
    value: formData.fees,
    readOnly: true,
  },
  {
    label: "Total Amount",
    id: "totalAmount",
    type: "number",
    required: true,
    value: formData.totalAmount,
    readOnly: true,
  },
  
  {
    label: "Destination",
    id: "destination",
    type: "select",
    required: true,
    value: formData.destination,
    onChange: (e) => setFormData({ ...formData, destination: e.target.value, paymentMethod: '', accountDetails: {} }),
    options: ["rdc", "turkey", "autre"],
  },
  ...(formData.destination ? [{
    label: "Payment Method",
    id: "paymentMethod",
    type: "select",
    required: true,
    value: formData.paymentMethod,
    onChange: (e) => setFormData({ ...formData, paymentMethod: e.target.value, accountDetails: {} }),
    options: formData.destination === "rdc" ? ["mobilemoney", "bank", "paypal"]
           : formData.destination === "turkey" ? ["bank", "paypal"]
           : ["paypal"],
  }] : []),
  ...(formData.destination === "rdc" && formData.paymentMethod === "mobilemoney" ? [
    {
      label: "Account Phone Number",
      id: "accountPhoneNumber",
      type: "tel",
      required: true,
      value: formData.accountDetails.accountPhoneNumber,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, accountPhoneNumber: e.target.value } }),
      pattern: "\\+[0-9]{1,3}[0-9]{3,14}(?:x.+)?",
      placeholder: "+1234567890",
    },
    {
      label: "Account Name",
      id: "accountName",
      type: "text",
      required: true,
      value: formData.accountDetails.accountName,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, accountName: e.target.value } }),
    },
  ] : []),
  ...(formData.paymentMethod === "bank" ? [
    {
      label: "Bank Name",
      id: "bankName",
      type: "text",
      required: true,
      value: formData.accountDetails.bankName,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, bankName: e.target.value } }),
    },
    {
      label: "Account Name",
      id: "accountName",
      type: "text",
      required: true,
      value: formData.accountDetails.accountName,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, accountName: e.target.value } }),
    },
    {
      label: "IBAN",
      id: "ibam",
      type: "text",
      required: true,
      value: formData.accountDetails.ibam,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, ibam: e.target.value } }),
    },
  ] : []),
  ...(formData.paymentMethod === "paypal" ? [
    {
      label: "Account Email",
      id: "accountEmail",
      type: "email",
      required: true,
      value: formData.accountDetails.accountEmail,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, accountEmail: e.target.value } }),
    },
    {
      label: "Account Name",
      id: "accountName",
      type: "text",
      required: true,
      value: formData.accountDetails.accountName,
      onChange: (e) => setFormData({ ...formData, accountDetails: { ...formData.accountDetails, accountName: e.target.value } }),
    },
  ] : []),
  
  {
    label: "Image",
    id: "image",
    type: "file",
    required: true,
    onChange: (e) => setFormData({ ...formData, image: e.target.files[0] }),
  },
];






export const receiveInputFields = (formData, setFormData) => [
  {
    label: "Receiver Name",
    id: "receiverName",
    type: "text",
    required: true,
    value: formData.receiverName,
    onChange: (e) => setFormData({ ...formData, receiverName: e.target.value }),
  },
  {
    label: "Phone Number",
    id: "phoneNumber",
    type: "tel",
    required: true,
    value: formData.phoneNumber,
    onChange: (e) => setFormData({ ...formData, phoneNumber: e.target.value }),
    pattern: "\\+[0-9]{1,3}[0-9]{3,14}(?:x.+)?", // Pattern to include country code
    placeholder: "+1234567890", // Example placeholder with country code
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    required:true,
    value: formData.email,
    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
   
  },
  {
    label: "Receive Method",
    id: "receivedMethod",
    type: "select",
    required: true,
    value: formData.receivedMethod,
    onChange: (e) => setFormData({ ...formData, receivedMethod: e.target.value, paymentMethod: '' }), // Reset payment method when changing received method
    options: ["Bank", "Mobilemoney"],
  },
  ...(formData.receivedMethod === "Mobilemoney"
    ? [
        {
          label: "Mobilemoney Provider",
          id: "mobileMoneyProvider",
          type: "select",
          required: true,
          value: formData.paymentMethod,
          onChange: (e) => setFormData({ ...formData, paymentMethod: e.target.value }),
          options: ["orange", "Mobile Money", "mpesa", "PayPal"],
        },
      ]
    : formData.receivedMethod === "Bank"
    ? [
        {
          label: "Bank",
          id: "bank",
          type: "select",
          required: true,
          value: formData.paymentMethod,
          onChange: (e) => setFormData({ ...formData, paymentMethod: e.target.value }),
          options: ["equity", "autre"],
        },
      ]
    : []),

    {
      label:"amount to give",
      id: "amountTogive",
      type: "number",
      required:true,
      value: formData.amountTogive,
      onChange: (e) => setFormData({ ...formData, amountTogive: e.target.value }),
     
    },


  {
    label: "Withdraw Method",
    id: "withdrawMethod",
    type: "select",
    required: true,
    value: formData.withdrawMethod,
    onChange: (e) => setFormData({ ...formData, withdrawMethod: e.target.value, bankDetails: { ibam: '', accountName: '', bank: '' } }), // Reset bank details when changing withdraw method
    options: ["Cash", "TransferBank"],
  },
  ...(formData.withdrawMethod === "TransferBank"
    ? [
        {
          label: "IBAM",
          id: "ibam",
          type: "text",
          required: true,
          value: formData.bankDetails.ibam,
          onChange: (e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, ibam: e.target.value } }),
        },
        {
          label: "Account Name",
          id: "accountName",
          type: "text",
          required: true,
          value: formData.bankDetails.accountName,
          onChange: (e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, accountName: e.target.value } }),
        },
        {
          label: "Bank",
          id: "bankName",
          type: "text",
          required: true,
          value: formData.bankDetails.bank,
          onChange: (e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, bank: e.target.value } }),
        },
      ]
    : []),
    {
      label: "Image",
      id: "image",
      type: "file",
      required: true,
      onChange: (e) => setFormData({ ...formData, image: e.target.files[0] }),
    },

];


