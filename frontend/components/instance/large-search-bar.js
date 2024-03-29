import { useFormik } from "formik"
import { formikConf } from "../forms/search-bar"

const LargeSearchBar = () => {
  const formik = useFormik(
    Object.assign(
      {
        initialValues: {
          supportSearch: "",
        },
      },
      formikConf
    )
  )

  const onKeyDown = (e) => {
    if (e.which === 13) {
      // e.preventDefault()
      // e.stopPropagation()
      alert("under construction")
      formik.handleSubmit(formik.values)
    }
  }

  return (
    <section className=" container mt-20 ">
      <formik onSubmit={formik.onSubmit}>
        <div className="flex max-w-screen-lg mx-auto">
          <label
            htmlFor="supportSearch"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          ></label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="supportSearch"
              onKeyDown={onKeyDown}
              onChange={formik.handleChange}
              value={formik.values.supportSearch}
              className="block py-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
          </div>
        </div>
      </formik>
    </section>
  )
}

export default LargeSearchBar
