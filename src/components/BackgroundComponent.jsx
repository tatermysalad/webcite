import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import icon from "/src/assets/logo-package/png/logo-no-background.png";
import { useLocation, useNavigate } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

// eslint-disable-next-line react/prop-types
export default function BackgroundComponent({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const isDashboard = location.pathname === "/";
    const isCitationList = location.pathname === "/search";

    const navigation = [
        { name: "Citation List", href: "/", current: isDashboard },
        { name: "Find and Generate", href: "/search", current: isCitationList },
    ];
    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-teal-500 text-black-100">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="h-14 w-15" src={icon} alt="Your Company" />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        onClick={() => navigate(item.href)}
                                                        className={classNames(
                                                            item.current
                                                                ? "bg-teal-200 text-white-500"
                                                                : "text-white-1000 hover:bg-teal-700 hover:text-white",
                                                            "rounded-md px-3 py-2 text-sm font-medium"
                                                        )}
                                                        aria-current={item.current ? "page" : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-teal-500 p-2 text-gray-100 hover:bg-teal-700 hover:text-purple-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-500">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            onClick={() => navigate(item.href)}
                                            className={classNames(
                                                item.current
                                                    ? "bg-teal-700 text-purple-100"
                                                    : "text-gray-300 hover:bg-teal-700 hover:text-purple-100",
                                                "block rounded-md px-3 py-2 text-base font-medium"
                                            )}
                                            aria-current={item.current ? "page" : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">webCite</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    );
}
