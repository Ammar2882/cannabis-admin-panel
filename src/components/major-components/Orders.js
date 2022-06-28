import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../constants/axiosInstance'
import { Table } from '../minor-components/Table'
import { Loader } from '../minor-components/Loader'
import { useSelector, useDispatch } from "react-redux"
import { selectProgressBarState } from '../../redux/Actions/ProgressBarActions'


const ordersColumns = [
    "Product Name",
    "Product Qty.",
    "Total Price",
    "City",
    "Address",
    "User Name",
    "User Email",
    "User Phone No.",

]
export const Orders = () => {
    // const [loading , setLoading] = useState(false)
    const [forceReload , setForceReload] = useState(false)
    const [pendingOrders, setPendingOrders] = useState([])
    const [approvedOrders, setApprovedOrders] = useState([])
    const [acceptedOrders, setAcceptedOrders] = useState([])
    const [completedOrders, setCompletedOrders] = useState([])
    const dispatch = useDispatch()
    const loading = useSelector(
        (state) => state.ProgressBarReducer
    );

    useEffect(() => {
        getAllOrders()
    }, [forceReload])
   
    const getAllOrders = async () => {
        dispatch(selectProgressBarState(true))
        const orders = await axiosInstance.get(`/api/v1/order/getallordersadmin`)
        if (orders.data.success) {
            let filteredData = orders?.data?.data?.pendingOrder.map((item) => {
                return {
                    id:item._id,
                    productName: item.details.map((item2) => {
                        return item2.productId.name
                    }).join(" / "),
                    productQuantity: item.details.map((item2) => {
                        return item2.quantity
                    }).join(' / '),
                    totalPrice: item.totalPrice,
                    city: item.city,
                    address: item.address,
                    userName: item.userId.fullName,
                    userEmail: item.userId.email,
                    userPhoneNumber: item.userId.phoneNumber,
                }
            })
            setPendingOrders(filteredData)
            let filteredDataApproved = orders?.data?.data?.approvedOrder.map((item) => {
                return {
                    id:item._id,
                    productName: item.details.map((item2) => {
                        return item2.productId.name
                    }).join(" / "),
                    productQuantity: item.details.map((item2) => {
                        return item2.quantity
                    }).join(' / '),
                    totalPrice: item.totalPrice,
                    city: item.city,
                    address: item.address,
                    userName: item.userId.fullName,
                    userEmail: item.userId.email,
                    userPhoneNumber: item.userId.phoneNumber,
                }
            })
            setApprovedOrders(filteredDataApproved)
            let filteredDataAccepted = orders?.data?.data?.acceptedOrder.map((item) => {
                return {
                    id:item._id,
                    productName: item.details.map((item2) => {
                        return item2.productId.name
                    }).join(" / "),
                    productQuantity: item.details.map((item2) => {
                        return item2.quantity
                    }).join(' / '),
                    totalPrice: item.totalPrice,
                    city: item.city,
                    address: item.address,
                    userName: item.userId.fullName,
                    userEmail: item.userId.email,
                    userPhoneNumber: item.userId.phoneNumber,
                }
            })
            setAcceptedOrders(filteredDataAccepted)
            let filteredDataCompleted = orders?.data?.data?.completedOrder.map((item) => {
                return {
                    id:item._id,
                    productName: item.details.map((item2) => {
                        return item2.productId.name
                    }).join(" / "),
                    productQuantity: item.details.map((item2) => {
                        return item2.quantity
                    }).join(' / '),
                    totalPrice: item.totalPrice,
                    city: item.city,
                    address: item.address,
                    userName: item.userId.fullName,
                    userEmail: item.userId.email,
                    userPhoneNumber: item.userId.phoneNumber,
                }
            })
            setCompletedOrders(filteredDataCompleted)
            dispatch(selectProgressBarState(false))
        }
        else{
            dispatch(selectProgressBarState(false))
        }

    }


    return (
        <>
            <div className={`py-8 bg-gray-50 min-h-screen`}>
            <div className={`bg-gray-50 ml-[20%]  w-[78%] mt-24 `}>
            {!loading ? (
                <div className="bg-gray-50">
                    <div className=" mt-12">
                        <div className='flex flex-col '>
                            {pendingOrders.length !== 0 && !loading ?
                                <Table title={"Pending Orders"} key={parseInt(Math.random() * 10000)} forceReload={forceReload} setForceReload={setForceReload} pendingOrders={true} ordersColumns={ordersColumns} ordersData={pendingOrders} /> :  <div className="flex justify-center items-center py-8 text-lg">No Orders Found</div>
                                }
                        </div>
                    </div>
                
                    <div className=" mt-12">
                        <div className='flex flex-col '>
                            {approvedOrders.length !== 0 ?
                                <Table title={"Approved Orders"} key={parseInt(Math.random() * 10000)} ordersColumns={ordersColumns} ordersData={approvedOrders} /> : <div className="flex justify-center items-center py-8 text-lg">No Orders Found</div>}
                        </div>
                    </div>
                    <div className=" mt-12">
                        <div className='flex flex-col '>
                            {acceptedOrders.length !== 0 ?
                                <Table title={"Accepted Orders"} key={parseInt(Math.random() * 10000)}  ordersColumns={ordersColumns} ordersData={acceptedOrders} /> : <div className="flex justify-center items-center py-8 text-lg">No Orders Found</div>}
                        </div>
                    </div>
                    <div className=" mt-12">
                        <div className='flex flex-col '>
                            {completedOrders.length !== 0 ?
                                <Table title={"Completed Orders"} key={parseInt(Math.random() * 10000)} ordersColumns={ordersColumns} ordersData={completedOrders} /> : <div className="flex justify-center items-center py-8 text-lg">No Orders Found</div>}
                        </div>
                    </div>
                </div>

            ):(
                <Loader />
            )}
            </div>
            </div>
        </>

    )
}
