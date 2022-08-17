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
import { useSession } from "next-auth/react"
import fetcher from "utils/fetcher"
import useSWR, { SWRConfig } from "swr"
import { useState, useEffect } from "react"
import List from "@/components/collations/collation-list"

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
  sections,
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

  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/collection" + router.asPath)
  //     const json = await res.json()
  //     console.log("kok", router.asPath, json.data)
  //     if (json.data) {
  //       setData(json.data)
  //     }
  //   }
  //   fetchData()
  // }, [])

  // const { data: session } = useSession()
  // const { data, error } = useSWR(['/api/collection' + router.asPath,
  // {
  //   headers: {
  //     "Authorization": "Bearer " + session?.accessToken,
  //     "Content-Type": "application/json"
  //   },

  //   // body: JSON.stringify({session})
  // }
  // ])

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

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      {/* <Header title={title} ></Header> */}

      <FilterTabs
        enumColumn={""}
        menubar={global?.attributes?.navbar.links.find((e) =>
          e.url.includes(router.asPath.split("?")[0])
        )}
      >
        <Sections sections={sections} preview={preview} />
        <List category={category} page={page} router={router}></List>
      </FilterTabs>
    </Layout>
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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    options
  )
  // console.log("session brandy", session)
  // Fetch pages. Include drafts if preview mode is on
  // const pageData = await getCollectionLis({
  //   category: query?.type,
  //   locale,
  //   preview,

  // })

  const pageData = await getPageData(
    {
      slug: "products/Library",
      locale,
      preview,
    },
    session
  )

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData.attributes
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
      sections: contentSections,
      // data: pageData.data,
      page: pageData,
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
