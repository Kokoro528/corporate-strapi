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
import SolutionList from "./collations/solution-list"
import ModelStructure from "./sections/model-structure"
import SimpleFeatures from "./sections/simple-features"
import RichContent from "./sections/rich-content-section"
import InfoCards from "./sections/info-cards"

// Map Strapi sections to section components
const sectionComponents = {
  ComponentSectionsHero: Hero,
  ComponentSectionsLargeVideo: LargeVideo,
  ComponentSectionsFeatureColumnsGroup: FeatureColumnsGroup,
  ComponentSectionsFeatureRowsGroup: FeatureRowsGroup,
  ComponentSectionsBottomActions: BottomActions,
  ComponentSectionsTestimonialsGroup: TestimonialsGroup,
  ComponentSectionsRichText: RichText,
  ComponentSectionsRichContentSection: RichContent,
  ComponentSectionsMediaFeatures: FeatureGroup,
  ComponentSectionsPricing: Pricing,
  ComponentSectionsLeadForm: LeadForm,
  ComponentSectionsSolutionFeature: SolutionFeature,
  ComponentSectionsTopHeading: TopHeading,
  ComponentSectionsCards: InfoCards,

  // If getting dynamic zone using RESTful API
  "sections.rich-text": RichText,
  "sections.bottom-actions": BottomActions,
  "sections.feature-columns-group": FeatureColumnsGroup,
  "sections.feature-rows-group": FeatureRowsGroup,
  "sections.hero": Hero,
  "sections.large-video": LargeVideo,
  "sections.lead-form": LeadForm,
  "sections.media-features": FeatureGroup,
  "sections.pricing": Pricing,
  "sections.solution-list": SolutionList,
  "sections.top-heading": TopHeading,
  "sections.model-structure": ModelStructure,
  "sections.simple-features": SimpleFeatures,
  "sections.rich-content-section": RichContent,
  "sections.cards": InfoCards,
}

// const ContextSection = () => {
//   return (
//     <Context.Consumer>
//       {({pageContext}) => {

//       }}
//     </Context.Consumer>
//   )
// }

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
    <Context.Consumer>
      {({ global, pageContext, className }) => (
        <SectionComponent
          data={sectionData}
          global={global}
          pageContext={pageContext}
        />
      )}
    </Context.Consumer>
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
