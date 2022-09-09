import { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"
import SearchBar from "../forms/search-bar"
import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

import Subnav from "../collations/subnav-container"
import { signOut, useSession } from "next-auth/react"
import { AiOutlineUser } from "react-icons/ai"

const Navbar = ({ navbar, pageContext, global }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)
  const [selectedNavItem, setSelectedNavItem] = useState("/")
  const account = navbar.button
  account.text = <AiOutlineUser className="h-6 w-auto" />

  const { data: session, error } = useSession()

  const routerContains = (navLink) => {
    const pathSlug = router.asPath.substring(1)
    const navLinkSlug = navLink.url.substring(1)
    return (
      (pathSlug.includes(navLinkSlug) && navLinkSlug !== "") ||
      (pathSlug === "" && navLinkSlug === "")
    )
  }

  return (
    <>
      {/* The actual navbar */}
      <nav className="sticky z-30 h-20 top-0 navbar navbar-expand-lg bg-white py-2 relative flex items-center w-full justify-between border-gray-200 border-b-2 py-6 sm:py-2 ">
        <div className="container flex flex-wrap flex-row items-center justify-between">
          {/* Content aligned to the left */}
          {/* <div className="flex flex-row justify-between"> */}
          <Link href="/" className="flex-none h-8 w-32">
            <a className="h-8 w-32  flex-none">
              <NextImage media={navbar.logo} />
            </a>
          </Link>
          {/* List of links on desktop */}
          <ul className="hidden z-40 list-none text-ellipsis grow sm:flex md:flex flex-row lg:gap-4 items-baseline ml-10">
            {navbar.links.map((navLink) => (
              <>
                <li
                  className="z-30 hoverable "
                  key={navLink.id}
                  onMouseOver={() => {
                    setSelectedNavItem(navLink.url)
                  }}
                >
                  <CustomLink link={navLink}>
                    <div
                      id={"subNav" + navLink.text}
                      data-bs-toggle="dropdown"
                      // data-bs-target={"#subNav"+navLink.text}
                      className={`${
                        routerContains(navLink)
                          ? `border-b-4 border-primary-400`
                          : ""
                      } px-2 py-1  block lg:gap-2 lg:px-2 py-2  text-gray-700 truncate  hover:font-bold focus:text-orange-700 transition duration-150 ease-in-out flex items-center whitespace-nowrap`}
                    >
                      {navLink.text}
                    </div>
                  </CustomLink>
                  <Subnav
                    parentId={navLink.url.substring(1)}
                    enums={global?.attributes.enums}
                    navLink={navLink}
                    pluralName={navLink.url}
                  />
                </li>
              </>
            ))}
          </ul>
          <div className="flex flex-none">
            {/* Locale Switch Mobile */}
            {/* {pageContext.localizedPaths && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )} */}
            {/* Search Bar */}
            <SearchBar />

            {/* <div className="inline-flex focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-60">
              <label htmlFor="defaultSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                  className="block py-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </div>
            </div> */}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(!mobileMenuIsShown)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:inline-flex">
                <ButtonLink
                  button={account}
                  appearance={"white"}
                  compact
                  // children={navbar.button}
                  // link={navbar.button}
                ></ButtonLink>
              </div>
            )}
            {/* Locale Switch Desktop */}
            {/* {pageContext.localizedPaths && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )} */}
          </div>
        </div>

        {/* </div> */}
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          router={router}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
