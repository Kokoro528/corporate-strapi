import classNames from "classnames"
import NextImage from "../elements/image"
import Video from "../elements/video"
import CustomLink from "../elements/custom-link"
import { backgroundImage } from "../../utils/text-background"

const SimpleFeatures = ({ data }) => {
  return (
    <div className="container  ">
      <h1 className="title text-center font-lg xl:font-xl">{data.title}</h1>
      <div className="grid mx-6 md:grid-cols-2  grid-cols-1 max-w-screen-lg gap-12 py-12 mx-auto">
        {data.features.map((feature, index) => (
          <div
            className={classNames(
              // Common classes
              " justify-start rounded-lg p-3 md:justify-between md:items-center gap-10",
              "background-with-number",
              // {
              //   "lg:flex-row": index % 2 === 0,
              //   "lg:flex-row-reverse": index % 2 === 1,
              // }
              "bg-gradient-to-br from-primary-50 to-white"
            )}
            key={`simpleF${index}-${feature.title}`}
            style={{
              // backgroundImage: `url("${backgroundImage(index)}")`,
              backgroundSize: "100% 100%",
            }}
          >
            {/* Text section */}
            {/* {backgroundImage(index)} */}
            <div className=" lg:pr-6 text-lg">
              <h3 className="text-md font-bold">{feature.title}</h3>
              <p className="my-6">{feature.description}</p>
            </div>
            {/* Media section */}
            {/* <div className="w-full sm:9/12 lg:w-4/12 max-h-full"> */}
            {/* Images */}
            {/* {feature.media?.data.attributes.mime.startsWith("image") && (
              <div className="w-full h-auto">
                <NextImage media={feature.media} />
              </div>
            )} */}
            {/* Videos */}
            {/* {feature.media?.data.attributes.mime.startsWith("video") && (
              <Video
                media={feature.media}
                className="w-full h-auto"
                autoPlay
                controls={false}
              />
            )} */}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SimpleFeatures
