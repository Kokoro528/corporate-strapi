import qs from "qs"

export function getStrapiURL(path) {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`
}

export function getMeiliURL(path) {
  return `${process.env.NEXT_MEILISEARCH_API_URL || "http://localhost:7700"}${path}` 
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
  // const session = await getSession();
  // const session = {}
  // Find the pages that match this slug
  const gqlEndpoint = getStrapiURL("/graphql")
  const pagesRes = await fetch(gqlEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
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
                  ... on ComponentSectionsCards {
                    id
                    cards {
                      picture {
                        ...FileParts
                      }
                      buttons {
                        url
                        text 
                        type
                        newTab
                      }
                      description
                    }
                    richtext  
                  }
                  ... on ComponentInstanceLibraryList {
                    id
                    backgroundImage{
                      ...FileParts
                    }
                    title
                    libraries {
                      data {
                        id
                        attributes {
                          
                          title
                          formalName
                          slug
                          snippet
                          icon {
                            ...FileParts
                          }
                          downloads {
                            id
                            newTab
                            url
                            text
                            type
                          }
                        }
                      }
                    }
                    
                    
                    
                  }
                  ... on ComponentInstanceSoftwareList {
                    id 
                    software {
                      data{
                        attributes {
                        productId
                          icon {
                            ...FileParts
                          }
                          intro {
                            __typename
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
                              style
                            }
                            ... on ComponentSectionsRichTextGroup {
                              id
                              title 
                              contentList {
                                content
                              }
                              background {
                                ...FileParts
                              }
                            }
                            
                            ... on ComponentSectionsRichContentSection {
                              id
                              content
                              subtitle
                              title
                              narrow
                              typeRCS: type
                              theme
                              media {
                                data {
                                  id
                                  attributes {
                                    name
                                    alternativeText
                                    width
                                    height
                                    mime
                                    url
                                    formats
                                  }
                                }
                              }
                              background {
                                ...FileParts
                              }
                            }
                            
                          }
                        }
                      }
                      
                    }
                  }
                  ... on ComponentSectionsMediaFeatures {
                    id
                    title
                    subtitle
                    features {
                      media {
                        ...FileParts
                      }
                      description    
                    }
                  }
                  ... on ComponentInstanceCulture {
                    title
                    background {
                      ...FileParts
                    }
                    coreValues {
                      title
                      icon {
                        ...FileParts
                      }
                      description
                      span
                      spanstart
                      selfAlign
                    }
                    cultureEpitome {
                      title
                      icon {
                        ...FileParts
                      }
                      description
                      span
                      spanstart
                      selfAlign
                    }
                  }
                  ... on ComponentSectionsCarousel {
                    cards {
                      title
                      picture {
                        ... FileParts
                      }
                      description
                      link {
                        newTab
                        text
                        url
                      } 
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
                    background {
                      ...FileParts
                    }
                    picture {
                      ...FileParts
                    }
                    type
                  }
                  ... on ComponentSectionsFeatureColumnsGroup {
                    id
                    isFlex
                    showUrlLink
                    align
                    features {
                      id
                      description
                      icon {
                        ...FileParts
                      }
                      url
                      span
                      spanstart
                      selfAlign
                      titleFCG: title
                    }
                    backgroundImage{
                      ...FileParts
                    }
                    brief
                    zigzag
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
                  ... on ComponentInstanceLargeSearchBar {
                    defaultSearchText
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
                  ... on ComponentSectionsRichTextGroup {
                    id
                    title 
                    contentList {
                      content
                    }
                    background {
                      ...FileParts
                    }
                  }
                  ... on ComponentSectionsRichContentSection {
                    id
                    content
                    subtitle
                    title
                    narrow
                    typeRCS: type
                    theme
                    media {
                      data {
                        id
                        attributes {
                          name
                          alternativeText
                          width
                          height
                          mime
                          url
                          formats
                        }
                      }
                    }
                    background {
                      ...FileParts
                    }
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
                  style
                }
                ... on ComponentInstanceMworksIntros {
                  richtext
                  learnings {
                    url
                    title
                    newTab
                    icon {
                      ...FileParts
                    }
                  }
                  links {
                    id
                    url
                    newTab
                    text
                    type
                  }
                  isDark
                  backgroundImage {
                    ...FileParts
                  }
                }
                ... on ComponentSectionsCarouselSection {
                  background {
                    ...FileParts
                  }
                  title
                  contentCards {
                    title
                    subtitle
                    content
                    background {
                      ...FileParts
                    }
                    type
                    narrow
                    media {
                      data {
                        id
                        attributes {
                          name
                          alternativeText
                          width
                          height
                          mime
                          url
                          formats
                        }
                      }
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
  // console.log("pagesData", pagesData.data)
  // Return the first item since there should only be one result per slug
  return pagesData.data.pages.data[0]
}

export async function getCollectionList(pluralName, session) {
  if (!pluralName) return {};
  const endpoint = getStrapiURL(`/api/${pluralName}?populate=*`)
  const collectionList = await fetch(endpoint, {
    method: "GET",
    headers: Object.assign({
      "Content-Type": "application/json"
    }, session.accessToken ? { "Authorization": "Bearer " + session?.accessToken } : {}
    )


  })
  const collections = await collectionList.json()
  // console.log("caseda", collections)
  return collections
}

export async function getSingleDoc({ pluralName, title, slug }) {
  if (!pluralName) return {};
  const url = `/api/${pluralName}?populate=deep${slug ? `&filters[slug][$eq]=${slug}` : ''}${title ? `&filters[title][$eq]=${title}` : ''}`
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

export async function getFormField({ locale }) {

  const url = `/api/form-field?populate=deep&locale=${locale}`
  const endpoint = getStrapiURL(url)
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }

  })

  const res = await response.json()

  return res.data

}

export async function getSingleType({ singularName }) {
  if (!singularName) return {};
  const url = `/api/${singularName}?populate=deep`
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




export async function getSolutionData({ locale, preview }) {
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
                  type
                }
                ... on ComponentSectionsSolutionFeature {
                  id
                  title
                  bulletPoints {
                    title
                    icon {
                      ...FileParts
                    }
                    description
                  }
                }
                ... on ComponentSectionsRichContentSection {
                  id
                  content
                  subtitle
                  title
                  theme
                  typeRCS: type
                  media {
                    data {
                      id
                      attributes {
                        name
                        alternativeText
                        width
                        height
                        mime
                        url
                        formats
                      }
                    }
                  }
                  background {
                    ...FileParts
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
  if (solutionsData.data?.solutions == null) {
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
                      id
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
                sns {
                  platforms{
                    id
                    url
                    newTab
                    title
                    icon {
                      ...FileParts
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


