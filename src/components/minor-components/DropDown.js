
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'

export const Dropdown = () => {
    return (
        <Menu className='absolute right-0 z-index-1000 flex flex-col'>
            {({ open }) => (
                <>
                    <Menu.Button >More</Menu.Button>

                    {/* Use the Transition component. */}
                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        {/* Mark this component as `static` */}
                        <Menu.Items static className='flex flex-col'>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={`py-2 px-4 no-underline  ${active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                                            }`}
                                    >
                                        Approve Order
                                    </button>
                                )}
                            </Menu.Item>

                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}