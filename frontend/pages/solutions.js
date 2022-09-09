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
import useSWR, { useSWRConfig } from "swr"
import { useState, useEffect } from "react"
import List from "@/components/collations/collation-list"
import { useSession } from "next-auth/react"

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
  // const { data, error } = useSWR(`/api/collection`)
  // const [data, setData] = useState([])
  const { data: session } = useSession()
  const { data, error } = useSWR([
    "/api/collection" + router.asPath,
    // {
    //   headers: {
    //     "Authorization": "Bearer " + session?.accessToken,
    //     "Content-Type": "application/json"
    //   },

    //   // body: JSON.stringify({session})
    // }
  ])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetch("/api/collection" + router.asPath)
  //     const json = await res.json()
  //     if (json.data) {
  //       setData(json.data)
  //     }
  //           console.log("session", session)
  //   }
  //   fetchData()
  // }, [])
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
        <List
          data={data?.data?.filter((e) =>
            category ? e.attributes.category === category : true
          )}
          category={category}
          page={page}
          router={router}
        ></List>
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
  // Fetch pages. Include drafts if preview mode is on
  // const pageData = await getCaseData({
  //   category: query?.type,
  //   locale,
  //   preview,

  // })

  const PageData = await getPageData(
    {
      slug: "solutions",
      locale,
      preview,
    },
    session
  )

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
