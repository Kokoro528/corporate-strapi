import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"
import Video from "../elements/video"
import FeatureColumnGroup from "./feature-columns-group"
import classNames from "classnames"

const SolutionFeature = ({ data }) => {
  return (
    <section className=" flex flex-col  items-center justify-between py-6  bg-primary-50">
      {/* Left column for content */}

      {/* <div className="flex-1 sm:pr-8"> */}
      {/* Hero section label */}
      {/* <p className="uppercase tracking-wide font-semibold">{data.label}</p> */}
      {/* Big title */}
      <div className="container">
        <h1 className="title mt-2 sm:mt-0 mb-4 sm:mb-2 text-center text-lg">
          {data.title}
        </h1>
        {/* Description paragraph */}
        {/* <p className="text-xl mb-6">{data.description}</p> */}
        {/* Buttons row */}
        <div className="flex flex-row flex-wrap gap-4">
          {/* {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))} */}
          {/* <FeatureColumnGroup data={data.bulletPoints} /> */}

          <div className=" flex flex-col gap-12 py-12">
            {data.bulletPoints.map((feature, index) => (
              <div
                className={classNames(
                  // Common classes
                  "flex flex-col justify-start md:justify-between md:items-center gap-10",
                  {
                    "lg:flex-row": index % 2 === 0,
                    "lg:flex-row-reverse": index % 2 === 1,
                  }
                )}
                key={feature.id}
              >
                {/* Text section */}
                <div className="w-full lg:w-6/12 lg:pr-6 text-lg ">
                  <h3 className="text-[30px] font-semibold leading-relaxed ">{feature.title}</h3>
                  <p className="my-6">{feature.description}</p>
                  {/* <CustomLink link={feature.link}>
              <div className="text-blue-600 with-arrow hover:underline">
                {feature.link.text}
              </div>
            </CustomLink> */}
                </div>
                {/* Media section */}
                <div className="w-full sm:9/12 lg:w-8/12 max-h-full">
                  {/* Images */}
                  {feature.icon.data.attributes.mime.startsWith("image") && (
                    <div className="w-full ">
                      <NextImage  media={feature.icon} />
                    </div>
                  )}
                  {/* Videos */}
                  {feature.icon.data.attributes.mime.startsWith("video") && (
                    <Video
                      media={feature.icon}
                      className="w-full h-auto"
                      autoPlay
                      controls={false}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* Small rich text */}
          {/* <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
          <Markdown>{data.smallTextWithLink}</Markdown>
        </div> */}
        </div>
      </div>

      {/* Right column for the image */}
      {/* <div className="flex-shrink-0 w-full md:w-6/12 mt-6 md:mt-0">
        <NextImage media={data.media} />
      </div> */}
    </section>
  )
}

export default SolutionFeature
