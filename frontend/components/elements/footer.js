import PropTypes from "prop-types"
import { linkPropTypes, mediaPropTypes } from "utils/types"
import NextImage from "./image"
import CustomLink from "./custom-link"
import SNS from "../global/sns"

const Footer = ({ footer, sns }) => {
  return (
    <footer
      className="pt-12 "
      style={{ background: `url('/svg/footer.svg'), #084D92` }}
    >
      <div className="container flex flex-col lg:flex-row lg:justify-between">
        <div className="block">
          {footer.logo && (
            <NextImage width="200" height="200" media={footer.logo} />
          )}
          <SNS data={sns} />
        </div>
        <nav className="flex flex-wrap flex-row lg:gap-20 items-start lg:justify-end mb-10">
          {footer.columns.map((footerColumn) => (
            <div
              key={footerColumn.id}
              className="mt-10 lg:mt-0 w-6/12 lg:w-auto"
            >
              <span className="uppercase text-center tracking-wide font-semibold text-gray-200 text-xl">
                {footerColumn.title}
              </span>
              <ul className="mt-2 mx-2">
                {footerColumn.links.map((link) => (
                  <li key={link.id} className="-mx-1">
                    <CustomLink
                      className="text-gray-100  hover:text-gray-100 active:text-gray-100 visited:text-sky-100"
                      link={link}
                    >
                      {link.text}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="text-sm bg-transparent py-6 text-gray-100">
        <div className="container">{footer.smallText}</div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  footer: PropTypes.shape({
    logo: mediaPropTypes.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(linkPropTypes),
      })
    ),
    smallText: PropTypes.string.isRequired,
  }),
}

export default Footer
