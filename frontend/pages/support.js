import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData, getSingleDoc } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import FilterTabs from "@/components/filter-tabs"
import Context from "@/components/context"
import { formikConf } from "@/components/forms/search-bar"
import { useFormik } from "formik"
// import { options } from "./api/auth/[...nextauth]"
// import { unstable_getServerSession } from "next-auth"

// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({
  sections,
  metadata,
  preview,
  global,
  pageContext,
  slug,
  session,
}) => {
  const router = useRouter()
  const formik = useFormik(
    Object.assign(
      {
        initialValues: {
          supportSearch: "",
        },
      },
      formikConf
    )
  )

  // Check if the required data was provided
  if (!router.isFallback && !sections?.length) {
    return <ErrorPage statusCode={404} />
  }

  // Loading screen (only possible in preview mode)
  if (router.isFallback) {
    return <div className="container">Loading...</div>
  }

  // Merge default site SEO settings with page specific SEO settings
  // if (metadata.shareImage?.data == null) {
  //   delete metadata.shareImage
  // }
  const metadataWithDefaults = {
    ...global.attributes.metadata,
    ...(metadata || {}),
  }

  return (
    // {/* Add meta tags for SEO*/}
    <>
      {/* <Seo metadata={metadataWithDefaults} /> */}
      {/* Display content sections */}

      <FilterTabs
        menubar={global?.attributes?.navbar.links.find((e) =>
          slug ? e.url.includes(slug.substring(1).split("/")[0]) : null
        )}
      >
        <section className="text-center px-12">
          <formik onSubmit={formik.onSubmit}>
            <div className="flex ">
              <label
                htmlFor="supportSearch"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
              ></label>
              <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="supportSearch"
                  onKeyDown={formik.handleSubmit}
                  onChange={formik.handleChange}
                  value={formik.values.defaultSearch}
                  className="block py-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
                {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
              </div>
            </div>
          </formik>
        </section>

        <Sections sections={sections} preview={preview} />
      </FilterTabs>
    </>
  )
}

DynamicPage.getLayout = function getLayout(page) {
  return (
    <Context.Consumer>
      {({ global }) => <Layout global={global}>{page}</Layout>}
    </Context.Consumer>
  )
}

// export async function getStaticPaths(context) {
//   // Get all pages from Strapi
//   const pages = await context.locales.reduce(
//     async (currentPagesPromise, locale) => {
//       const currentPages = await currentPagesPromise
//       const localePages = await fetchAPI("/pages", {
//         locale,
//         fields: ["slug", "locale"],
//       })
//       return [...currentPages, ...localePages.data]
//     },
//     Promise.resolve([])
//   )

//   const paths = pages.map((page) => {
//     const { slug, locale } = page.attributes
//     // Decompose the slug that was saved in Strapi
//     const slugArray = !slug ? false : slug.split("/")

//     return {
//       params: { slug: slugArray },
//       // Specify the locale to render
//       locale,
//     }
//   })

//   return { paths, fallback: true }
// }

export async function getStaticProps(context) {
  const { params, locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)
  // const session = await unstable_getServerSession(context.req, context.res, options)
  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getPageData({
    slug: "support",
    locale,
    preview,
  })
  // console.log(
  //   "slug",
  //   params.slug,
  //   (!params.slug ? [""] : params.slug).join("/"),
  //   pageData
  // )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { contentSections, metadata, localizations, slug } = pageData.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      sections: contentSections,
      metadata,
      global: globalLocale,
      slug: slug,
      pageContext: {
        ...pageContext,
        localizedPaths,
      },
    },
  }
}

export default DynamicPage
