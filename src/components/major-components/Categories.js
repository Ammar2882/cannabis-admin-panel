import { useEffect, useState } from "react"
import BerbixVerify from "berbix-react";
import { axiosInstance } from '../../constants/axiosInstance'


export const Categories = () => {
    const [token, setToken] = useState('')
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
            <div className="w-96 relative right-0">
                <BerbixVerify
                    clientToken={token}
                    
                    onComplete={(data) => {
                        console.log(data, "res printing")
                    }}
                />
            </div>
        </>
    )
}