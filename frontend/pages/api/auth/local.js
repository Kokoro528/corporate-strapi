import { getPageData, fetchAPI } from "utils/api"
import { parseCookies } from "utils/parse-cookies"

async function local(req, res) {
  console.log("req", req.headers, "body", req.body)
  const response = await fetchAPI(
    "/auth/local",
    {},
    { method: "POST", body: JSON.stringify(req.body) }
  )

  if (!response.ok) {
    console.error(response.statusText)
    console.log("res", response)
    throw new Error(`An error occured please try again`, response)
  }

  const data = await response.json()
  console.log("data", data)
  return data
}
export default local
