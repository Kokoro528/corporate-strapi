import classNames from "classnames"
import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"

const Culture = ({ data }) => {
  return (
    <div
      style={{
        // backgroundImage: data.background?.data?.attributes?.url
        //   ? `url("${data.background?.data?.attributes?.url}")`
        //   : "blue",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="relative"
    >
      <div className="absolute w-full h-full">
        <NextImage
          media={data.background}
          layout="fill"
          sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
          priority
          className="top-0 left-0  opacity-40"
        />
      </div>

      <main
        className={classNames(
          "container relative lg:max-w-sreen-lg flex flex-col md:flex-row items-center justify-between py-20",
          {
            "text-white": data.type === "dark",
          }
        )}
      >
        {/* Left column for content */}
        <div className="flex-1 bg-white opacity-90 py-3 rounded-lg sm:pr-8 ">
          {data.coreValues.map((feature) => {
            return (
              <div
                className="flex-1 flex  flex-col items-center"
                key={feature.id}
              >
                <div className="inline-flex">
                  <div className="w-12 h-12 md:w-24 h-24  relative inline-flex">
                    <NextImage
                      media={feature.icon}
                      width="1"
                      height="1"
                      layout="fill"
                    />
                    {/* <h3 className="left-full text-tongyuan-blue top-1/2 leading-24 -mt-12 text-5xl w-full  ml-2 align-middle  w-full absolute">{feature.title || feature.titleFCG}</h3> */}
                  </div>
                  <h3 className="font-bold text-tongyuan-blue leading-24 mt-12 ml-4 mb-4">
                    {feature.title || feature.titleFCG}
                  </h3>
                </div>

                <Markdown className="text-md text-center prose">
                  {feature.description}
                </Markdown>
              </div>
            )
          })}
        </div>
        {/* Right column for the image */}
        <div className="flex-shrink-0 w-full md:w-6/12 my-6 md:mt-0">
          {data.cultureEpitome.map((feature) => {
            return (
              <div
                className="flex-1 flex flex-col items-center"
                key={feature.id}
              >
                <div className="w-20 h-20 relative">
                  <NextImage
                    media={feature.icon}
                    width="1"
                    height="1"
                    layout="fill"
                  />
                </div>
                <h3 className="font-bold mt-4 mb-4">
                  {feature.title || feature.titleFCG}
                </h3>
                <Markdown className="text-md text-center prose">
                  {feature.description}
                </Markdown>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

export default Culture
