import classNames from "classnames"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
import Markdown from "react-markdown"
import { proseStyle } from "@/styles/prose/utils"
import NextImage from "../elements/image"

const TopHeading = ({ data }) => {
  const style = {
    // backgroundImage: data.backgroundImage?.data?.attributes?.url
    //   ? `url("${data.backgroundImage?.data?.attributes?.url}")`
    //   : "blue",
    // backgroundPosition: "center",
    // backgroundSize: "contain",
    // backgroundRepeat: "no-repeat",
  }
  return (
    <section className={classNames("  relative text-center")} style={style}>
      <div
        className={classNames("w-full h-full absolute", {
          "bg-[url('/svg/dark-layer.svg')]": data.style === "dark",
        })}
      >
        <NextImage
          media={data.backgroundImage}
          layout="fill"
          width="4"
          height="3"
          priority
          className={classNames("object-cover", {
            "bg-[url('/svg/dark-layer.svg')] -z-10": data.style === "dark",
          })}
        />
      </div>
      <div className={classNames("container relative")}>
        {data.title && <h2 className={classNames("text-5xl my-5 prose", {"prose-invert": data.style === 'dark'})}>{data.title}</h2>}
        <Markdown
          className={classNames(
            "top-heading text-center",
            "max-w-prose",
            {
              "prose-invert ": data.style === "dark",
              "prose-lg": !data.narrow,
            },
            proseStyle(data.style)
          )}
        >
          {data.abstract}
        </Markdown>
        {data.buttons &&
          data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={getButtonAppearance(button.type, "light")}
              key={button.id}
            />
          ))}
      </div>
    </section>
  )
}

export default TopHeading
