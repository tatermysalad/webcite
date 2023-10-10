export default function SearchComponent() {
    return (
        <div id="searchComponent">
            <form className="flex items-center justify-center">
                <div className="w-1/2">
                    <div className="border-b border-gray-200 pb-8">
                        <h2 className="text-lg font-semibold text-gray-900">Search for Reference</h2>
                        <div className="mt-4">
                            <label htmlFor="referenceType" className="block text-sm font-medium text-gray-900">
                                Reference Type
                            </label>
                            <select
                                id="referenceType"
                                name="referenceType"
                                className="block w-full rounded-md border border-gray-300 py-2 text-gray-900"
                            >
                                <option>Website</option>
                                <option>Research Paper</option>
                                <option>Book</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="searchQuery" className="block text-sm font-medium text-gray-900">
                                Search for your reference here:
                            </label>
                            <input
                                type="text"
                                id="searchQuery"
                                name="searchQuery"
                                className="block w-full rounded-md border border-gray-300 py-2 text-gray-900"
                            />
                        </div>
                        <div className="mt-6 flex items-center justify-end space-x-4">
                            <button type="button" className="text-sm font-semibold text-gray-900">
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 text-sm font-semibold text-white px-3 py-2 hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-600"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <form className="flex items-center justify-center">
                <div className="space-y-12 w-3/6 h-auto content-center">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Top Result</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600"></p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="mt-2">
                                <label htmlFor="searchQuery" className="block text-sm font-medium leading-6 text-gray-900">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="searchQuery"
                                    name="searchQuery"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Author
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Website Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Publisher
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                    Year
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
