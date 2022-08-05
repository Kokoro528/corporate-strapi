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
    <div className="w-screen h-screen   fixed top-0 left-0 overflow-y-scroll bg-white z-30 pb-6">
      <div className="container divide-y h-full flex flex-col justify-between">
        {/* Top section */}
        <div className="flex  flex-row justify-between py-4 items-center">
          {/* Company logo */}
          <NextImage width="120" height="33" media={navbar.logo} />
          {/* Close button */}
          <button onClick={closeSelf} className="py-1 px-1">
            <MdClose className="h-8 w-auto" />
          </button>
        </div>
        {/* Bottom section */}
        <div className="flex flex-col justify-end w-10/12 mx-auto">
          <ul className="flex flex-col list-none gap-6 items-baseline text-xl mb-10">
            {navbar.links?.map((navLink) => (
              <li key={navLink.id} className="block w-full">
                <CustomLink link={navLink} locale={router.locale}>
                  <div className="hover:text-primary-900 py-3 flex flex-row justify-between items-center">
                    <span>{navLink.text}</span>
                    <MdChevronRight className="h-8 w-auto" />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>
          <ButtonLink
            button={navbar.button}
            appearance={getButtonAppearance(navbar.button.type, "light")}
          />
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
