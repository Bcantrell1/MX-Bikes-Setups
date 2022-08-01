import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import {
    MenuIcon,
    XIcon,
  } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

import Link from 'next/link';
import Image from 'next/image';

import { classNames } from '../utils/helpers';
import SignInBtn from './sign-in-btn';
import { trpc } from '../utils/trpc';
import {useSession} from 'next-auth/react';

export default function Header() {

    const {data, isLoading, error} = trpc.useQuery(['bikes.categories']);
    const categories = [...new Set(data?.map(bikes => bikes.category))];
    const {data: session} = useSession();

    return (
        <Popover className='relative bg-white'>

            <div className='max-w-7x1 mx-auto px-4 sm:px-6'>
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link href="/">
                            <div>
                            <span className="sr-only">Workflow</span>
                            <Image
                                className="h-8 w-auto sm:h-10"
                                src="/mxbikes_logo.svg"
                                alt=""
                                width={200}
                                height={50}
                            />
                            </div>
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    {
                        session ? (
                            <Popover.Group as="nav" className="hidden md:flex space-x-10">
                                <Popover className="relative">
                                    {({ open }) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                open ? 'text-gray-900' : 'text-gray-500',
                                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                )}
                                            >
                                                <span>Bikes</span>
                                                <ChevronDownIcon
                                                className={classNames(
                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                )}
                                                aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {categories.map((item) => (
                                                        <Link
                                                            key={item}
                                                            href={`/bikes/${item}`}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                        >
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                    </div>
                                                </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </Popover.Group>
                        ) : null
                    }
                    
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <SignInBtn />
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                <Link
                                    href='/bikes'
                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                    >
                                        <p className="text-base font-medium text-gray-900">Bikes</p>
                                </Link>
                                </nav>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div>
                                <p className="text-center text-base font-medium text-gray-500">
                                    <SignInBtn />
                                </p>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
            
        </Popover>
    );
}