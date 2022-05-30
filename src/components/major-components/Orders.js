import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../constants/axiosInstance'
import { Table } from '../minor-components/Table'

const ordersColumns = [
    "Product Name",
    "Product Quantity",
    "Total Price",
    "City",
    "Address",
    "User Name",
    "User Email",
    "User Phone No.",

]
export const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        getAllOrders()
    }, [])

    const getAllOrders = async () => {

        const orders = await axiosInstance.get(`/api/v1/order/getneworders`)
        console.log(orders.data.data, " :inside api")
        setOrders(orders.data.data)
    }


    return (
        <div className="bg-gray-50   z-0">
            {console.log(orders, ": logging orders")}
            <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                <h2 className='text-2xl'>Orders</h2>
                <div className='flex flex-col '>
                    {orders.length != 0 ?
                        <Table ordersColumns={ordersColumns} ordersData={orders} /> : <h2>No Orders Found</h2>}
                </div>
            </div>

        </div>
    )
}
