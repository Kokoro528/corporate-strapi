import PropTypes from "prop-types"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkImages from "remark-images"
import Products from "../global/products"
import NextImage from "../elements/image"
import classNames from "classnames"
import { proseStyle } from "@/styles/prose/utils"

const RichContent = ({ data, pageContext, global }) => {
  let products = {}
  if (global) {
    products = global.attributes.products
  }
  return (
    <div
      style={{
        backgroundImage: data.background?.data?.attributes?.url
          ? `url("${data.background?.data?.attributes?.url}")`
          : "blue",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className={classNames("")}
    >
      <div
        className={classNames(
          "container mb-6 mt-4 prose max-w-screen-xl flex flex-col items-center mt-4",
          proseStyle(data.typeRCS)
        )}
      >
        {data.title && (
          <h1 className="my-5 text-3xl text-center">{data.title}</h1>
        )}
        {data.subtitle && <h2>{data.subtitle}</h2>}
        <div
          className={classNames(
            "prose lg:prose-lg prose-table:table-auto  prose-table:border-separate prose-img:rounded-xl prose-em:text-center py-12 flex flex-col  ",
            // "max-w-prose",
            {
              "prose-invert": data.theme === "dark",
              "prose-w-list": data.typeRCS === "prose_w_list",
              "max-w-screen-md": !data.narrow,
            }
          )}
        >
          <Markdown
            className={classNames(
              {
                "prose-invert": data.theme === "dark",
                "prose-w-list": data.typeRCS === "prose_w_list",
                "max-w-screen-md": !data.narrow,
              },
              " text-align  xl:prose-h1:text-center xl:prose-h3:text-center xl:prose-h2:text-center prose-th:border prose-td:border prose-table:text-center prose-table:table-auto")}
            remarkPlugins={[remarkGfm, remarkImages]}
          >
            {data.content}
          </Markdown>
          {data.media?.data?.map((e) => (
            <div
              key={`media-${data.id}`}
              className="flex-shrink-0 w-full mt-6 md:mt-0"
            >
              <NextImage media={{ data: e }} width={1022} height={600} />
              {/* {JSON.stringify(e)} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RichContent
