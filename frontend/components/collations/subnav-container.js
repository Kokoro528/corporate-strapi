import { func } from "prop-types"
import { object } from "prop-types"
import { useCallback, useEffect, useState, useMemo } from "react"
import { getCollectionList } from "utils/api"
import CustomLink from "../elements/custom-link"
import classNames from "classnames"
import ProductSubcontainer from "../global/product-subnav"
import useSWR, { mutate, useSWRConfig } from "swr"
import { Router, useRouter } from "next/router"
import { useSession } from "next-auth/react"
const Subnav = (props) => {
  const { parentId, pluralName, enums, navLink, globals } = props
  // const [data, setData] = useState([])
  const [selectedSideTab, setSelectedSideTab] = useState(null)
  const router = useRouter()
  // const { data: session } = useSession()

  // const getSelectedNavLink = () => {
  //   return navbar.links.find(link => link.url === pluralName)
  // }

  useEffect(() => {
    return () => {
      if (navLink.nestedLinks.length) setSelectedSideTab(null)
    }
  }, [])
  const { cache, mutate, fetcher, ...restConfig } = useSWRConfig()

  const isExisted = () => cache.get("/api/collection" + pluralName)
  const { data, error } = useSWR(
    !isExisted() ? "/api/collection" + pluralName : null,
    fetcher
  )

  mutate(data?.data)

  if (!navLink.nestedLinks || !navLink.nestedLinks.length) {
    return null
  }
  if (navLink.url === "/products") {
    return <ProductSubcontainer />
  }
  // when nestedLinks are documents divided by categories.
  if (navLink.nestedLinks.length) {
    if (navLink.nestedLinks[0].url.includes("=")) {
      return (
        <div
          className="
        mega-menu w-full -mt-3 hidden absolute left-0 top-full z-30
        "
          aria-labelledby={`subNav${navLink.text}`}
        >
          <div className="container ">
            <div className="row my-4">
              <div className="col-md-6 col-xl-3 mb-3 mb-xl-0">
                <div className="pt-2">
                  <div className="flex items-start">
                    <ul
                      className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4"
                      id="tabs-tabVertical"
                      role="tablist border-r-1"
                    >
                      {navLink.nestedLinks.map((e1, idx) => (
                        <li
                          className="nav-item flex-grow text-center hover:border-r-3"
                          key={`tab-${Math.random()}`}
                          role="presentation"
                          onMouseOver={(e) => {
                            e.preventDefault()
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
          hover:border-transparent hover:border-r-2 hover:border-yellow-300 border-solid
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
              <ul
                className="col grid grid-cols-2 gap-4 p-4"
                id="tabs-tabContentVertical"
              >
                {isExisted()
                  ?.data?.filter((e) =>
                    selectedSideTab
                      ? e.attributes.category === selectedSideTab
                      : true
                  )
                  .map((e) => (
                    <li key={`${Math.random()}-${pluralName}-${e.id}`}>
                      <CustomLink
                        link={{
                          id: `${pluralName.substring(1)}-link-${e.id}`,
                          url: `${pluralName}/${e.attributes.title}`,
                          text: `${e.attributes.title}`,
                        }}
                      >
                        {e.attributes.title}
                      </CustomLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )
    } else {
      // console.log(selectedSideTab, "selected")
      return (
        <div
          className="
        mega-menu w-full -mt-3 hidden absolute left-0 top-full z-30
        "
          aria-labelledby={`subNav${navLink.text}`}
        >
          <div className="container ">
            <div
              className="grid grid-cols-2 gap-4 my-4 p-4"
              id="tabs-tabContentVertical"
            >
              {navLink.nestedLinks?.map((e) => (
                <li key={`${e.text}-${e.url}-${e.id}`}>
                  <CustomLink link={{ url: `${e.url}` }}>{e.text}</CustomLink>
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
