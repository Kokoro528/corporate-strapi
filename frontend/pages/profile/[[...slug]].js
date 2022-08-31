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
import { data } from "autoprefixer"

const register = async (values, failure, success) => {
  const endpoint = getStrapiURL(`/api/auth/local/register`)
  // if (values.firstname && values.lastname) {
  values.username = [values.firstname, values.lastname].join(" ")
  // }
  const signUpRes = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })

  if (!signUpRes.ok) {
    console.error(signUpRes)
  }
  const resp = await signUpRes.json()
  if (!signUpRes.ok) {
    if (resp.error.message) {
      // console.log(resp.error.message)
      failure(resp.error.message)
    }
  } else {
    success()
  }
}

const Me = ({ signup }) => {
  const router = useRouter()
  const { fetcher } = useSWRConfig()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [failureMsg, setFailureMsg] = useState("")
  const [signupFields, setSignUpFields] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  })
  const [succeeded, setSuccess] = useState(false)

  if (succeeded) {
    signIn(
      "credentials",
      Object.assign(signupFields, { identifier: signupFields.email })
    )
  }

  // const register = useCallback(() => {
  const { data, error, isValidating, mutate } = useSWR(
    ["/api/auth/me"],
    fetcher,
    {
      onSuccess: (data) => {
        router.push("/profile/me")
      },
      onError: () => {
        console.log("cokk")
        router.push("/profile/login")
      },
    }
  )
  // if (error) failure(error.message)
  // })

  return (
    <div className="container">
      <div className="block mx-auto my-10 p-6 rounded-lg shadow-lg bg-white max-w-md">
        <Formik
          initialValues={signupFields}
          // validationSchema={LeadSchema}
          validate={(values) => {
            let errors = {}
            // setLoading(true);
            if (!values.email) {
              errors.email = "Required"
            }
            if (!values.password) {
              errors.password = "Qing"
            }

            return errors
          }}
          onSubmit={async (values, { setFailureMsg }) => {
            setSignUpFields(values)
            setSubmitting(true)
            setLoading(true)

            // if (!values.username) {
            //   values.username = values.email
            // }
            // register(values, failure, success)
          }}
        >
          {({ errors, touched }) => (
            <>
              <div className="flex">{JSON.stringify(data)}</div>
              <h1 className="text-red-500 font-bold">
                这一页可否请致幻设计一下
              </h1>
            </>
          )}
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
      <Me signup={signup} />
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
