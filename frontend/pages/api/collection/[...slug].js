import { getCollectionList} from "utils/api"
import { parseCookies } from "utils/parse-cookies"

export default async (req, res) => {
    console.log("inside")
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
//   if (req.query.secret !== (process.env.PREVIEW_SECRET || "secret-token")) {
//     return res.status(401).json({ message: "Invalid token" })
//   }

//   const cookies = parseCookies(req)
  
  // Fetch the headless CMS to check if the provided `slug` exists
  const pageData = await getCollectionList(req.query.slug[0]);
  console.log("joj",pageData)
  // If the slug doesn't exist prevent preview mode from being enabled
  if (!pageData) {
    return res.status(401).json({ message: "Invalid slug" })
  }

  return res.status(200).json(pageData)
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


