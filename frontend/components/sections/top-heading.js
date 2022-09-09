import classNames from "classnames"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
import Markdown from "react-markdown"
import { proseStyle } from "@/styles/prose/utils"
import NextImage from "../elements/image"
import { imageEMT } from "utils/media"

const TopHeading = ({ data }) => {
  const style = {
    backgroundImage: data.backgroundImage?.data?.attributes?.url
      ? `url("${data.backgroundImage?.data?.attributes?.url}")`
      : "blue",
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",

    height: "100%",
  }
  return (
    <section
      className={classNames(" relative text-center ")}
      // style={style}
    >
      {/* <div
        className={classNames("w-full h-full absolute", {
        })}
      > */}
      {!imageEMT(data.backgroundImage) && (
        <NextImage
          media={data.backgroundImage}
          layout="responsive"
          // width="1920"
          // height="830"
          //       layout="fill"
          // sizes="(min-width: 75em) 33vw,
          //         (min-width: 48em) 50vw,
          //         100vw"
          priority
          className={classNames("object-cover absolute", {
            "bg-[url('/svg/dark-layer.svg')] -z-10": data.style === "dark",
          })}
        />
      )}
      {/* </div> */}
      <div
        className={classNames("container", {
          "-translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 absolute":
            !imageEMT(data.backgroundImage),
        })}
      >
        {data.title && (
          <h2
            className={classNames("text-4xl font-bold my-5 prose", {
              "prose-invert drop-shadow-md": data.style === "dark",
            })}
          >
            {data.title}
          </h2>
        )}
        {data.abstract && (
          <Markdown
            className={classNames(
              "top-heading text-center py-12",
              "max-w-prose",
              {
                "prose-invert drop-shadow-md": data.style === "dark",
                "lg:prose-lg": !data.narrow,
              },
              proseStyle(data.style)
            )}
          >
            {data.abstract}
          </Markdown>
        )}

        {data.buttons && (
          <div className="flex flex-col md: flex-row justify-center flex-wrap flex-wrap gap-4 container ">
            {data.buttons.map((button) => (
              <ButtonLink
                button={button}
                appearance={getButtonAppearance(button.type, "light")}
                key={button.id}
                compact
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default TopHeading
