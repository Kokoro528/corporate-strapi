import PropTypes from "prop-types"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkImages from "remark-images"
import Products from "../global/products"
import NextImage from "../elements/image"

const RichContent = ({ data, pageContext, global }) => {
  let products = {}
  if (global) {
    products = global.attributes.products
  }
  return (
    <div className="container flex flex-col items-center mt-4">
      {data.title && <h1 className="title mt-5">{data.title}</h1>}
      {data.subtitle && <h1>{data.subtitle}</h1>}
      <div className="prose-xl prose-pink lg:prose-lg prose-table:table-auto  prose-table:border-separate prose-img:rounded-xl prose-em:text-center prose-figcaption:text-center py-12 flex flex-col  ">
        <Markdown
          className="prose-xl lg:prose-lg prose-headings:text-orange-600 prose-headings:prose-headings prose-h1:text-center prose-h3:text-center prose-h2:text-center prose-th:border prose-td:border prose-table:text-center prose-table:table-auto prose "
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
  )
}

export default RichContent
