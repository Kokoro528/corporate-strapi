import classNames from "classnames"
import Markdown from "react-markdown"
import { getButtonAppearance } from "utils/button"
import { imageEMT } from "utils/media"
import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"

const Hero = ({ data }) => {
  return (
    <main
      // style={{
      //   backgroundImage: data.background?.data?.attributes?.url
      //     ? `url("${data.background?.data?.attributes?.url}")`
      //     : "blue",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover"

      // }}
      className="relative"
    >
      {/* <div className="absolute w-full "> */}
      <NextImage
        media={data.background}
        layout="responsive"
        // width="1920"
        // height="830"
        priority
        className={classNames("absolute -z-10", "object-cover")}
        // className={classNames("object-cover", {
        //   "bg-[url('/svg/dark-layer.svg')] -z-10": data.style === "dark",
        // })}
      />
      {/* </div> */}

      <div
        className={classNames(
          "container   flex flex-col md:flex-row md:my-auto items-center justify-between py-20",
          {
            "text-white drop-shadow-md": data.type === "dark",
            "absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2":
              !imageEMT(data.background),
          }
        )}
      >
        {/* Left column for content */}
        <div className="flex-1 sm:pr-8 ">
          {/* Hero section label */}
          <p className="uppercase tracking-wide font-semibold">{data.label}</p>
          {/* Big title */}
          <h1
            className={classNames(
              "text-5xl text-slate-500 font-bold mt-2 sm:mt-0 mb-4 sm:mb-2",
              { "text-white": data.type === "dark" }
            )}
          >
            {data.title}
          </h1>
          {/* Description paragraph */}
          <p className="text-xl mb-6">{data.description}</p>
          {/* Buttons row */}
          <div className="flex flex-row flex-wrap gap-4">
            {data.buttons.map((button) => (
              <ButtonLink
                button={button}
                appearance={getButtonAppearance(button.type, "light")}
                compact
                key={button.id}
              />
            ))}
          </div>
          {/* Small rich text */}
          <div className="text-base md:text-sm mt-4 sm:mt-3 rich-text-hero">
            <Markdown
              className={classNames("rich-text-hero", {
                "prose-invert drop-shadow-md": data.type === "dark",
              })}
            >
              {data.smallTextWithLink}
            </Markdown>
          </div>
        </div>
        {/* Right column for the image */}
        <div className="flex-shrink-0 flex-1 md:w-6/12 my-6 md:mt-0">
          <NextImage media={data.picture} sizes="40vw" />
        </div>
      </div>
    </main>
  )
}

export default Hero
