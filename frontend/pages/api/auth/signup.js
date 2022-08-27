import { getCollectionList } from "utils/api"
import { parseCookies } from "utils/parse-cookies"
// import { getSession } from "next-auth/react"
import { unstable_getServerSession, getSession } from "next-auth"
import { options } from "../auth/[...nextauth]"
import { getStrapiURL } from "utils/api"
export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  //

  //   const cookies = parseCookies(req)

  // const session = await  unstable_getServerSession(req, res, options)
  // Fetch the headless CMS to check if the provided `slug` exists
  // const pageData = await getCollectionList(req.query.slug[0], session)
 

  const endpoint = getStrapiURL(`/auth/local/register`)

  try {
    const signUpRes = await fetch(endpoint, {
      method: "POST",
      headers: req.headers,
      // headers: {
      //   "Content-Type": "application/json",
      //   "Authorization": req.headers.authorization
      // }
      body: req.body
      
    })
    const resp = await signUpRes.json()

    return res.status(signUpRes.status).json(resp)
  } catch (err) {
    return res.status(500).json({ message: signUpRes.body() })
  }

  // Enable Preview Mode by setting the cookies
  //   res.setPreviewData({})

  //   // Redirect to the path from the fetched post
  //   // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  //   // Prefix with locale so previews are available in all languages
  //   res.writeHead(307, {
  //     Location: `/${pageData.locale}/${pageData.slug}`,
  //   })
  //   res.end()
}

// You can view Preview pages with URLs like this:
// http://localhost:3000/api/preview?secret=<preview-secret>&slug=<slug>
// where <preview-secret>
