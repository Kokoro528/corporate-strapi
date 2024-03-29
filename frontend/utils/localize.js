import { fetchAPI } from "./api"

export async function getLocalizedPage(targetLocale, pageContext) {
  const localization = pageContext.localizations.data.find(
    (localization) => localization.attributes.locale === targetLocale
  )
  const localePage = await fetchAPI(localization?`/pages/${localization.id}`:`/pages`)
  return localePage
}

export function localizePath(page) {
  const { locale, defaultLocale, slug } = page

  if (locale === defaultLocale) {
    // The default locale is not prefixed
    return `/${slug}`
  }

  console.log('cho',`/${locale}/${slug}`)
  // The slug should have a localePrefix
  // return `/${locale}/${slug}`
  // // 无论浏览器预设语言
  return `/${slug}`
}

export function getLocalizedPaths(page) {
  const paths = page.locales.map((locale) => {
    return {
      locale: locale,
      href: localizePath({ ...page, locale }),
    }
  })

  return paths
}
