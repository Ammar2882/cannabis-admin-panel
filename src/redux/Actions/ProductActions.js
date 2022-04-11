import { axiosInstance } from '../../constants/axiosInstance';
import { ACTION_TYPES } from '../ActionTypes/ActionTypes';

export const addProduct = (values, formData, navigate, alert, setIsOpen) => {

    return async (dispatch) => {

        const res = await axiosInstance.post('/api/v1/product/addproduct', formData, {
            params: {
                values: values,
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success === true) {

            alert.show('product added successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/main/products')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/main/products')

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


export const updateProduct = (values, formData, navigate, alert, setIsOpen) => {
    return async (dispatch) => {
        console.log('to be updated ID :', global.editId)

        const res = await axiosInstance.patch('/api/v1/product/updateproduct', formData, {
            params: {
                values,
                id: global.editId
            }
        }, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        if (res.data.success === true) {

            alert.show('product updated successfully', {
                onClose: () => {
                    setIsOpen(false)
                    navigate('/main/products')

                }
            })
            setTimeout(() => {
                setIsOpen(false)
                navigate('/main/products')

            }, 5000)
            dispatch({
                type: ACTION_TYPES.UPDATE_PRODUCT,
                payload: res.data.data
            })
        }
        else {
            alert.show('error while updating product')
        }
    }
}

export const getProducts = () => {
    console.log('get prod was called: 888888888888888888')
    return async (dispatch) => {
        const res = await axiosInstance.get('/api/v1/product/getproducts')
        if (res.data.success === true) {
            dispatch({
                type: ACTION_TYPES.GET_PRODUCTS,
                payload: res.data.data
            })
        }
        else {
            alert.show('No Products Found')
            dispatch({
                type: ACTION_TYPES.GET_PRODUCTS,
                payload: []
            })
        }
    }
}

export const deleteProducts = (id, navigate, alert) => {
    return async (dispatch) => {
        const res = await axiosInstance.delete('/api/v1/product/deleteproducts', {
            params: {
                IDS: id
            }
        })
        if (res.data.success === true) {


            dispatch({
                type: ACTION_TYPES.DELETE_PRODUCTS,
                payload: id
            })
            alert.show('deleted successfully', {
                onClose: () => {
                    navigate('/main/products')
                }
            })
            setTimeout(() => {
                navigate('/main/products')
            }, 5000)
        }
        else {
            alert.show('Error in deletion')
        }
    }
}