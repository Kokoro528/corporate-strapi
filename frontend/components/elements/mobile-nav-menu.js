import PropTypes from "prop-types"
import { MdClose, MdChevronRight } from "react-icons/md"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { useLockBodyScroll } from "utils/hooks"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"

const MobileNavMenu = ({ navbar, closeSelf, router }) => {
  // Prevent window scroll while mobile nav menu is open
  useLockBodyScroll()
  return (
    <div className="w-screen text-gray-700 h-screen   fixed top-0 left-0 overflow-y-scroll bg-white z-30 pb-6">
      <div className="container py-3 divide-y h-full flex flex-col ">
        {/* Top section */}
        <div className="flex py-3 flex-row justify-between  items-center">
          {/* Close button */}
          <button onClick={closeSelf} className="py-1 px-1">
            <MdClose className="h-8 w-auto" />
          </button>
          {/* Company logo */}
          <NextImage width="120" height="33" media={navbar.logo} />
          <a href={navbar.button.url} className="p-1">
            {navbar.button.text}
          </a>
        </div>
        {/* Bottom section */}
        <div className="flex-1 ">
          <ul className="flex flex-1 flex-col list-none items-baseline text-xl mb-10 divide-y">
            {navbar.links?.map((navLink) => (
              <li key={navLink.id} className=" w-full">
                <CustomLink
                  link={navLink}
                  locale={router.locale}
                  onClick={closeSelf}
                >
                  <div className="hover:text-primary-700 py-3 mx-2 flex flex-row justify-between items-center">
                    <span className="flex-1 font-semibold">{navLink.text}</span>
                    <MdChevronRight className="h-8 w-auto" />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

MobileNavMenu.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  closeSelf: PropTypes.func,
}

export default MobileNavMenu
