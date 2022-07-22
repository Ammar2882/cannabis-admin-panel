import topArrow from '../../assets/top-arrow.svg'
import bottomArrow from '../../assets/bottom-arrow.svg'
import ReactPaginate from "react-paginate";
import { useState } from 'react'
import { Dropdown } from './DropDown';
export const Table = ({ ordersColumns, ordersData, title, pendingOrders, forceReload, setForceReload, setLoading, type }) => {
    const tableColumns = ordersColumns
    const tableData = ordersData
    const [data, setData] = useState(tableData);
    const [searchText, setSearchText] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [myFilteredData, setMyFilteredData] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const pagesVisited = pageNumber * itemsPerPage;
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const handleChange = value => {
        setSearchText(value);
        filterData(value);
    };

    // filter records by search text
    const filterData = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === "") setData(tableData);
        else {
            const filteredData = tableData.slice(pagesVisited, pagesVisited + itemsPerPage).filter(item => {
                return Object.keys(item).some(key =>
                    item[key].toString().toLowerCase().includes(lowercasedValue)
                );
            });
            setData(filteredData);
            setMyFilteredData(filteredData)
        }

    }
    if (type === "orders") {
        return (
            <div className='divide-y  divide-gray-100 bg-white rounded-lg  shadow-lg'>

                <div className='px-5 pt-4 h-10 my-0 flex flex-col items-start justify-between'>
                    <h2 className='font-semibold text-gray-800 text-lg'>{title}</h2>
                    <p className='text-xs'>Details</p>
                </div>

                <div className="w-full px-4 py-4 my-8 bg-white ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-2 h-12">
                            <h2 className='text-xs'>
                                Show
                            </h2>
                            <div className="flex w-20">
                                <input type="text"
                                    value={itemsPerPage}
                                    // onChange={(e) => { setItemsPerPage(e.target.value) }}
                                    disabled={true}
                                    className="bg-white text-sm text-gray-900 text-center 
                                focus:outline-none border border-gray-800 focus:border-gray-600 
                                rounded-sm w-full h-8 " />
                                <div className='flex flex-col items-center gap-2 justify-center ml-[-15px]'>
                                    <img onClick={(e) => setItemsPerPage(itemsPerPage < data.length ? itemsPerPage + 1 : itemsPerPage)} className='w-2 cursor-pointer' src={topArrow} alt='top-arrow' />
                                    <img onClick={(e) => setItemsPerPage(itemsPerPage > 5 ? itemsPerPage - 1 : itemsPerPage)} className='w-2 cursor-pointer' src={bottomArrow} alt='bottom-arrow' />
                                </div>
                            </div>

                        </div>
                        <input placeholder="Type to search..."
                            value={searchText}
                            onChange={(e) => handleChange(e.target.value)}
                            type="text"
                            className="bg-white text-sm text-gray-900 text-center 
                        focus:outline-none border border-gray-800 focus:border-gray-600 
                        rounded-sm w-18 h-8" />

                    </div>

                    <div className="flex flex-col  justify-center h-full py-4">
                        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm ">
                            <div className="py-3 ">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full ">
                                        <thead className="text-sm w-full h-14 bg-myBg font-semibold uppercase text-gray-600 ">
                                            <tr>
                                                {

                                                    tableColumns.map((item, index) => (
                                                        <th key={index} className="p-2 whitespace-nowrap font-semibold text-left">
                                                            {item}
                                                        </th>

                                                    ))
                                                }
                                                {pendingOrders ? (
                                                    <th>
                                                        Actions
                                                    </th>
                                                ) : null}
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm  divide-gray-100">
                                            {!searchText ? <>

                                                {data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
                                                    <tr key={index}>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.productName}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.productQuantity}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.totalPrice}</p>
                                                        </td>

                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.city}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.address}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.userName}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.userEmail}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.userPhoneNumber}</p>
                                                        </td>
                                                        <td className={`text-left text-md relative px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            {pendingOrders ? (
                                                                <Dropdown setLoading={setLoading} forceReload={forceReload} setForceReload={setForceReload} id={item.id} orders={true} />
                                                            ) : null}
                                                        </td>
                                                    </tr>

                                                ))}
                                            </>
                                                :
                                                <>
                                                    {myFilteredData.map((item, index) => (
                                                        <tr>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.productName}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.productQuantity}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.totalPrice}</p>
                                                            </td>

                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.city}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.address}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.userName}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.userEmail}</p>
                                                            </td>
                                                            <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                <p className={`text-left text-xs `}>{item.userPhoneNumber}</p>
                                                            </td>
                                                            <td className={`text-left text-md relative px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                                {pendingOrders ? (
                                                                    <Dropdown setLoading={setLoading} forceReload={forceReload} setForceReload={setForceReload} id={item.id} orders={true} />
                                                                ) : null}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            }
                                            {data.length === 0 && <h1 className='py-8 px-2 font-semibold'>No Records Found By This Key Word </h1>}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs text-left'>
                            Showing {data.slice(pagesVisited, pagesVisited + itemsPerPage).length} results of {data.length}
                        </p>
                        <div className='flex items-center justify-center'>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"flex justify-between gap-3 items-center w-full text-xs rounded no-underline"}
                                previousLinkClassName={"py-2 px-4 rounded bg-gray-200 w-24 hover:bg-gray-300 mx-2 no-underline"}
                                nextLinkClassName={"py-2 px-4 rounded bg-gray-200 w-24 hover:bg-gray-300 mx-2 no-underline"}
                                disabledClassName={"pointer-events-none no-underline"}
                                activeClassName={"py-2 px-4 rounded bg-myBg hover:bg-[#edcb58] hover:text-white text-xs mx-2 no-underline"}
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    else if (type = "users") {
        return (
            <div className='divide-y  divide-gray-100 bg-white rounded-lg  shadow-lg'>

                <div className='px-5 pt-4 h-10 my-0 flex flex-col items-start justify-between'>
                    <h2 className='font-semibold text-gray-800 text-lg'>{title}</h2>
                    <p className='text-xs'>Details</p>
                </div>

                <div className="w-full px-4 py-4 my-8 bg-white ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start gap-2 h-12">
                            <h2 className='text-xs'>
                                Show
                            </h2>
                            <div className="flex w-20">
                                <input type="text"
                                    value={itemsPerPage}
                                    // onChange={(e) => { setItemsPerPage(e.target.value) }}
                                    disabled={true}
                                    className="bg-white text-sm text-gray-900 text-center 
                            focus:outline-none border border-gray-800 focus:border-gray-600 
                            rounded-sm w-full h-8 " />
                                <div className='flex flex-col items-center gap-2 justify-center ml-[-15px]'>
                                    <img onClick={(e) => setItemsPerPage(itemsPerPage < data.length ? itemsPerPage + 1 : itemsPerPage)} className='w-2 cursor-pointer' src={topArrow} alt='top-arrow' />
                                    <img onClick={(e) => setItemsPerPage(itemsPerPage > 5 ? itemsPerPage - 1 : itemsPerPage)} className='w-2 cursor-pointer' src={bottomArrow} alt='bottom-arrow' />
                                </div>
                            </div>

                        </div>
                        <input placeholder="Type to search..."
                            value={searchText}
                            onChange={(e) => handleChange(e.target.value)}
                            type="text"
                            className="bg-white text-sm text-gray-900 text-center 
                    focus:outline-none border border-gray-800 focus:border-gray-600 
                    rounded-sm w-18 h-8" />

                    </div>

                    <div className="flex flex-col  justify-center h-full py-4">
                        <div className="w-full  mx-auto bg-white shadow-lg rounded-sm ">
                            <div className="py-3 ">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full ">
                                        <thead className="text-sm w-full h-14 bg-myBg font-semibold uppercase text-gray-600 ">
                                            <tr>
                                                {

                                                    tableColumns.map((item, index) => (
                                                        <th key={index} className="p-2 whitespace-nowrap font-semibold text-left">
                                                            {item}
                                                        </th>

                                                    ))
                                                }
                                                {pendingOrders ? (
                                                    <th>
                                                        Actions
                                                    </th>
                                                ) : null}
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm  divide-gray-100">
                                            {!searchText ? <>

                                                {data?.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
                                                    <tr key={index}>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.fullName !== null && item.fullName !== undefined && item.fullName !== '' ? item.fullName: "Not Added Yet"}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.email}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.phoneNumber !== null && item.phoneNumber !== undefined && item.phoneNumber !== '' ? item.phoneNumber: "Not Added Yet"}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                                :
                                                <>
                                                    {myFilteredData.map((item, index) => (
                                                        <tr key={index}>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.fullName !== null && item.fullName !== undefined && item.fullName !== '' ? item.fullName: "Not Added Yet"}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.email}</p>
                                                        </td>
                                                        <td className={`text-left text-xs px-2 py-8 whitespace-nowrap ${index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                                            <p className={`text-left text-xs `}>{item.phoneNumber !== null && item.phoneNumber !== undefined && item.phoneNumber !== '' ? item.phoneNumber: "Not Added Yet"}</p>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </>
                                            }
                                            {data.length === 0 && <h1 className='py-8 px-2 font-semibold'>No Records Found By This Key Word </h1>}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-xs text-left'>
                            Showing {data.slice(pagesVisited, pagesVisited + itemsPerPage).length} results of {data.length}
                        </p>
                        <div className='flex items-center justify-center'>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"flex justify-between gap-3 items-center w-full text-xs rounded no-underline"}
                                previousLinkClassName={"py-2 px-4 rounded bg-gray-200 w-24 hover:bg-gray-300 mx-2 no-underline"}
                                nextLinkClassName={"py-2 px-4 rounded bg-gray-200 w-24 hover:bg-gray-300 mx-2 no-underline"}
                                disabledClassName={"pointer-events-none no-underline"}
                                activeClassName={"py-2 px-4 rounded bg-myBg hover:bg-[#edcb58] hover:text-white text-xs mx-2 no-underline"}
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}