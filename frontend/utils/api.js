import qs from "qs"

export function getStrapiURL(path) {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  console.log("queryString", queryString)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

/**
 *
 * @param {Object} options
 * @param {string} options.slug The page's slug
 * @param {string} options.locale The current locale specified in router.locale
 * @param {boolean} options.preview router isPreview value
 */
export async function getPageData({ slug, locale, preview }) {
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetPages(
          $slug: String!
          $publicationState: PublicationState!
          $locale: I18NLocaleCode!
        ) {        
          pages(
            filters: { slug: { eq: $slug } }
            publicationState: $publicationState
            locale: $locale
          ) {
            data {
              id
              attributes {
                locale
                localizations {
                  data {
                    id
                    attributes {
                      locale
                    }
                  }
                }
                slug
                cardImage{
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                contentSections {
                  __typename
                  ... on ComponentSectionsBottomActions {
                    id
                    title
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                  }
                  ... on ComponentSectionsHero {
                    id
                    buttons {
                      id
                      newTab
                      text
                      type
                      url
                    }
                    title
                    description
                    label
                    picture {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsFeatureColumnsGroup {
                    id
                    features {
                      id
                      description
                      icon {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsFeatureRowsGroup {
                    id
                    features {
                      id
                      description
                      link {
                        id
                        newTab
                        text
                        url
                      }
                      media {
                        ...FileParts
                      }
                      title
                    }
                  }
                  ... on ComponentSectionsTestimonialsGroup {
                    id
                    description
                    link {
                      id
                      newTab
                      text
                      url
                    }
                    logos {
                      id
                      title
                      logo {
                        ...FileParts
                      }
                    }
                    testimonials {
                      id
                      logo {
                        ...FileParts
                      }
                      picture {
                        ...FileParts
                      }
                      text
                      authorName
                      authorTitle
                      link
                    }
                    title
                  }
                  ... on ComponentSectionsLargeVideo {
                    id
                    description
                    title
                    poster {
                      ...FileParts
                    }
                    video {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsRichText {
                    id
                    content
                  }
                  ... on ComponentSectionsPricing {
                    id
                    title
                    plans {
                      description
                      features {
                        id
                        name
                      }
                      id
                      isRecommended
                      name
                      price
                      pricePeriod
                    }
                  }
                  ... on ComponentSectionsLeadForm {
                    id
                    emailPlaceholder
                    location
                    submitButton {
                      id
                      text
                      type
                    }
                    title
                  }
                  ... on ComponentSectionsSolutionList {
                    id
                    # title
                    solutions {
                      data {
                        id
                        
                      }
                    }
                  }

                  
                }
              }
            }
          }
        }
      `,
      variables: {
        slug,
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
      },
    }),
  })

  const pagesData = await pagesRes.json()
  // Make sure we found something, otherwise return null
  if (pagesData.data?.pages == null || pagesData.data.pages.length === 0) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0]
}

export async function getCollectionList(pluralName) {
  if (!pluralName) return {};
  const endpoint = getStrapiURL(`/api/${pluralName}?populate=*`)
  const caseList = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }

  })
  const casesData = await caseList.json()
  return casesData
}

export async function getSingleDoc({pluralName, title}) {
  if (!pluralName) return {};
  const url = `/api/${pluralName}?populate=deep${title?`&filters[title][$eq]=${title}`:''}`
  const endpoint = getStrapiURL(url)
  const caseList = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }

  })

  const casesData = await caseList.json()
  
  return casesData.data
}
export async function getCaseData({locale, preview, category, title}) {
  const gqlEndpoint = getStrapiURL("/graphql")
  
  const param =  `${(!!category || !!title) ? (`filters: { ${(!!category?`category: { eq: $category }`: ``)}
  ${(!!title?  `title: {eq: $title}`: ``)}}`): ''}`
  

  const vars = `${!!category ? '$category: String': ''} \n ${!!title ? '$title: String': ''}`
  console.log('ap',param, vars)
  const caseRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      query GetCases(
        $publicationState: PublicationState!
        $locale: I18NLocaleCode!
        ${vars}
      ) {        
        cases(
          publicationState: $publicationState
          locale: $locale
          ${param}
        ) {
          data {
            id
            attributes {
              locale
              localizations {
                data {
                  id
                  attributes {
                    locale
                  }
                }
              }
              title
              category
              contentSections {
                __typename
                ... on ComponentSectionsRichText {
                  id
                  content
                }
                ... on ComponentSectionsTopHeading {
                  id
                  title
                  backgroundImage {
                    ...FileParts
                  }
                  abstract
                  buttons {
                    id
                    newTab
                    text
                    type
                    url
                  }
                }
                ... on ComponentSectionsHero {
                  id
                  buttons {
                    id
                    newTab
                    text
                    type
                    url
                  }
                  title
                  description
                  label
                  smallTextWithLink
                  picture {
                    ...FileParts
                  }
                }
                
              }
            
              
            }
          }
        }
      }      
      `,
      variables: {
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
        category,
        title
      },
    })
  })

  
  

  const casesData = await caseRes.json()
  // Make sure we found something, otherwise return null
  if (casesData.data?.cases == null ) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return casesData.data.cases.data
}

export async function getSolutionData({locale, preview}) {
  const gqlEndpoint = getStrapiURL("/graphql")
  const solutionRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      fragment FileParts on UploadFileEntityResponse {
        data {
          id
          attributes {
            alternativeText
            width
            height
            mime
            url
            formats
          }
        }
      }
      query GetSolutions(
        $publicationState: PublicationState!
        $locale: I18NLocaleCode!
      ) {        
        solutions(
          publicationState: $publicationState
          locale: $locale
        ) {
          data {
            id
            attributes {
              locale
              localizations {
                data {
                  id
                  attributes {
                    locale
                  }
                }
              }
              title
              contentSections {
                __typename
                ... on ComponentSectionsRichText {
                  id
                  content
                }
                ... on ComponentSectionsHero {
                  id
                  buttons {
                    id
                    newTab
                    text
                    type
                    url
                  }
                  title
                  description
                  label
                  smallTextWithLink
                  picture {
                    ...FileParts
                  }
                }
                ... on ComponentSectionsSolutionFeature {
                  id
                  title
                  # media {
                  #   FileParts
                  # }
                  bulletPoints {
                    title
                    icon {
                      ...FileParts
                    }
                    description
                  }
                }
                ... on ComponentSectionsMediaFeatures {
                  id
                  title
                  subtitle
                  features {
                    media{
                      ...FileParts
                    }
                    description
                  }
                }
              }
            
              
            }
          }
        }
      }      
      `,
      variables: {
        publicationState: preview ? "PREVIEW" : "LIVE",
        locale,
      },
    })
  })

  const solutionsData = await solutionRes.json()
  // Make sure we found something, otherwise return null
  if (solutionsData.data?.solutions == null ) {
    return null
  }

  // Return the first item since there should only be one result per slug
  return solutionsData.data.solutions.data
  
  

}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale) {
  const gqlEndpoint = getStrapiURL("/graphql")
  const globalRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        fragment FileParts on UploadFileEntityResponse {
          data {
            id
            attributes {
              alternativeText
              width
              height
              mime
              url
              formats
            }
          }
        }
        query GetGlobal($locale: I18NLocaleCode!) {
          global(locale: $locale) {
            data {
              id
              attributes {
                favicon {
                  ...FileParts
                }
                metadata {
                  metaTitle
                  metaDescription
                  shareImage {
                    ...FileParts
                  }
                  twitterCardType
                  twitterUsername
                }
                metaTitleSuffix
                notificationBanner {
                  type
                  text
                }
                navbar {
                  logo {
                    ...FileParts
                  }
                  links {
                    id
                    text
                    url
                    nestedLinks {
                      text
                      url
                      newTab
                    }
                  }
                  button {
                    id
                    url
                    newTab
                    text
                    type
                  }
                }
                footer {
                  logo {
                    ...FileParts
                  }
                  smallText
                  columns {
                    id
                    title
                    links {
                      id
                      url
                      newTab
                      text
                    }
                  }
                }
                products{
                  products{
                    url
                    title
                    newTab
                    icon {
                      ...FileParts
                    }
                  }
                  moreInfo {
                    text
                    url
                    newTab
                  }
                }
                enums
              }
            }
          }
        }      
      `,
      variables: {
        locale,
      },
    }),
  })

  const global = await globalRes.json()
  return global?.data?.global?.data
}


