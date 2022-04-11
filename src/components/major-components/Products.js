import { ActionsTable } from "../minor-components/ActionsTable"
import { useEffect, useState, useMemo } from "react"
import { getProducts } from "../../redux/Actions/ProductActions"
import { useSelector, useDispatch } from "react-redux"
import { Modal } from "../minor-components/Modal"
import { AddProductsForm } from "../minor-components/AddProductsForm"


export const Products = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)


    const { products } = useSelector(
        (state) => state.productReducer
    );

    useEffect(() => {
        console.log('fghjkghjkghjklhyjukighjk')
        dispatch(getProducts())
    }, [isOpen, isUpdateOpen])


    return (

        <>
            {console.log("updated product : ", products)}
            <div className="bg-gray-50   z-0">

                <div className=" mt-24 bg-gray-50 ml-[20%]  w-[78%]">
                    <div className="flex items-center justify-end py-4 px-4">
                        <button onClick={() => {
                            setIsOpen(true)
                        }}
                            className='bg-myBg text-gray-600 px-4 py-2 cursor-pointer hover:bg-[#E9D95D]'>
                            Add Product
                        </button>
                    </div>
                    <Modal open={isOpen} onClose={() => setIsOpen(false)} >
                        <AddProductsForm modal={setIsOpen} isAdd={true} />
                    </Modal>
                    {
                        products.length === 0 ? (
                            <div className="flex justify-center items-center py-8 text-lg">No Products Found</div>
                        )
                            : (
                                <ActionsTable isOpen={isUpdateOpen} modal={setIsUpdateOpen} key={parseInt(Math.random() * 10000)} tableDataReal={products} />
                            )
                    }
                </div>
            </div>
        </>
    )
}