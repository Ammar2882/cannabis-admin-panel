import { useEffect, useState } from "react"
import BerbixVerify from "berbix-react";
import { axiosInstance } from '../../constants/axiosInstance'

export const Categories = () => {

    const [token, setToken] = useState(null)
   

    useEffect(() => {
        getdata()
    
    },[])

    const getdata = async () => {

        const orders = await axiosInstance.post(`/api/v1/user/idverification`, { id: "62163674cb409340e84553da",type:"web" })
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