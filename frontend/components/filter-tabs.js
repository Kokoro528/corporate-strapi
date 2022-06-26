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
                  className="nav flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
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
