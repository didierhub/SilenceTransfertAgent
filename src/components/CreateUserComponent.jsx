import{useState}from 'react';
import { createUser } from '../firebase/FireBaseConfig'; // Path to your firebaseConfig.js


const CreateUserComponent = () => {

    const [message,setMessage]=useState("")
  const handleCreateUser = async () => {
    try {
      const response = await createUser({
        email: 'didier.mwamba3@final.edu.tr',
        password: 'passworBABA@d123',
        phoneNumber: '+91 2420 543200',
        displayName: 'User Name',
        emailVerified: false,
        disabled: false,
      });

      console.log('User creation successful:', response.data);
      // Handle success (e.g., show a success message to the user)
    } catch (error) {
      console.log( error);
      // Handle error (e.g., show an error message to the user)
      setMessage(error)
    }
  };

  const showMessageHandler=(message)=>{
    setTimeout(()=>{
      alert(message),300
    })
  }

  return (
    <div className='flex items-center'>
      <button className='bg-orange-500 py-2 rounded-sm px-2' onClick={handleCreateUser}>Create User</button>
     
    </div>
  );
};

export default CreateUserComponent;
