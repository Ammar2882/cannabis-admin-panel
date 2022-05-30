import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';



export const getUnApprovedDrivers = () => {
    return async (dispatch) => {
        const res = await axiosInstance.get('/api/v1/driver/getalldrivers')
        if (res.data.success === true) {

            dispatch({
                type: ACTION_TYPES.GET_UNAPPROVED_DRIVERS,
                payload: res.data.data
            })
        }
        else {
            alert.show('No Un Approved Drivers Found')
            dispatch({
                type: ACTION_TYPES.GET_UNAPPROVED_DRIVERS,
                payload: []
            })
        }
    }
}
export const updateDriverStatus = (args, alert, navigate, id) => {
    console.log(args, " :agrs")
    return async (dispatch) => {
        let res = ''
        if (args.checkVerify === true) {
            res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { verified: true }, {
                params: {
                    id: id
                }
            })
        }
        else if (args.checkBlock === false || args.checkBlock === true) {
            res = await axiosInstance.patch('/api/v1/driver/updatedriverstatus', { blocked: args.checkBlock ? true : false }, {
                params: {
                    id: id
                }
            })
        }

        if (res.data.success === true) {
            alert.show('Driver status updated successfully', {
                onClose: () => {

                    navigate('/main/drivers')

                }
            })
            setTimeout(() => {

                navigate('/main/drivers')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
                payload: res.data.data
            })
            dispatch(getUnApprovedDrivers())
        }
        else {
            alert.show('update failed')
            dispatch({
                type: ACTION_TYPES.UPDATE_DRIVER_STATUS,
                payload: []
            })
        }
    }
}