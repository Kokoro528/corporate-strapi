import Context from "./context"
import { useRouter } from "next/router"
import { Link } from "next/link"
import classNames from "classnames"
import { MdMenu, MdArrowUpward } from "react-icons/md"

const FilterTabs = ({ children, enumColumn, menubar }) => {
  const router = useRouter()

  const isActive = (url) => {
    if (
      url.includes(router.query.category) ||
      (!router.query.category && !url)
    ) {
      return true
    }
    return false
  }
  return (
    <Context.Consumer>
      {({ global, pageContext }) => {
        const enums = global.attributes.enums[enumColumn]
        return (
          <>
            <nav className="py-2 ">
              {!!menubar.nestedLinks.length && (
                <div className="container ">
                  <ul
                    className="hidden md:nav md:py-2 mb-3 md:max-w-screen-lg md:justify-center md:flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 "
                    id="tabs-tabFill"
                    role="tablist"
                  >
                    <li className="nav-item text-center " key="page-title">
                      <a
                        href={menubar.url}
                        className={classNames(
                          "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  border-t-0 border-r-2 border-primary-400 y-2",
                          { "font-bold text-sky-900": isActive("") }
                        )}
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
                          className={classNames(
                            "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  border-t-0 border-r-2 border-primary-400 y-2",
                            { "font-bold text-sky-900": isActive(e.url) }
                          )}
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

            <div className="float-right sticky bottom-0">
              {!!menubar.nestedLinks.length && (
                <details className=" flex flex-col-reverse items-end float-right bottom-0  md:hidden ">
                  <summary className=" bg-transparent block p-2 text-orange-300">
                    <span className="block open:hidden">
                      <MdMenu className=" w-auto h-12 " />
                    </span>
                    <span className="hidden open:block">
                      <MdArrowUpward className="w-auto h-12 " />
                    </span>
                  </summary>
                  <ul
                    className="opacity-100 whitespace-nowrap w-screen bg-gray-100 right-0 absolute bottom-12  md:nav md:py-2 mb-3 md:justify-center md:flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 "
                    id="tabs-tabFill"
                    role="tablist"
                  >
                    <li className="nav-item text-center " key="page-title">
                      <a
                        href={menubar.url}
                        className={classNames(
                          "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  border-t-0 border-r-2 border-primary-400 y-2",
                          { "font-bold text-sky-900 bg-white": isActive("") }
                        )}
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
                          className={classNames(
                            "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  border-t-0 border-r-2 border-primary-400 y-2",
                            {
                              "font-bold text-sky-900 bg-white": isActive(
                                e.url
                              ),
                            }
                          )}
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
                </details>
                // </div>
              )}
            </div>
          </>
        )
      }}
    </Context.Consumer>
  )
}

export default FilterTabs
