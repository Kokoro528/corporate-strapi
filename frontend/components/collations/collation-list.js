import PropTypes from "prop-types"
import NextImage from "../elements/image"
import Link from "next/link"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import { useSWRConfig } from "swr"
const List = ({ router }) => {
  // console.log(data)

  // console.log(solutions)
  // const {solutions}= data;
  // return null;

  const { data: session } = useSession()
  const { cache, fetcher, ...restConfig } = useSWRConfig()

  let plural = router.pathname
  let { category } = router.query
  if (router.asPath.toLowerCase().includes("library")) {
    plural = "/libraries"
    // category = global.enums.libraries.
  }

  const isExisted = () => cache.get("/api/collection" + plural)
  const { data, error } = useSWR(
    !isExisted() ? "/api/collection" + plural : null,
    fetcher
  )
  // console.log("router", router)
  // console.log("cache", cache)
  // console.log("data", data, error)
  // mutate(data?.data)

  // if (!data || data.data === null) {
  //   data = cache.get(router.pathname)
  // }

  const getPictureSrc = (attr) => {
    let res = {}
    // attr.contentSections.forEach((element) => {
    //   if (!!element.picture) {
    //     const attributes = element.picture.data.attributes.formats.small

    //     res = { data: { attributes } }
    //   }
    // })
    if (!!attr.articlePicture) {
      return attr.articlePicture
    }
    return res
  }

  return (
    <div className="container grid grid-cols-1 gap-4 mt-12 mb-10 p-4 mx-auto  md:grid-cols-3 lg:grid-cols-4 ">
      {isExisted()
        ?.data?.filter((e) =>
          category ? e.attributes.category === category : true
        )
        .map(({ id, attributes }) => (
          <Link
            href={`${router.pathname}/${attributes.title}`}
            key={"card-" + id}
            passHref
          >
            <div className="flex text-lg relative" key={id}>
              <div className=" w-68 h-52 bg-indigo-100 rounded">
                {
                  <NextImage
                    media={getPictureSrc(attributes)}
                    width="1"
                    height="1"
                    layout="fill"
                  />
                }
              </div>
              <h3
                className="font-bold py-2 bottom-0 bg-zinc-100 text-center
               text-neutral-700 leading-8 rounded-bottom absolute min-h-min w-full h-20"
              >
                {attributes.title}
              </h3>
              {/* <p>{attributes.title}</p> */}
            </div>
          </Link>
        ))}
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

export default List
