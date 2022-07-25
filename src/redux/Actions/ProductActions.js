import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';
import { selectProgressBarState } from './ProgressBarActions';

export const addProduct = (values, formData, navigate, alert, setIsOpen,token) => {

    return async (dispatch) => {
        let options = {
            params: {
                values:values
              
            }, 
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization":token
            }
        }

        const res = await axiosInstance.post('/api/v1/product/addproduct', formData, options)
        if (res.data.success === true) {

            alert.show('product added successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/products')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/products')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.SET_PRODUCT,
                payload: res.data.data
            })
        }
        else {
            alert.show('error while adding product')
        }
    }
}


export const updateProduct = (values, formData, navigate, alert, setIsOpen,token) => {
    return async (dispatch) => {
        console.log(token , "update product")
        dispatch(selectProgressBarState(true))
        let options = {
            params: {
                values,
                id: global.editId
            }, 
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization":token
            }
        }
        

        const res = await axiosInstance.patch('/api/v1/product/updateproduct', formData,options)
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            alert.show('product updated successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/products')

                }
            })
            dispatch({
                type: ACTION_TYPES.UPDATE_PRODUCT,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('error while updating product')
        }
    }
}

export const getProducts = (token) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        const res = await axiosInstance.get('/api/v1/product/getproducts',{headers:{
            "Authorization":token
        }})
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.GET_PRODUCTS,
                payload: res.data.data
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('No Products Found')
            dispatch({
                type: ACTION_TYPES.GET_PRODUCTS,
                payload: []
            })
        }
    }
}

export const deleteProducts = (id, navigate, alert,token) => {
    return async (dispatch) => {
        dispatch(selectProgressBarState(true))
        let options = {
            params: {
                IDS: id
            },
        headers:{
            "Authorization":token
        }
    }
        const res = await axiosInstance.delete('/api/v1/product/deleteproducts', options)
        if (res.data.success === true) {
            dispatch(selectProgressBarState(false))
            dispatch({
                type: ACTION_TYPES.DELETE_PRODUCTS,
                payload: id
            })
            alert.show('deleted successfully', {
                onClose: () => {
                    navigate('/products')
                }
            })
        }
        else {
            dispatch(selectProgressBarState(false))
            alert.show('Error in deletion')
        }
    }
}