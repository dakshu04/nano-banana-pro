import type { Metadata } from "next";
import { ToolGuide } from "../../components/tool-guide";

export const metadata: Metadata = {
  title: "Free AI Script Writer for Social Content",
  description: "Draft hooks, structured talking points, and calls to action for YouTube, Instagram, LinkedIn, and X with SnapMod.",
  alternates: { canonical: "/tools/ai-script-writer" },
  openGraph: { title: "Free AI Script Writer for Social Content | SnapMod", description: "Draft and refine platform-aware social scripts.", url: "/tools/ai-script-writer", type: "article" },
};

export default function ScriptWriterGuide() {
  return <ToolGuide
    canonical="/tools/ai-script-writer"
    eyebrow="Writing assistant"
    name="Draft social scripts from a clear creative brief"
    summary="Turn a topic, audience, platform, tone, and target length into a spoken-word first draft. SnapMod helps you overcome the blank page; your experience, fact-checking, and editing are what make the final script worth publishing."
    benefits={[
      { title: "Start with structure", description: "Generate a hook, useful body, and single call to action instead of staring at an empty document." },
      { title: "Match the platform", description: "Give the draft context for YouTube, Instagram, LinkedIn, or X and then edit it for your actual audience." },
      { title: "Control the brief", description: "Specify tone, audience, genre, length, and supporting context so the first pass is easier to refine." },
    ]}
    steps={[
      { title: "Describe one topic", description: "Use a focused idea and identify the person who should benefit from hearing it." },
      { title: "Set tone and length", description: "Choose the platform, style, and approximate duration that fit your publishing format." },
      { title: "Edit in your voice", description: "Verify claims, add first-hand examples, remove generic lines, and read the script aloud before recording." },
    ]}
    bestPractices={["Give the tool concrete facts, examples, and a narrow audience.", "Replace generic claims with your own experience or sourced evidence.", "Read the draft aloud to find unnatural phrasing.", "Verify names, dates, statistics, health claims, and financial claims independently."]}
    limitations="A generated draft can contain inaccurate or invented claims and may sound similar to common online content. It is not a substitute for research, professional advice, or editorial judgment. Add original experience and cite reliable sources when facts matter."
    faqs={[
      { question: "Which platforms can I write for?", answer: "The current interface supports common social formats including YouTube, Instagram, LinkedIn, and X. You can adapt the generated spoken text for other short- or long-form channels." },
      { question: "Does the tool publish content for me?", answer: "No. It generates draft text. You decide what to edit, verify, record, and publish on your own channels." },
      { question: "Is the AI script writer free?", answer: "The current pricing page lists the script writer as free. Reasonable usage controls may apply to keep the service available and prevent automated abuse." },
      { question: "Can I trust facts in a generated script?", answer: "Do not assume generated facts are correct. Verify factual statements with reliable primary sources, especially for health, legal, financial, safety, or current-events topics." },
    ]}
  />;
}
