import { SEO } from '../components/SEO';
import { Features as FeaturesBlock } from "../components/blocks/features-10"

export default function Features() {
  return (
    <>
      <SEO title="Features | HEMLO" description="Explore the features that power Hemlo's Intelligence Platform." path="/features" />
      <div className="min-h-screen bg-black text-white pt-24 pb-20">
        <FeaturesBlock />
      </div>
    </>
  )
}
