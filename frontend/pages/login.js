import ErrorPage from "next/error"
import { getPageData, fetchAPI, getGlobalData, getSingleDoc } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import { useRouter } from "next/router"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import FilterTabs from "@/components/filter-tabs"

const SignUp = () => {
  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput123"
              aria-describedby="emailHelp123"
              placeholder="First name"
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput124"
              aria-describedby="emailHelp124"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput125"
            placeholder="Email address"
          />
        </div>
        <div className="form-group mb-6">
          <input
            type="password"
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput126"
            placeholder="Password"
          />
        </div>
        <div className="form-group form-check text-center mb-6">
          <input
            type="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
            id="exampleCheck25"
            checked
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="exampleCheck25"
          >
            Subscribe to our newsletter
          </label>
        </div>
        <button
          type="submit"
          className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        >
          Sign up
        </button>
      </form>
    </div>
  )
}

// export async function getStaticPaths(context) {
//     // Get all pages from Strapi
//     const pages = await context.locales.reduce(
//       async (currentPagesPromise, locale) => {
//         const currentPages = await currentPagesPromise
//         const localePages = await fetchAPI("/pages", {
//           locale,
//           fields: ["slug", "locale"],
//         })
//         return [...currentPages, ...localePages.data]
//       },
//       Promise.resolve([])
//     )

//     const paths = pages.map((page) => {
//       const { slug, locale } = page.attributes
//       // Decompose the slug that was saved in Strapi
//       const slugArray = !slug ? false : slug.split("/")

//       return {
//         params: { slug: slugArray },
//         // Specify the locale to render
//         locale,
//       }
//     })

//     return { paths, fallback: true }
//   }

//   export async function getStaticProps(context) {
//     const { params, locale, locales, defaultLocale, preview = null } = context

//     const globalLocale = await getGlobalData(locale)
//     // Fetch pages. Include drafts if preview mode is on
//     const pageData = await getPageData({
//       slug: (!params.slug ? [""] : params.slug).join("/"),
//       locale,
//       preview,
//     })
//     // const pageData = await getSingleDoc({
//     //   slug: (!params.slug ? [""] : params.slug).join("/"),
//     //   pluralName: "pages",
//     //   locale,
//     //   preview,
//     // }
//     // )
//     console.log(
//       "pageData",
//       "slug",
//       (!params.slug ? [""] : params.slug).join("/"),
//       pageData
//     )
//     if (pageData == null) {
//       // Giving the page no props will trigger a 404 page
//       return { props: {} }
//     }

//     // We have the required page data, pass it to the page component
//     const { contentSections, metadata, localizations, slug } = pageData.attributes

//     const pageContext = {
//       locale,
//       locales,
//       defaultLocale,
//       slug,
//       localizations,
//     }

//     const localizedPaths = getLocalizedPaths(pageContext)

//     return {
//       props: {
//         preview,
//         sections: contentSections,
//         metadata,
//         global: globalLocale,
//         slug: slug,
//         pageContext: {
//           ...pageContext,
//           localizedPaths,
//         },
//       },
//     }
//   }

export default SignUp
