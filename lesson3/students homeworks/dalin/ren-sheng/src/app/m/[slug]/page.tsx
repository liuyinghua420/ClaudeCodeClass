import { notFound } from "next/navigation";
import { MODULES, getModule } from "@/data/modules";
import { ModuleLayout } from "@/components/module/module-layout";
import { CognitionContent } from "@/content/modules/cognition";
import { DecisionContent } from "@/content/modules/decision";
import { CompoundingContent } from "@/content/modules/compounding";
import { ChoiceContent } from "@/content/modules/choice";
import { FeedbackContent } from "@/content/modules/feedback";
import { LongTermContent } from "@/content/modules/long-term";
import { RiskContent } from "@/content/modules/risk";

const CONTENT_MAP: Record<string, () => React.ReactNode> = {
  cognition: () => <CognitionContent />,
  decision: () => <DecisionContent />,
  compounding: () => <CompoundingContent />,
  choice: () => <ChoiceContent />,
  feedback: () => <FeedbackContent />,
  "long-term": () => <LongTermContent />,
  risk: () => <RiskContent />,
};

export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const m = getModule(params.slug);
  if (!m) return {};
  return {
    title: `${m.title} — 人生算法`,
    description: m.hook,
  };
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const meta = getModule(params.slug);
  const Content = CONTENT_MAP[params.slug];
  if (!meta || !Content) return notFound();
  return <ModuleLayout meta={meta}>{Content()}</ModuleLayout>;
}
