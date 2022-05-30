import { useEffect, useState } from "react"
import BerbixVerify from "berbix-react";
import { axiosInstance } from '../../constants/axiosInstance'


export const Categories = () => {
    const [token, setToken] = useState(null)
    const verificationResult = (event) => {
        console.log('A key was pressed', event);
      };
    useEffect(() => {
        getdata()
   
            window.addEventListener('Verification status changed',verificationResult );
        
            // cleanup this component
            return () => {
              window.removeEventListener('Verification status changed', verificationResult);
            };
    
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