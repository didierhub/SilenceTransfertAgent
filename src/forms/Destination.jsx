import React, { useState } from 'react';

const Destination = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleDestinationChange = (event) => {
    setSelectedDestination(event.target.value);
    setSelectedService(''); // Reset service when destination changes
    setSelectedOption(''); // Reset option when destination changes
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setSelectedOption(''); // Reset option when service changes
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select name="destination" id="destinationSelect" onChange={handleDestinationChange}>
        <option value="">Select a destination</option>
        <option value="rdc">Rdc</option>
        <option value="turkey">Turkey</option>
        <option value="autre">Autre</option>
      </select>
{/* for drc  */}
      {selectedDestination === 'rdc' && (
        <select name="service" id="serviceSelect" onChange={handleServiceChange}>
          <option value="">Select a service</option>
          <option value="mobileMoney">Mobile Money</option>
          <option value="bank">Bank</option>
        </select>
      )}

      {selectedDestination === 'rdc' && selectedService === 'bank' && (
        <select name="bankOption" id="bankOptionSelect" onChange={handleOptionChange}>
          <option value="">Select a bank</option>
          <option value="equity">Equity</option>
          <option value="raw">Raw</option>
        </select>
      )}

      {selectedDestination === 'rdc' && selectedService === 'mobileMoney' && (
        <select name="mobileMoneyOption" id="mobileMoneyOptionSelect" onChange={handleOptionChange}>
          <option value="">Select a mobile money option</option>
          <option value="mpesa">Mpesa</option>
          <option value="airtelMoney">Airtel Money</option>
        </select>
      )}


{/* for turkey */}
{selectedDestination === 'turkey' && (
        <select name="service" id="serviceSelect" onChange={handleServiceChange}>
          <option value="bank">Bank</option>
         <option value="">Select a bank</option>
         <option value=""></option>
        
        </select>
      )}
 {selectedDestination === 'turkey' && selectedService === 'bank' && (
        <select name="bankOption" id="bankOptionSelect" onChange={handleOptionChange}>
          <option value="">Select a bank</option>
          <option value="equity">Equity</option>
          <option value="raw">Raw</option>
        </select>
      )}





      <div>
        {selectedDestination && componentsMap[selectedDestination]}
        {selectedService && componentsMap[selectedService]}
        {selectedOption && componentsMap[selectedOption]}
      </div>
    </div>
  );
};

// Define the components
const Rdc = () => (
  <div>
    <h2>Rdc </h2>
    <p>Content for Rdc.</p>
  </div>
);

const Turkey = () => (
  <div>
    <h2>Turkey Component</h2>
    <p>Content for Turkey.</p>
  </div>
);

const Autre = () => (
  <div>
    <h2>Autre Component</h2>
    <p>Content for Autre.</p>
  </div>
);

const MobileMoney = () => (
  <div>
    <h2>Mobile Money Component</h2>
    <p>Content for Mobile Money.</p>
  </div>
);

const Bank = () => (
  <div>
    <h2>Bank Component</h2>
    <p>Content for Bank.</p>
  </div>
);

const Equity = () => (
  <div>
    <h2>Equity Bank Component</h2>
    <p>Content for Equity Bank.</p>
  </div>
);

const Raw = () => (
  <div>
    <h2>Raw Bank Component</h2>
    <p>Content for Raw Bank.</p>
  </div>
);

const Mpesa = () => (
  <div>
    <h2>Mpesa Component</h2>
    <p>Content for Mpesa.</p>
  </div>
);

const AirtelMoney = () => (
  <div>
    <h2>Airtel Money Component</h2>
    <p>Content for Airtel Money.</p>
  </div>
);

// Map the components
const componentsMap = {
  rdc: <Rdc />,
  turkey: <Turkey />,
  autre: <Autre />,
  mobileMoney: <MobileMoney />,
  bank: <Bank />,
  equity: <Equity />,
  raw: <Raw />,
  mpesa: <Mpesa />,
  airtelMoney: <AirtelMoney />,
};

export { Turkey, Rdc, Autre, MobileMoney, Bank, Equity, Raw, Mpesa, AirtelMoney, componentsMap };
export default Destination;
