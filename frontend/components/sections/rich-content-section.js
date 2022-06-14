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
    <div className="container justify-center mt-4">
      <h1 className="title mt-5">{data.title}</h1>
      <h1>{data.subtitle}</h1>
      <div className="prose prose-lg py-12 flex flex-col justify-items-center mx-6">
        <Markdown remarkPlugins={[remarkGfm, remarkImages]}>
          {data.content}
        </Markdown>
        <div className="flex-shrink-0 w-full mt-6 md:mt-0">
          <NextImage media={data.media} />
        </div>
      </div>
    </div>
  )
}

export default RichContent
