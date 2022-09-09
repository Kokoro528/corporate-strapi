import NextImage from "../elements/image"
import Markdown from "react-markdown"
import classNames from "classnames"
import CustomLink from "../elements/custom-link"
import ButtonLink from "../elements/button-link"
import { getButtonAppearance } from "utils/button"

const LibraryList = ({ data }) => {
  return (
    <div
      className="flex "
      style={{
        backgroundImage: data.backgroundImage?.data?.attributes?.url
          ? `url("${data.backgroundImage?.data?.attributes?.url}")`
          : "blue",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* <div className="absolute w-full h-full -z-10">
        <NextImage
          media={data.backgroundImage}
          className="object-stretch"
        ></NextImage>
      </div> */}
      <div
        className={classNames(
          "container max-w-screen-lg h-full py-12 flex flex-col gap-12 align-top",
          // "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
          "text-center"
        )}
      >
        {data.title && <h1 className="title ">{data.title}</h1>}
        {data.brief && <Markdown className="prose">{data.brief}</Markdown>}
        <div
          className={classNames(
            "flex md:grid md:auto-cols-max md:grid-cols-6",
            "gap-4"
          )}
        >
          {data.libraries?.data?.map((feature, idx) => (
            <div
              className={classNames(
                "flex-1 flex flex-col items-center",
                "col-span-2",
                " bg-white rounded-md",
                "card"
              )}
              key={feature.id}
            >
              <div className="download">
                <div className="text-base text-center px-3 prose flex-1">
                  {feature.attributes.snippet}
                </div>
              </div>
              {/* <div className=" align-center p-2 h-full w-full border-silver text-center "> */}
              <div className="w-32  mt-3 mb-1">
                <NextImage
                  media={feature.attributes.icon}
                  layout="responsive"
                  sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
                />
              </div>
              <p className="flex-none">{feature.attributes.formalName}</p>
              {feature.attributes.title && (
                <h3 className="font-bold text-lg mt-1 mb-1 flex-none">
                  {feature.attributes.title || feature.attributes.titleFCG}
                </h3>
              )}
              <div
                title={feature.attributes.snippet}
                className="text-base text-center w-full px-3 prose basis-24 flex-none  "
              >
                {feature.attributes.snippet}
              </div>
              {/* </div> */}

              {feature.attributes.downloads && (
                <div className="flex">
                  {feature.attributes.downloads.map((button) => {
                    return (
                      <ButtonLink
                        button={button}
                        appearance={getButtonAppearance(button.type, "dark")}
                        key={button.id}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LibraryList
