import PropTypes from "prop-types"
import Markdown from "react-markdown"
import Products from "../global/products"

const RichText = ({ data , pageContext, global}) => {
  let products = {}
  if (global) {
    products = global.attributes.products
    
  }
  return (
    <div className="container">
      <div className="float-right ">
        {pageContext.resolvedUrl?.includes("cases/") && <Products {...products} />}
      </div>
      
      <div className="prose prose-lg  py-12">
        <Markdown>{data.content}</Markdown>
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
