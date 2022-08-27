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
import { set } from "date-fns"

const Input = ({ name, label, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold" for={field.name}>
        {label}
      </label>
      <input
        className={`${
          meta.error && meta.touched ? "border-red-500" : ""
        } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        {...field}
        {...props}
      />
      <ErrorMessage
        name={field.name}
        component="span"
        className="text-red-500 text-xs"
      />
    </div>
  );
};

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
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputEmail2"
                className="form-label inline-block mb-2 text-gray-700"
              >
                {signup.email}
              </label>
              <Field
                type="email"
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
                id="exampleInputEmail2"
                name="identifier"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="form-group mb-6">
              <label
                htmlFor="exampleInputPassword2"
                className="form-label inline-block mb-2 text-gray-700"
              >
                {signup.password}
              </label>
              <Field
                type="password"
                // onChange={(e) => {
                //   setFormFields(
                //     Object.assign({}, formFields, { password: e.target.value })
                //   )
                // }}
                name="password"
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
                id="exampleInputPassword2"
              />
            </div>
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

const register = async(values, failure, success) => {
  const endpoint = getStrapiURL(`/api/auth/local/register`)
    const signUpRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
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
      
    }
    else {
      success()
    }
}

const SignUp = ({ signup }) => {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [failureMsg, setFailureMsg] = useState("")
  const [signupFields, setSignUpFields] = useState({ email: "", username: "", password: "" })
  const [succeeded, setSuccess] = useState(false)
  const failure  = useCallback((msg) => {
    setFailureMsg(msg)
  }, [failureMsg])
  const success = useCallback(() => {
    setSuccess(true)
  }, [succeeded])

  if (succeeded) {
    signIn("credentials", Object.assign(signupFields, {identifier: signupFields.email}))
  }
  
  return (
    <div className="container">
      
      <div className="block mx-auto my-10 p-6 rounded-lg shadow-lg bg-white max-w-md">
        <Formik
          initialValues={signupFields}
          // validationSchema={LeadSchema}
          validate={(values) => {
            let errors = {};
            // setLoading(true);
            if (!values.email) {
              errors.email = "Required";
            }
            if (!values.password) {
              errors.password = "Qing"
            }
            

            return errors;
          }}
          onSubmit={async (values, {setFailureMsg }) => {
            setSignUpFields(values)
            setLoading(true)
            if (!values.username) {
              values.username = values.email
            }
            register(values, failure, success)


          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Input name="username" label={signup.username} />
              <Input name="email" label={signup.email} type="email" />
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

                {/* <a
              href="#!"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
            >
              {signup.forgotPassword}
            </a> */}
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
                {signup.signup}
              </button>
              <p className="text-gray-800 mt-6 text-center">
                {signup.alreadyAMember}{" "}
                <a
                  href="/profile/login"
                  className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                >
                  {signup.signin}
                </a>
              </p>
              {failureMsg && <p className="text-red-700">{failureMsg}</p>}
            </Form>)}
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
      {router.asPath.includes("signup") && <SignUp signup={signup} />}
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
