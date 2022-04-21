import { DashCard } from "../minor-components/DashCard"
import dashCardOrder from '../../assets/dash-card-order.png'
import dashCardCart from '../../assets/dash-card-cart.png'
import dashCardPending from '../../assets/dash-card-pending.png'
import dashCardCannabis from '../../assets/dash-card-cannabis.png'
import { TrakingDetails } from "../minor-components/TrackingDetails"
import { Recentorders } from "../minor-components/RecentOrders"
import { TimeLine } from "../minor-components/TimeLine"
import { Table } from "../minor-components/Table"
import io from "socket.io-client";
import { useEffect } from "react"
// const socket = io('http://099c-39-41-165-237.ngrok.io')

const DashboardHeroSection = () => {
    // useEffect(() => {
    //     socket.on('connection', 'blablabla')
    //     socket.emit('join', 'ammar admin')

    //     setTimeout(() => {
    //         socket.on('hey', (data) => {
    //             console.log(data, "data received at successfull connection with sockety io server")
    //         })
    //     }, 3000)
    // }, [])


    return (
        <>
            <div className="bg-gray-50 z-0">
                <div className=" mt-24 bg-gray-50 ml-[20%] w-[78%]">
                    <div className="m-0 p-0">
                        <div className="pt-4">
                            <h1 className="text-3xl mx-0 px-0">
                                Dashboard
                            </h1>
                            <p className="text-xs ml-1">
                                Dashboard
                            </p>
                        </div>
                        <div className="flex items-center w-full flex-wrap justify-around py-4">
                            <DashCard bg='bg-red-100' header={'Total Orders'} value={'542'} icon={dashCardOrder} footer='2.5 from last 24 hours' />
                            <DashCard bg='bg-sky-200' header={'Completed Orders'} value={'542'} icon={dashCardCart} footer='2.5 from last 24 hours' />
                            <DashCard bg='bg-lime-100' header={'Pending Orders'} value={'542'} icon={dashCardPending} footer='2.5 from last 24 hours' />
                            <DashCard bg='bg-green-100' header={'Total Products'} value={'542'} icon={dashCardCannabis} footer='2.5 from last 24 hours' />
                        </div>
                        <div>
                            <TrakingDetails />
                        </div>
                        <div className="flex justify-around px-1 gap-2 my-8">
                            <Recentorders />
                            <TimeLine />
                        </div>
                        <div className="px-4">
                            <Table />
                            {/* <ActionsTable /> */}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}
export default DashboardHeroSection