import Context from "./context"
import { useRouter } from "next/router"
import { Link } from "next/link"
import classNames from "classnames"
import { MdMenu, MdArrowUpward, MdArrowDownward } from "react-icons/md"

import { useState } from "react"
import { transparent } from "tailwindcss/colors"
const FilterTabs = ({ children, enumColumn, menubar }) => {
  const router = useRouter()

  const [showCategory, setShowCategory] = useState(false)
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
    // <Context.Consumer>
    //   {({ global, pageContext }) => {
    //     const enums = global.attributes.enums[enumColumn]
    // return (
    <div>
      {menubar && (
        <>
          <nav className="relative bg-primary-100">
            {!!menubar.nestedLinks.length && (
              <div className="container text-left">
                <ul
                  className="hidden md:nav md:py-2  md:max-w-screen-lg md:justify-start md:flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 w-screen  "
                  id="tabs-tabFill"
                  role="tablist"
                >
                  <li
                    className="nav-item text-center block font-large text-md leading-tight"
                    key="page-title"
                  >
                    <a
                      href={menubar.url}
                      className={classNames(
                        "nav-link text-neutral-900  w-full  uppercase  border-t-0 border-r-2 border-neutral-900 y-2",
                        { "font-bold text-neutral-900": isActive("") }
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
                          "nav-link text-neutral-900  w-full block font-large text-md leading-tight  uppercase  y-2",
                          { "font-bold text-neutral-900": isActive(e.url) }
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
          </nav>
        </>
      )}
      <div className="tab-content" id={"tabs-tabContent"}>
        <div
          className="tab-pane fade show active"
          id={"tabs-" + ""}
          role="tabpanel"
          aria-labelledby={"tabs-" + "e"}
        >
          {children}
        </div>
      </div>
      {!!menubar?.nestedLinks.length && (
        <div className=" sticky bottom-0">
          <div
            className={classNames(
              " flex flex-col-reverse items-end  bottom-0",
              { "bg-gray-100": showCategory },
              "md:hidden "
            )}
          >
            <button
              onClick={() => setShowCategory(!showCategory)}
              className={classNames(
                "bg-transparent relative float-right block p-2 text-primary-500",
                { "bg-inherit": showCategory }
              )}
            >
              <span className="block ">
                {showCategory ? (
                  <MdArrowDownward className=" w-auto h-12 " />
                ) : (
                  <MdArrowUpward className="w-auto h-12 " />
                )}
              </span>
            </button>

            <ul
              className={classNames(
                "opacity-100 whitespace-nowrap",
                "w-screen bg-gray-100 right-0 relative",
                //  "animate-[wiggle_1s_ease-in-out_infinite]",
                //  "transform-y-full",
                "p-1",
                "md:nav md:py-2  md:justify-center md:flex flex-col md:flex-row flex-wrap list-none ",
                { hidden: !showCategory }
              )}
              id="tabs-tabFill"
              role="tablist"
            >
              <li className="nav-item text-center " key="page-title">
                <a
                  href={menubar.url}
                  className={classNames(
                    "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  y-2",
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
                      "nav-link text-sky-700  w-full block font-large text-md leading-tight  uppercase  y-2",
                      {
                        "font-bold text-sky-900 bg-white": isActive(e.url),
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
          </div>
        </div>
      )}
    </div>
    // )
    // }}
    // </Context.Consumer>
  )
}

export default FilterTabs
