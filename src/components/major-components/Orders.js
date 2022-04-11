import React, { useEffect, useState } from 'react'
import { Dropdown } from '../minor-components/DropDown'
import { axiosInstance } from '../../constants/axiosInstance'
export const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = async () => {

        const orders = await axiosInstance.get('http://localhost:8080/api/v1/order/getallorders')
        setOrders(orders.data.data)
    }


    return (
        <div className="bg-gray-50   z-0">

            <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                <h2 className='text-2xl'>Orders</h2>
                <div className='flex flex-col '>

                    {orders.map((item, index) => (
                        <div key={index} className='flex justify-between relative'>
                            <div>
                                {item._id}
                            </div>

                            <Dropdown />

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
