import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

import Subnav from "../collations/subnav-container"

const Navbar = ({ navbar, pageContext, global }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)
  const [selectedNavItem, setSelectedNavItem] = useState("/")

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
      <nav className="sticky z-30 h-20 top-0 navbar navbar-expand-lg z-10 shadow-lg py-2 bg-gray-50 relative flex items-center w-full justify-between border-gray-200 border-b-2 py-6 sm:py-2 ">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="h-8 w-32">
                <NextImage media={navbar.logo} />
              </a>
            </Link>
            {/* List of links on desktop */}
            <ul className="hidden  list-none sm:flex md:flex flex-row md:gap-4 items-baseline ml-10">
              {navbar.links.map((navLink) => (
                <li
                  className="z-40 hoverable "
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
                      className={` ${
                        routerContains(navLink)
                          ? `border-b-4 border-primary-400`
                          : ""
                      } px-2 py-1  block pr-2 lg:px-2 py-2 text-gray-700 hover:text-orange-700  hover:font-bold focus:text-orange-700 transition duration-150 ease-in-out flex items-center whitespace-nowrap`}
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
              ))}
            </ul>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {/* {pageContext.localizedPaths && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )} */}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, "light")}
                  compact
                />
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
