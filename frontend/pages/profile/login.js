import ErrorPage from "next/error"
import { fetchAPI, getGlobalData, getSingleDoc, getFormField } from "utils/api"
import Sections from "@/components/sections"
import Seo from "@/components/elements/seo"
import Header from "@/components/elements/header"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import Layout from "@/components/layout"
import { getLocalizedPaths } from "utils/localize"
import Products from "@/components/global/products"
import LeadForm from "@/components/sections/lead-form"
import { Formik, Form, Field, ErrorMessage, useField } from "formik"
import { signIn } from "next-auth/react"
import useSWR, { useSWRConfig } from "swr"
import { redirect } from "next/dist/server/api-utils"
import { getStrapiURL } from "utils/api"
import Input from "@/components/forms/input"

const Login = ({ signup }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  // const [formFields, setFormFields] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  // })
  const formFields = { identifier: "", password: "" }

  // const handleSubmit = useCallback((e) => {
  //   e.preventDefault()

  //   fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       /* Form data */
  //       ...value,
  //     }),
  //   }).then((res) => {
  //     // Do a fast client-side transition to the already prefetched dashboard page
  //     if (res.ok) router.push("/products")
  //   })
  // }, [])
  return (
    <div className="container">
      <div className="block mx-auto my-10 p-6 rounded-lg shadow-lg bg-white max-w-md">
        <Formik
          initialValues={formFields}
          // validationSchema={LeadSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            signIn("credentials", values)
          }}
        >
          <Form>
            <Input name="identifier" label={signup.email} type="email" />
            <Input name="password" label={signup.password} type="password" />

            <div className="flex justify-between items-center mb-6">
              {/* <div className="form-group form-check">
                <input
                  type="checkbox"
                  // onChange={(e) => {
                  //   console.log("asjdalskd")
                  //   setFormFields(
                  //     Object.assign({}, formFields, { rememberMe: true })
                  //   )
                  // }}
                  className="form-check-input  h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  id="remember"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="remember"
                >

                  {signup.rememberMe}
                </label>
              </div> */}

              <a
                href="#!"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
              >
                {signup.forgotPassword}
              </a>
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
              {signup.signin}
            </button>
            <p className="text-gray-800 mt-6 text-center">
              {signup.notAMember}{" "}
              <a
                href="/profile/signup"
                className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
              >
                {signup.register}
              </a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

const DynamicPage = ({
  signup,
  metadata,
  preview,
  global,
  pageContext,
  title,
}) => {
  const router = useRouter()

  // Check if the required data was provided
  if (!router.isFallback && !signup) {
    return <ErrorPage statusCode={404} />
  }

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

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadataWithDefaults} />
      {/* Display content sections */}
      {router.asPath.includes("login") && <Login signup={signup} />}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {
    params,
    locale,
    locales,
    defaultLocale,
    preview = null,
    resolvedUrl,
  } = context
  // console.log("jj", context.resolvedUrl)

  const globalLocale = await getGlobalData(locale)
  // Fetch pages. Include drafts ifgetCase preview mode is on
  const pageData = await getFormField({ locale })
  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { signup, localizations } = pageData?.attributes

  const pageContext = {
    locale,
    locales,
    defaultLocale,
    // slug,
    localizations,
  }

  const localizedPaths = getLocalizedPaths(pageContext)

  return {
    props: {
      preview,
      signup,
      // metadata,
      global: globalLocale,
      pageContext: {
        ...pageContext,
        localizedPaths,
        resolvedUrl,
      },
    },
  }
}

export default DynamicPage
