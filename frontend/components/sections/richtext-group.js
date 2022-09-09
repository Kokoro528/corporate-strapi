import classNames from "classnames"
import NextImage from "../elements/image"
import Video from "../elements/video"
import CustomLink from "../elements/custom-link"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkImages from "remark-images"

const RichtextGroup = ({ data }) => {
  return (
    <section className="relative w-full">
      <div className="absolute h-full w-full backdrop-blur-sm">
        <NextImage
          media={data.background}
          layout="fill"
          className="-z-10 object-cover backdrop-blur-sm"
        />
      </div>
      <div className="container relative">
        {data.title && (
          <h1 className="title my-12 text-center font-lg xl:font-xl">
            {data.title}
          </h1>
        )}
        <div className="grid mx-6 md:grid-cols-2  grid-cols-1 max-w-screen-lg gap-12 py-12 mx-auto">
          {data.contentList.map((content, index) => (
            <div
              className={classNames(
                // Common classes
                "prose",
                { "prose-invert": data.dark },
                " justify-start rounded-lg p-3 md:justify-between md:items-center gap-10",
                //   "background-with-number",
                // {
                //   "lg:flex-row": index % 2 === 0,
                //   "lg:flex-row-reverse": index % 2 === 1,
                // }
                // "bg-gradient-to-br from-primary-50 "
                " bg-cover bg-center bg-white bg-blend-saturate bg-neutral-",
                "animate-[fadeIn_3s_ease_3s_1] "
              )}
              key={`simpleF${index}`}
              style={
                {
                  // backgroundImage: `url("${backgroundImage(index)}")`,
                  // backgroundSize: "100% 100%",
                }
              }
            >
              <Markdown
                className="prose"
                remarkPlugins={[remarkGfm, remarkImages]}
              >
                {content.content}
              </Markdown>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RichtextGroup
