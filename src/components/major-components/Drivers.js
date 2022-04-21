import { useState, useEffect } from 'react'
import { axiosInstance } from '../../constants/axiosInstance'
import BerbixVerify from "berbix-react";


export const Drivers = () => {
    const [clientToken, setClientToken] = useState(null)
    useEffect(() => {
        getToken()
    }, [])
    const getToken = async () => {
        const res = await axiosInstance.post('/api/v1/driver/idverification', {
            id: "6226f738cb889156f8bc5495"
        })
        console.log(res.data.data.clientToken, " : res")
        setClientToken(res.data.data.clientToken)

    }
    return (
        <div className='py-2 bg-gray-50'>
            <div className='divide-y  divide-gray-100 bg-white rounded-lg  shadow-lg ml-48 mt-48'>
                {clientToken ? (
                    <BerbixVerify
                        clientToken={clientToken}
                        onComplete={() => {
                            // the user has completed the verification flow
                            console.log('transaction completed')
                        }}
                    />
                ) :
                    (
                        <h1>hello world</h1>
                    )

                }

            </div>
        </div>
    )
}
