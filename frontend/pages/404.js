import CustomLink from "@/components/elements/link-with-icon"
import roundToNearestMinutes from "date-fns/roundToNearestMinutes"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  getPageData,
  fetchAPI,
  getGlobalData,
  getSingleDoc,
  getFormField,
} from "utils/api"

const Custom404 = ({
     i18nLocale: { data: buttons }
     }) => {
  const router = useRouter()
  return (
    <div className="h-screen w-screen bg-page-default">
      <div className="w-2/5 mx-auto bg-404" />

      <div className="flex">
        <Link className="">
          <a href="/">huiqu</a>
        </Link>
        {/* <button className="" onClick={() => router.back()}>
          {buttons.goBackHome}
        </button> */}
      </div>
    </div>
  )
}

// export async function getStaticProps(context) {
//   const { params, locale, locales, defaultLocale, preview = null } = context

//   const i18nLocale = await getFormField({ locale })
//   // const session = await unstable_getServerSession(context.req, context.res, options)
//   // Fetch pages. Include drafts if preview mode is on

//   // console.log(
//   //   "slug",
//   //   params.slug,
//   //   (!params.slug ? [""] : params.slug).join("/"),
//   //   pageData
//   // )

//   // if (pageData == null) {
//   //   // Giving the page no props will trigger a 404 page
//   //   return { props: {} }
//   // }

//   // // We have the required page data, pass it to the page component
//   const { localizations } = i18nLocale?.attributes

//   const pageContext = {
//     locale,
//     locales,
//     defaultLocale,
//     //   slug,
//     localizations,
//   }

//   //   const localizedPaths = getLocalizedPaths(pageContext)

//   return {
//     props: {
//       preview,
//       // sections: contentSections,
//       // metadata,
//       i18n: i18nLocale,
//       //   slug: slug,
//       pageContext: {
//         ...pageContext,
//         // localizedPaths,
//       },
//     },
//   }
// }

export default Custom404
