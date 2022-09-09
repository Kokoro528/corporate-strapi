import { fetchAPI, getCollectionList } from "utils/api"
import { parseCookies } from "utils/parse-cookies"
// import { getSession } from "next-auth/react"
import { unstable_getServerSession, getSession } from "next-auth"
import { options } from "./auth/[...nextauth]"
import { getStrapiURL, getMeiliURL } from "utils/api"
import { MeiliSearch } from "meilisearch"

export default async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  //

  //   const cookies = parseCookies(req)

  // const session = await  unstable_getServerSession(req, res, options)
  // Fetch the headless CMS to check if the provided `slug` exists
  // const pageData = await getCollectionList(req.query.slug[0], session)
  const search = req.query.defaultSearch

  // console.log("pluralNmae", pluralName)
  if (!search) return {}
  const client = new MeiliSearch({ host: getMeiliURL(``), apiKey: "masterKey" })
  // console.log(Object.assign({
  //   "Content-Type": "application/json"
  // },
  //   req.headers.authorization ? { "Authorization": req.headers.authorization } : {}
  // ), "sd")
  const indexesRes = await client.getIndexes({ limit: 10 })
  console.log("indexesRes", indexesRes)

  try {
    const collectionList = await fetch(endpoint, {
      method: "GET",
      // headers: req.headers,
      headers: Object.assign(
        {
          "Content-Type": "application/json",
        },
        req.headers.authorization
          ? { Authorization: req.headers.authorization }
          : {}
      ),
    })
    const resp = await collectionList.json()
    return res.status(collectionList.status).json(resp)
  } catch (err) {
    return res.status(500).json({ message: "Page didn't find" })
  }
}

// You can view Preview pages with URLs like this:
// http://localhost:3000/api/preview?secret=<preview-secret>&slug=<slug>
// where <preview-secret>
