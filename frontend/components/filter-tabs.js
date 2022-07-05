import Context from "./context"
import { useRouter } from "next/router"
import { Link } from "next/link"

const FilterTabs = ({ children, enumColumn, menubar }) => {
  const router = useRouter()
  return (
    <Context.Consumer>
      {({ global, pageContext }) => {
        const enums = global.attributes.enums[enumColumn]
        return (
          <nav>
            {!!menubar.nestedLinks.length && (
              <div className="container ">
                <ul
                  className="hidden md:nav md:flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
                  id="tabs-tabFill"
                  role="tablist"
                >
                  <li className="nav-item text-center " key="page-title">
                    <a
                      href={menubar.url}
                      className="nav-link
      w-full
      block
      font-large
      text-md
      leading-tight
      uppercase
      border-t-0 border-r-2 border-primary-400
      my-2"
                    >
                      {menubar.text}
                    </a>
                  </li>
                  {menubar.nestedLinks.map((e) => (
                    <li
                      className="nav-item  text-center"
                      role="presentation"
                      key={e.text}
                    >
                      <a
                        href={`${e.url}`}
                        // onClick={() => {router.push({query: {type: e}})}}
                        className="nav-link
      w-full
      block
      font-large
      text-md
      leading-tight
      text-primary-700
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      my-2
    "
                        id={"tabs-" + e.text}
                        data-bs-toggle="pill"
                        data-bs-target={"#tabs-" + e.text}
                        role="tab"
                        aria-controls={"tabs-" + e.text}
                        aria-selected="true"
                      >
                        {e.text}
                      </a>
                    </li>
                  ))}
                </ul>
                <div class="md:hidden sm:flex justify-center z-50">
                  <div>
                    <div class="dropdown relative">
                      <a
                        class="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
                        // href=""
                        type="button"
                        id="dropdownMenuButton2"
                        data-bs-toggle="dropdown"
                      >
                        {menubar.text}
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="caret-down"
                          class="w-2 ml-2"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 320 512"
                        >
                          <path
                            fill="currentColor"
                            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                          ></path>
                        </svg>
                      </a>
                      <ul
                        class="
          dropdown-menu
          min-w-max
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          
          m-0
          bg-clip-padding
          border-none
        "
                        aria-labelledby="dropdownMenuButton2"
                      >
                        {menubar.nestedLinks.map(e => (<li>
                          <a
                            class="
              dropdown-item
              text-sm
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-700
              hover:bg-gray-100
            "
                            href={e.url}
                          >{e.text}</a
                          >
                        </li>))}
                      </ul>
                    </div>
                  </div>
                </div>


              </div>
            )}
            <div className="tab-content" id={"tabs-tabContent"}>
              {/* {Object.keys(enums).map(e => { return */}
              <div
                className="tab-pane fade show active"
                id={"tabs-" + ""}
                role="tabpanel"
                aria-labelledby={"tabs-" + "e"}
              >
                {children}
              </div>
              {/* })} */}
            </div>
          </nav>
        )
      }}
    </Context.Consumer>
  )
}

export default FilterTabs
