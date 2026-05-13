import { notFound } from "next/navigation";
import { TOOLS, getTool } from "@/data/tools";
import { ToolShell } from "@/components/tools/tool-shell";
import { CompoundSimulator } from "@/components/tools/compound-simulator";
import { DecisionCostCalculator } from "@/components/tools/decision-cost-calculator";
import { OpportunityCostComparator } from "@/components/tools/opportunity-cost-comparator";
import { BiasSelfTest } from "@/components/tools/bias-self-test";
import { LifeChoiceSimulator } from "@/components/tools/life-choice-simulator";
import { LongTermFeedback } from "@/components/tools/long-term-feedback";
import { RuinRiskSimulator } from "@/components/tools/ruin-risk-simulator";
import { DecisionJournal } from "@/components/tools/decision-journal";

const COMPONENTS: Record<string, () => React.ReactNode> = {
  "compound-simulator": () => <CompoundSimulator />,
  "decision-cost": () => <DecisionCostCalculator />,
  "opportunity-cost": () => <OpportunityCostComparator />,
  "bias-test": () => <BiasSelfTest />,
  "life-choice": () => <LifeChoiceSimulator />,
  "long-term-feedback": () => <LongTermFeedback />,
  "ruin-risk": () => <RuinRiskSimulator />,
  "decision-journal": () => <DecisionJournal />,
};

const FINANCE_DISCLAIMERS = new Set(["compound-simulator", "life-choice", "ruin-risk"]);

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const t = getTool(params.slug);
  if (!t) return {};
  return {
    title: `${t.name} — 人生算法`,
    description: t.description,
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  const Component = COMPONENTS[params.slug];
  if (!tool || !Component) return notFound();
  return (
    <ToolShell
      toolSlug={params.slug}
      showFinanceDisclaimer={FINANCE_DISCLAIMERS.has(params.slug)}
    >
      {Component()}
    </ToolShell>
  );
}
