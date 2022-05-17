import Link from "next/link"
import PropTypes from "prop-types"
import { linkPropTypes } from "utils/types"

const CustomLink = ({ link, children }) => {
  const isInternalLink = link.url.startsWith("/")

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href={link.url}>
        <a>{children}</a>
      </Link>
    )
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary-900">
        {children}
      </a>
    )
  }

  return (
    <a href={link.url} target="_self" className="text-primary-900">
      {children}
    </a>
  )
}

CustomLink.propTypes = {
  link: linkPropTypes,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default CustomLink
