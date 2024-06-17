export const inputFields = (formData, setFormData) => [
    {
      label: "Amount to transfer",
      id: "amount",
      type: "number",
      required: true,
      value: formData.amount,
      onChange: (e) => setFormData({ ...formData, amount: e.target.value }),
    },
    {
      label: "Reason for the transfer",
      id: "reason",
      type: "textarea",
      rows: 8,
      required: true,
      value: formData.reason,
      onChange: (e) => setFormData({ ...formData, reason: e.target.value }),
    },
    {
      label: "Destination",
      id: "destination",
      type: "select",
      required: true,
      value: formData.destination,
      onChange: (e) => setFormData({ ...formData, destination: e.target.value }),
      options: ["Drc", "Turkey", "Autre"], // Add destination options
    },
    {
      label: "Payment Method",
      id: "paymentMethod",
      type: "select",
      required: formData.destination === "Drc", // Make it required only if destination is Drc
      value: formData.paymentMethod,
      onChange: (e) => setFormData({ ...formData, paymentMethod: e.target.value }),
      options: formData.destination === "Drc" ? ["Bank", "Mobile Money"] : [], // Include options based on destination
    },
    // Add more fields based on destination and payment method selection
    // Add image field
    {
      label: "Image",
      id: "image",
      type: "file",
      required: true,
      onChange: (e) => setFormData({ ...formData, image: e.target.files[0] }),
    },
  ];
  