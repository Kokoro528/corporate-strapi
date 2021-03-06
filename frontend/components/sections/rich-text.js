import PropTypes from "prop-types"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkImages from "remark-images"
import Products from "../global/products"

const RichText = ({ data, pageContext, global }) => {
  let products = {}
  if (global) {
    products = global.attributes.products
  }
  return (
    <div className="container">
      {pageContext.resolvedUrl?.includes("cases/") && (
        <div className="itembar-right">
          <Products {...products} />
        </div>
      )}
      <div className="prose prose-lg py-12 flex flex-col justify-items-center">
        <Markdown remarkPlugins={[remarkGfm, remarkImages]}>
          {data.content}
        </Markdown>
      </div>
    </div>
  )
}

RichText.propTypes = {
  data: PropTypes.shape({
    content: PropTypes.string,
  }),
}

export default RichText
