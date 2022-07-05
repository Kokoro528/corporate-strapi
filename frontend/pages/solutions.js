import ErrorPage from "next/error"
import {
  getCaseData,
  getCollectionList,
  fetchAPI,
  getGlobalData,
  getPageData,
} from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import Header from "@/components/elements/header"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import Link from "next/link"
import NextImage from "@/components/elements/image"
import FilterTabs from "@/components/filter-tabs"
import { unstable_getServerSession } from "next-auth"
import { options } from "pages/api/auth/[...nextauth]"
import fetcher from "utils/fetcher"
import useSWR,{ SWRConfig } from "swr"
import { useState, useEffect } from "react"

const CaseList = ({ data, page, router}) => {
  // console.log(data)
  const cases = data

  const getPictureSrc = (attr) => {
    let res = null
    attr.contentSections.forEach((element) => {
      if (!!element.backgroundImage) {
        const attributes = element.backgroundImage.data.attributes.formats.small

        res = { data: { attributes } }
      }
    })
    if (!res) {
      res = attr.articlePicture
    }
    return res
  }

  // const getDefaultSrc = (attr) => {
  //   let res = {}
  //   attr.
  // }

  return (
    <div className="container grid grid-cols-1 gap-4  sm: grid-cols-3 md:grid-cols-3">
      {cases?.map(({ id, attributes }) => (
        <Link href={`${router.pathname}/${attributes.title}`} key={"case-" + id} passHref>
          <div className="flex-1 text-lg" key={id}>
            <div>
              <NextImage
                media={getPictureSrc(attributes)}
                className="hover:opacity-40"
              />
            </div>
            <h3 className="font-bold mt-4 mb-4">{attributes.title}</h3>
            {/* <p>{attributes.title}</p> */}
          </div>
        </Link>
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

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  // data,
  page,
  metadata,
  preview,
  global,
  pageContext,
  title,
}) => {
  const router = useRouter()
//   if (!router.asPath.includes("cases") && !router.asPath.includes("libraries") && !router.asPath.includes("solutions"))
//   return null

  // Check if the required data was provided
      // if ( !data || !data.length) {
      //   return <ErrorPage statusCode={404} />
      // }
  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  //   if (metadata.shareImage?.data == null) {
  //     delete metadata.shareImage
  //   }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...metadata,
  }

  const category = router.query.category

  // const { data, error } = useSWR(`/api/collection`)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/collection" + router.asPath)
      const json = await res.json()
      if (json.data) {
        
        setData(json.data)
      }
    }
    fetchData()
  }, [])
 
  

  // useEffect(() => {
  //   // setLoading(true)
  //   console.log("lllt")
  //   fetch(`/api/collection${router.asPath}`)
  // // .then((res) => res.json())
  //     .then((data) => {
  //       console.log("slk", data)
  //       setData(data)
  //     }).catch(e => {
  //       console.error(e)
  //     })
  // }, [])
  // console.log("nnn", data, router.asPath)

  return (
    // <SWRConfig value= {{}}>
      <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      {/* <Seo metadata={metadataWithDefaults} /> */}
      {/* Display content sections */}
      {/* <Header title={title} ></Header> */}
      {/* <Sections sections={sections} preview={preview} /> */}

      <FilterTabs
        // enumColumn={"cases"}
        menubar={global?.attributes?.navbar.links.find((e) =>
          e.url.includes(router.asPath.split("?")[0])
        )}
      >
        <CaseList
          data={data?.filter((e) =>
            category ? e.attributes.category === category : true
          )}
          page={page}
          router={router}
        ></CaseList>
      </FilterTabs>
    </Layout>
    // </SWRConfig>
    
  )
}

export async function getServerSideProps(context) {
  const {
    params,
    query,
    locale,
    locales,
    defaultLocale,
    preview = null,
  } = context
  const globalLocale = await getGlobalData(locale)
  const session = await unstable_getServerSession(context.req, context.res, options) 
  console.log("session brandy", session)
  // Fetch pages. Include drafts if preview mode is on
  // const pageData = await getCaseData({
  //   category: query?.type,
  //   locale,
  //   preview,

  // })


  
  const PageData = await getPageData({
    slug: "solutions",
    locale,
    preview,
  }, session)


  // const pageData = await getCollectionList("cases", session)
  // console.log('pageDAta', pageData)

  // if (pageData == null) {
  //   // Giving the page no props will trigger a 404 page
  //   return { props: {} }
  // }

  // We have the required page data, pass it to the page component


  const pageContext = {
    locale,
    locales,
    defaultLocale,

    // localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      //   sections: contentSections,
      // data: pageData.data,
      page: PageData,
      //   title,
      //   metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
