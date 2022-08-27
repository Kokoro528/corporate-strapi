import { MdCheckBox } from "react-icons/md"
import classNames from "classnames"
import NextImage from "../elements/image"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"
import Markdown from "react-markdown"
import CustomLink from "../elements/custom-link"
const MworksIntros = ({ data }) => {
  return (
    <div
      className="relative"
      // style={{
      //     backgroundImage: data.background?.data?.attributes?.url
      //       ? `url("${data.background?.data?.attributes?.url}")`
      //       : "blue",
      //     backgroundRepeat: "no-repeat",
      //     backgroundSize: "cover",
      //   }}
    >
      <div className="absolute h-full w-full backdrop-blur-sm">
        <NextImage
          media={data.backgroundImage}
          layout="fill"
          className="-z-10 object-cover backdrop-blur-sm"
        />
      </div>
      <section className="container py-20 relative">
        <div className=" flex flex-col ">
          <Markdown
            className={classNames(
              "prose py-3 text-center prose-headings:underline prose-p:py-3 self-center",
              { "prose-invert": data.isDark }
            )}
          >
            {data.richtext}
          </Markdown>
          <div className="self-center inline-flex gap-4">
            {data.links?.map((link) => (
              <ButtonLink
                className=""
                appearance={getButtonAppearance(link.type, "white")}
                compact
                button={link}
                key={"buttonlink-" + Math.random()}
              />
            ))}
          </div>
        </div>

        <div className="flex mx-12 py-4 flex-col flex-wrap md:flex-row md:gap-12 md:justify-center mt-6">
          {data.learnings?.map((learning, idx) => (
            <div
              className={classNames(
                // Common classes
                "rounded-md  w-full px-4 flex-grow flex-shrink-0 md:flex-shrink-1 basis-1/2 md:basis-0 flex flex-wrap items-center flex-col",
                "bg-gradient-to-t from-sky-100 via-sky-50 to-slate-50 "
              )}
              key={"learning-" + idx}
            >
              <div className="h-32 w-auto relative mt-3">
                {learning.icon && (
                  <div className="w-full h-24 relative top-4">
                    <NextImage
                      media={learning.icon}
                      sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
                      layout="fixed"
                      className={"object-scale-down"}
                    />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold break-normal text-neutral-600">
                {learning.title}
              </h2>
              <CustomLink link={learning} className="">
                <span className="with-arrow leading-8 text-primary-500 py-3 mb-4">
                  开始学习
                </span>
              </CustomLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MworksIntros
