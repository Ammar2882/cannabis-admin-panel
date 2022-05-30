import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo } from "react"
import { getUnApprovedDrivers } from "../../redux/Actions/DriverActions"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../minor-components/Modal"


const unApprovedDrivers = [
    'Photo',
    'Name',
    'Email',
    'Phone Number',
    'Driving License',
    'Verified',
    'Blocked',
    'Actions'

]
export const Drivers = () => {
    const dispatch = useDispatch()


    const { unapprovedDrivers } = useSelector(
        (state) => state.driversReducer
    );

    useEffect(() => {
        dispatch(getUnApprovedDrivers())
    }, [])


    return (
        <>
            {console.log(unApprovedDrivers, " :drivers")}
            <div className="bg-gray-50   z-0">
                <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">

                    {
                        unapprovedDrivers.length === 0 ? (
                            <div className="flex justify-center items-center py-8 text-lg">No Drivers Found</div>
                        )
                            : (
                                <ActionsTable tableColumnsReal={unApprovedDrivers} key={parseInt(Math.random() * 10000)} tableDataReal={unapprovedDrivers} />
                            )
                    }
                </div>
            </div>
        </>
    )
}