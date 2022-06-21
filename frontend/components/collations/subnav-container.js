import { func } from "prop-types"
import { object } from "prop-types"
import { useCallback, useEffect, useState, useMemo } from "react"
import { getCollectionList } from "utils/api"
import CustomLink from "../elements/custom-link"
import classNames from "classnames"
import ProductSubcontainer from "../layout/product-subnav"
const Subnav = (props) => {
  const { parentId, pluralName, enums, navLink, globals } = props
  const [data, setData] = useState([])
  const [selectedSideTab, setSelectedSideTab] = useState(null)
  const [displayList, setDisplayList] = useState(null)
  // console.log(enums, "enums")

  // const getSelectedNavLink = () => {
  //   return navbar.links.find(link => link.url === pluralName)
  // }

  // useMemo(() => {
  //   setDisplayList(getSelectedNavLink().nestedLinks)
  // }, [pluralName])

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (pluralName) {
          const res = await getCollectionList(parentId)
          if (res.data?.length) {
            setData(res.data)
          }
        }
      } catch (err) {
        console.log("err: suanle")
      }
    }
    fetchCollection()
  }, [])

  // const tab =
  // useCallback(() => {

  // })

  if (!navLink.nestedLinks || !navLink.nestedLinks.length) {
    console.log("asdf")
    return null
  }
  if (navLink.url === "/products") {
    console.log("ajsjdjs")
    return <ProductSubcontainer />
  }
  // when nestedLinks are documents divided by categories.
  if (navLink.nestedLinks.length) {
    if (navLink.nestedLinks[0].url.includes("=")) {
      return (
        <div
          className="
        mega-menu w-full -mt-3 hidden bg-white absolute left-0 top-full
        "
          aria-labelledby={`subNav${navLink.text}`}
        >
          <div className="container z-40">
            <div className="row my-4">
              <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
                <div className="pt-2">
                  <div className="flex items-start">
                    <ul
                      className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
                      id="tabs-tabVertical"
                      role="tablist border-r-1"
                    >
                      {navLink.nestedLinks.map((e1) => (
                        <li
                          className="nav-item flex-grow text-center"
                          key={`tab-${e1.url}`}
                          role="presentation"
                          onMouseOver={(e) => {
                            // e.preventDefault();
                            setSelectedSideTab(
                              e1.url.substring(e1.url.indexOf("=") + 1)
                            )
                          }}
                        >
                          <a
                            href={e1.url}
                            className="
          
          block
          font-medium
          text-sm
          leading-tight
          uppercase
          border-transparent
          px-6
          py-3
          my-2
          hover:border-transparent hover:bg-gray-100
          focus:border-transparent
          active
        "
                            key={`tab${parentId}-${e1.url.substring(1)}`}
                          >
                            {e1.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="col grid grid-cols-2 gap-4 p-4"
                id="tabs-tabContentVertical"
              >
                {selectedSideTab &&
                  selectedSideTab.length &&
                  data
                    .filter((e) => e.attributes.category === selectedSideTab)
                    .map((e) => (
                      <li
                        key={`${e.attributes.category}-${pluralName}-${e.id}`}
                      >
                        <CustomLink
                          link={{ url: `${pluralName}/${e.attributes.title}` }}
                        >
                          {e.attributes.title}
                        </CustomLink>
                      </li>
                    ))}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="
        mega-menu w-full -mt-3 hidden bg-white absolute left-0 top-full
        "
          aria-labelledby={`subNav${navLink.text}`}
        >
          <div className="container z-40">
            <div
              className="grid grid-cols-2 gap-4 p-4"
              id="tabs-tabContentVertical"
            >
              {selectedSideTab &&
                selectedSideTab.length &&
                data.map((e) => (
                  <li key={`${e.attributes.title}-${pluralName}-${e.id}`}>
                    <CustomLink
                      link={{ url: `${pluralName}/${e.attributes.title}` }}
                    >
                      {e.attributes.title}
                    </CustomLink>
                  </li>
                ))}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Subnav
