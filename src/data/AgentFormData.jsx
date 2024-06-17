

const agentInputform = (formData, handleInputChange, handleFileChange) => [
  
  {
    label: "Name and Surname",
    id: "displayName",
    type: "text",
    required: true,
    placeholder: "John Doe",
    value: formData.displayName,
    onChange: handleInputChange,
  },
  {
    label: "City",
    id: "city",
    type: "text",
    required: true,
    placeholder: "GIRNE",
    value: formData.city,
    onChange: handleInputChange,
  },
  {
    label: "Email",
    id: "email",
    type: "email",
    required: true,
    placeholder: "john_doe@gmail.com",
    value: formData.email,
    onChange: handleInputChange,
  },
  {
    label: "Address",
    id: "address",
    type: "textarea",
    rows: 4,
    required: true,
    value: formData.address,
    onChange: handleInputChange,
    placeholder: "Elton St. 216 NewYork",
  },
  
  
  {
    label: "Phone",
    id: "phone",
    type: "text",
    required: true,
    placeholder: "+1 234 567 89",
    value: formData.phone,
    onChange: handleInputChange,
  },
  {
    label: "Password",
    id: "password",
    type: "password",
    required: true,
    placeholder: "Sdgf124!%&123",
    value: formData.password,
    onChange: handleInputChange,
  },
  {
    label: "AgentId",
    id: "AgentId",
    type: "text",
    required: true,
    placeholder: "1213ID",
    value: formData.username,
    onChange: handleInputChange,
  },
  {
    label: "Image",
    id: "image",
    type: "file",
    required: true,
    onChange: handleFileChange,
  },
  
];






 

const agentInfo=[

    {
        id: 1,
        user: "ln123",
        fullName: "peniel soeur",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "Lefkoça",
        phone: "+905338816678",
      },
      {
        id: 2,
        user: "lk123",
        fullName: "alders mwamba",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "lekoça",
        phone: "+905338816678",
      },
      {
        id: 3,
        user: "mg123",
        fullName: "didier maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 4,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 5,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id:6,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id:7,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 8,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 9,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 10,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
      {
        id: 11,
        user: "gn123",
        fullName: "sasas maguşa",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city: "maguşa",
        phone: "+905338816678",
      },
    
]
export{agentInputform,agentInfo}