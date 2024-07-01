import React from 'react'





const agents=[
    {
        id:1,
        name:"didier mwamba",
        image:"https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city:"girne",
        record:1000,
    },
    {
        id:2,
        name:"jon doe",
        image:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city:"girne",
        record:1000,
    },
    {
        id:3,
        name:"bethen have",
        image:"https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        city:"girne",
        record:1000,
    },
    {
        id:4,
        name:"madrid real",
        city:"girne",
        image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        record:1000,
    },
    

]
function TopAgent() {
  return (
    <>
        {
            agents.map(agent=>(
                <div key={agent.id}  className=''>
                    <div>
                    <img src={agent.image} alt=""  className='w-10 h-10  object-cover rounded-full' />
                   <span className='text-sm text-gray-600' >{agent.name}</span>
                    </div>
              
                <h3>${agent.record}</h3>
                </div>
            ))
        }
    </>
  )
}

export default TopAgent