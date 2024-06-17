import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Users from './pages/Users.jsx'
import Transfert from './pages/Transfert.jsx'
import Send from './pages/Send.jsx'
import Receive from './pages/Receive.jsx'
import LogIn from './forms/LogIn.jsx'
import Register from './forms/Register.jsx'
import Transaction from './pages/Transaction.jsx'
import UserContenair from './pages/UserContenair.jsx'
import { ProviderId } from 'firebase/auth'
import { ProviderUserContext } from './contexts/UserAuthContex.jsx'
import TransactionContenair from './pages/TransactionContenair.jsx'
import SendForm from './forms/SendForm.jsx'
import ReceiveForm from './forms/ReceiveForm.jsx'
import TransfertForm from './forms/TransfertForm.jsx'
import { TransactionContextProvider } from './contexts/TransactionContext.jsx'
import Review from './pages/Review.jsx'




const router= createBrowserRouter(
   createRoutesFromElements(
     //Router home page
    <Route path='/' element={<Layout />}>

      {/* home page  */}
     <Route  index element={<Home/>}/> 

     {/* UserRouter */}
      <Route path='Users' element={<Users/>}>
      <Route path='/Users/' element={<UserContenair  />}/>
      <Route path='Register' element={<Register />} />
      </Route>
       {/* TransactionRouter */}

      <Route path='Transaction' element={<TransactionContextProvider><Transaction /></TransactionContextProvider> }>

      <Route path="/Transaction/" element={<TransactionContenair />} />
      <Route path='Transfert' element={<Transfert/>} />
      <Route path='Send' element={<Send/>} />
      <Route path='Receive' element={<Receive/>} />
      <Route path='ReceiveForm' element={<ReceiveForm/>} />
      <Route path='SendForm' element={<SendForm/>} />
      <Route path='TransfertForm' element={<TransfertForm/>} />
      <Route path='Review' element={<Review/>}/>
      </Route>
        {/* logINPAge  */}
        <Route path='Login' element={<LogIn/>} />
      </Route>

  

  
   )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProviderUserContext >
    <RouterProvider router={router}/>
    </ProviderUserContext>
   
  </React.StrictMode>,
)
