import PropTypes from "prop-types"

const SolutionList = ({ data }) => {
  console.log(data)
  const solutions = data.solutions.data
  console.log(solutions)
  // const {solutions}= data;
  // return null;

  return (
    <div className="container grid grid-cols-1 gap-4  sm: grid-cols-3 md:grid-cols-4">
      {solutions.map(({ id, attributes }) => (
        <div className="flex-1 text-lg" key={id}>
          {/* <div className="w-10 h-10">
            <NextImage   media={feature.icon} />
          </div> */}
          <h3 className="font-bold mt-4 mb-4">{id}</h3>
          <p>{attributes.caseBackground[0].content}</p>
        </div>
      ))}
    </div>
  )
}

// SolutionList.PropTypes = {
//   solutions: PropTypes.arrayOf(PropTypes.shape({
//     data: PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//     attributes: PropTypes.shape({
//       title: PropTypes.string,
//       caseBackground: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//         content: PropTypes.string,
//       })
//     }),
//     })
//   })),
//   title: PropTypes.string
// }

export default SolutionList
