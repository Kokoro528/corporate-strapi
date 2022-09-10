import { useRouter } from "next/router"
import Hero from "@/components/sections/hero"
import LargeVideo from "@/components/sections/large-video"
import FeatureColumnsGroup from "@/components/sections/feature-columns-group"
import FeatureRowsGroup from "@/components/sections/feature-rows-group"
import BottomActions from "@/components/sections/bottom-actions"
import TestimonialsGroup from "@/components/sections/testimonials-group"
import RichText from "./sections/rich-text"
import Pricing from "./sections/pricing"
import LeadForm from "./sections/lead-form"
import SolutionFeature from "./sections/solution-feature"
import TopHeading from "./sections/top-heading"
import Context from "./context"
import FeatureGroup from "./sections/feature-group"
// import SolutionList from "./collations/collation-list"
import ModelStructure from "./sections/model-structure"
import SimpleFeatures from "./sections/simple-features"
import RichContent from "./sections/rich-content-section"
import InfoCards from "./sections/info-cards"
import Carousel from "./sections/carousel"
import Features from "./sections/features"
import dynamic from "next/dynamic"
import CarouselSection from "./sections/carousel-sections"
import Culture from "./sections/culture"
import MworksIntros from "./instance/mworks-intro"
import RichtextGroup from "./sections/richtext-group"
import SoftwareList from "./instance/software-list"
import Swiper from "swiper"
import LibraryList from "./instance/library-list"
import LargeSearchBar from "./instance/large-search-bar"

// Map Strapi sections to section components
export const sectionComponents = {
  ComponentSectionsHero: dynamic(() => import("@/components/sections/hero")),
  ComponentSectionsLargeVideo: dynamic(() =>
    import("@/components/sections/large-video")
  ),
  ComponentInstanceCulture: Culture,
  ComponentInstanceMworksIntros: MworksIntros,
  ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  ComponentSectionsBottomActions: BottomActions,
  ComponentSectionsCards: InfoCards,
  ComponentInstanceSoftwareList: SoftwareList,
  ComponentInstanceLibraryList: LibraryList,
  ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  ComponentSectionsRichTextGroup: RichtextGroup,
  ComponentSectionsRichText: RichText,
  ComponentInstanceLargeSearchBar: LargeSearchBar,
  ComponentSectionsRichContentSection: dynamic(() =>
    import("@/components/sections/rich-content-section")
  ),
  ComponentSectionsMediaFeatures: dynamic(() =>
    import("@/components/sections/feature-group")
  ),
  ComponentSectionsPricing: Pricing,
  ComponentSectionsLeadForm: LeadForm,
  ComponentInstanceSoftwareList: SoftwareList,
  ComponentSectionsSolutionFeature: dynamic(() =>
    import("@/components/sections/solution-feature")
  ),
  ComponentSectionsCarouselSection: CarouselSection,
  ComponentSectionsTopHeading: dynamic(() =>
    import("@/components/sections/top-heading")
  ),
  // ComponentSectionsCards: InfoCards,
  ComponentSectionsCarousel: Carousel,
  ComponentSectionsHighlightingPoints: Features,
  ComponentSectionsSwipers: Swiper,
  // If getting dynamic zone using RESTful API
  "sections.rich-text": RichText,
  "sections.bottom-actions": BottomActions,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.hero": dynamic(() => import("@/components/sections/hero")),
  "sections.large-video": dynamic(() =>
    import("@/components/sections/large-video")
  ),
  "sections.lead-form": LeadForm,
  "sections.media-features": dynamic(() =>
    import("@/components/sections/feature-group")
  ),
  "sections.pricing": Pricing,
  // "sections.solution-list": SolutionList,
  "sections.top-heading": dynamic(() =>
    import("@/components/sections/top-heading")
  ),
  "sections.model-structure": ModelStructure,
  "sections.simple-features": SimpleFeatures,
  "sections.rich-content-section": dynamic(() =>
    import("@/components/sections/rich-content-section")
  ),
  "sections.cards": InfoCards,
  "sections.carousel": Carousel,
  "sections.highlighting-points": Features,
  "sections.solution-feature": dynamic(() =>
    import("@/components/sections/solution-feature")
  ),
  "sections.carousel-section": CarouselSection,
  "instance.culture": Culture,
}

// Display a section individually
const Section = ({ sectionData }) => {
  // Prepare the component
  const SectionComponent =
    sectionComponents[sectionData.__typename || sectionData.__component]

  if (!SectionComponent) {
    return null
  }

  // Display the section
  return (
    // <Context.Consumer>
    //   {({ global, pageContext }) => (
    // <>{JSON.stringify(sectionData)}
    <SectionComponent
      data={sectionData}
      // global={global}
      // pageContext={pageContext}
    />
    //     // </>
    //   )}
    // </Context.Consumer>
  )
}

const PreviewModeBanner = () => {
  const router = useRouter()
  const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
    router.asPath
  )}`

  return (
    <div className="py-4 bg-red-600 text-red-100 font-semibold uppercase tracking-wide">
      <div className="container">
        Preview mode is on.{" "}
        <a
          className="underline"
          href={`/api/exit-preview?redirect=${router.asPath}`}
        >
          Turn off
        </a>
      </div>
    </div>
  )
}

// Display the list of sections
const Sections = ({ sections, preview }) => {
  return (
    <div className="flex flex-col">
      {/* Show a banner if preview mode is on */}
      {preview && <PreviewModeBanner />}
      {/* Show the actual sections */}
      {sections.map((section) => (
        <Section
          sectionData={section}
          key={`${section.__typename || section.__component}${section.id}`}
        />
      ))}
    </div>
  )
}

export default Sections
