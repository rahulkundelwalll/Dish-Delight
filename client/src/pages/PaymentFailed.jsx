import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PaymentFailed = () => {
  const  navigate=useNavigate();
  return (
    <div>
      {toast.error("payment Failed")}
      {navigate("/")}
    </div>
  )
}

export default PaymentFailed
