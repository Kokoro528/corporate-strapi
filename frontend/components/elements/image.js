import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"

const NextImage = ({ media, ...props }) => {

  if (!media || !media.data) {
    return (
      <img className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full w-full" />
    )
  }

  const { url, alternativeText, width, height } = media.data.attributes

  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }

  // The image has a fixed width and height
  if (props.width && props.height) {
    return (
      <Image
        loader={loader}
        src={url}
        alt={alternativeText || ""}
        width={width || props.width}
        height={height || props.height}
        {...props}
      />
    )
  }

  // if (url.endsWith("svg")) {
  //   return (
  //     <Image loader={loader} src={url} alt={alternativeText || ""} {...props}  layout="fill" />
  //   )
  // }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      width={props.width || width || 0}
      height={props.height || height || 0}
      objectFit="contain"
      src={url}
      alt={alternativeText || ""}
      {...props}
    />
  )
}

Image.propTypes = {
  media: mediaPropTypes,
  className: PropTypes.string,
}

export default NextImage
