import { getStrapiMedia } from "utils/media"
import Image from "next/image"
import PropTypes from "prop-types"
import { mediaPropTypes } from "utils/types"

const NextImage = ({ media, ...props }) => {
  const loader = ({ src, width }) => {
    return getStrapiMedia(src)
  }
  if (!media || !media.data) {
    return (    
      props.width && props.height?
      <Image
        
        src={"/svg/gumi327.svg"}
        alt={""}
        width={props.width}
        height={props.height }
        quality="100"
        objectFit="cover"
        {...props}
      />: null
    )
  }
  const { url, alternativeText, width, height } = media.data.attributes

  // The image has a fixed width and height
  if ((props.width || width) && (props.height || height)) {
    return (
      <Image
        loader={loader}
        src={url}
        alt={alternativeText || ""}
        width={width || props.width}
        height={height || props.height}
        quality="100"
        {...props}
      />
    )
  }

  // if (!props.width && !props.height) {
  //   return (
  //     <figure className="relative">
  //       <Image
  //       loader={loader}
  //       layout="fill"
  //       width={16}
  //       height={9}
  //       src={url}
  //       alt={alternativeText || ""}
  //       {...props}
  //     />
  //     </figure>

  //   )
  // }

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
      width={props.width || width || 16}
      height={props.height || height || 9}
      src={url}
      objectFit="contain"
      quality={100}
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
