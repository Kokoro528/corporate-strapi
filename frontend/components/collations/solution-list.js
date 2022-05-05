import PropTypes from "prop-types"
import NextImage from "../elements/image"
import Link from "next/link"

const SolutionList = ({ data }) => {
  // console.log(data)
  const solutions = data
  // console.log(solutions)
  // const {solutions}= data;
  // return null;

  const getPictureSrc = (attr) => {
    let res = {}
    attr.contentSections.forEach((element) => {
      if (!!element.picture) {
        const attributes = element.picture.data.attributes.formats.small

        res = { data: { attributes } }
      }
    })
    return res
  }

  return (
    <div className="container grid grid-cols-1 gap-4  sm: grid-cols-3 md:grid-cols-4">
      {
        Array.isArray(solutions) &&
          solutions.map(({ id, attributes }) => (
            <Link href={`/solutions/${id}`} key={"solution-" + id} passHref>
              <div className="flex-1 text-lg" key={id}>
                <div className="">
                  <NextImage media={getPictureSrc(attributes)} />
                </div>
                <h3 className="font-bold mt-4 mb-4">{attributes.title}</h3>
                {/* <p>{attributes.title}</p> */}
              </div>
            </Link>
          ))
      }
    </div>
  )
}

// SolutionList.PropTypes = {
//   solutions: PropTypes.arrayOf(
//     PropTypes.shape({
//       data: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         attributes: PropTypes.shape({
//           title: PropTypes.string,
//           // caseBackground:
//         }),
//       }),
//     })
//   ),
//   title: PropTypes.string,
// }

export default SolutionList
