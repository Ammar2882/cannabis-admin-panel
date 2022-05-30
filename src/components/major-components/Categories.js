import { useEffect, useState } from "react"
import BerbixVerify from "berbix-react";
import { axiosInstance } from '../../constants/axiosInstance'

import socketIOClient from "socket.io-client";
const ENDPOINT = "https://www.berbix.com";
export const Categories = () => {

    const [token, setToken] = useState(null)
    const socket = socketIOClient(ENDPOINT);
    socket.on('Verification status changed', (data)=>{
        console.log(data , "data he oeee")
    })
   
    useEffect(() => {
        getdata()
    
    },[])

    const getdata = async () => {

        const orders = await axiosInstance.post(`/api/v1/driver/idverification`, { id: "6246d8971a906750e45d354f" })
        console.log(orders.data.data, " :inside api")
        setToken(orders.data.data.clientToken)
    }


    return (
        <>
         {token?(
            <div className="w-96 relative right-0">
                <BerbixVerify
                    clientToken={token}
                    
                    onComplete={(data) => {
                        console.log(data, "res printing")
                    }}
                />
            </div>
         ):(
             <div>
                 loading ...
             </div>
         )}
        </>
    )
}