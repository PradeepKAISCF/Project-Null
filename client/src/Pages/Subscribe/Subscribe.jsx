import React, { useState } from 'react'

import './Subscribe.css'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
const Subscribe = () => {

    const [plan,setplan] = useState(null);

    const pay = (e)=>{
        e.preventDefault();
        let amount;
        if(plan === 1) amount = 100
        if(plan === 2) amount = 1000
        if(plan === 0){
          alert("Subrcibed To Free Plan");
          }else{
            var options = {
              key: "rzp_test_7kuHOXieqQI1Go",
              key_secret:"Cvseho95ZIwZBK8l5WJBGPlq",
              amount: amount *100,
              currency:"INR",
              name:"STARTUP_PROJECTS",
              description:"for testing purpose",
              handler: function(response){
                if(plan === 1){
                  alert("Payment Successfull Now your a Premium User");
                }
                if(plan === 2) {
                  alert("Payment Successfull Subscribed To Silver Plan");
                  //dispatch(subscription(currentUser?.result?._id,1))
                }
                if(plan === 3 ) {
                  alert("Payment Successfull Subscribed To Gold Plan");
                  //dispatch(subscription(currentUser?.result?._id,2))
                }
    
              },
              prefill: {
                name:"Naveen",
                email:"sidehustle1702@gmail.com",
                contact:"9003339441"
              },
              notes:{
                address:"Razorpay Corporate office"
              },
              theme: {
                color:"#3399cc"
              }
            };
            var pay = new window.Razorpay(options);
            pay.open();
          }
      }

  return (
    <div className='home-container-1'>
        <LeftSidebar />
        <div className="home-container-2">
            <div className='main-container'>
                <h1>Plans For Subscribe</h1>
                <div className='plan-container'>
                    <div className='plan-blocks' onClick={()=>{setplan(0)}} style={{borderColor: plan === 0 ? '#1e90ff' : 'black'}}>
                        <h4> Free Plan</h4>
                        <h5> Amount: Free</h5>
                        <p>Only one questions Per Day</p>
                    </div>
                    <div className='plan-blocks' onClick={()=>{setplan(1)}} style={{borderColor: plan === 1 ? '#1e90ff' : 'black'}}>
                        <h4> Silver Plan</h4>
                        <h5> Amount: 100</h5>
                        <p>Only 5 questions Per Day</p>
                    </div>
                    <div className='plan-blocks' onClick={()=>{setplan(2)}} style={{borderColor: plan === 2 ? '#1e90ff' : 'black'}}>
                        <h4> Gold Plan</h4>
                        <h5> Amount: 1000</h5>
                        <p>Unlimited questions Per Day</p>
                    </div>
                </div>
                <button className='pay-now' onClick={pay}>Pay now</button>   
            </div>
        </div>
    </div>
  )
}

export default Subscribe