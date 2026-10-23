export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  takeaway?: string;
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  published: string;
  updated: string;
  toolHref: string;
  toolLabel: string;
  sections: GuideSection[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "youtube-thumbnail-workflow",
    title: "A practical YouTube thumbnail workflow: from idea to final export",
    description: "Plan, compose, test, and export a clearer YouTube thumbnail with a repeatable creator workflow—not a collection of empty clickbait tricks.",
    category: "Thumbnail design",
    readTime: "8 min read",
    published: "2026-10-23",
    updated: "2026-10-23",
    toolHref: "/tools/ai-face-swap",
    toolLabel: "Explore the responsible face-swap workflow",
    sections: [
      {
        heading: "Begin with one promise",
        paragraphs: [
          "A thumbnail works best when it communicates one clear promise about the video. Before opening a design tool, finish this sentence: “After clicking, the viewer will learn or see…” If the sentence contains several unrelated outcomes, the thumbnail will probably contain too many competing ideas.",
          "Write three visual versions of that promise. A transformation video might show before versus after, a challenge might show the obstacle, and a tutorial might show the finished result. Choose the version that remains understandable when viewed at phone size.",
        ],
        bullets: [
          "Use one primary subject and one supporting idea.",
          "Avoid repeating the complete video title inside the thumbnail.",
          "Make the visual accurate enough that the opening of the video fulfills the promise.",
        ],
      },
      {
        heading: "Build a readable hierarchy",
        paragraphs: [
          "Decide what a viewer should notice first, second, and third. Size, contrast, sharpness, and position create that order. The main subject should win the first glance. Supporting text or objects should explain the situation without competing for attention.",
          "Temporarily convert the design to grayscale. If the subject disappears into the background, the composition relies too heavily on color. Add tonal separation, simplify the background, or use a restrained outline rather than stacking more effects.",
        ],
        takeaway: "A useful thumbnail should still communicate its subject and tension when it is briefly viewed at roughly 160 pixels wide.",
      },
      {
        heading: "Prepare the subject cleanly",
        paragraphs: [
          "Choose a sharp source image with an expression and camera angle that match the story. Remove the background, then inspect hair, glasses, hands, and clothing edges against both light and dark test colors. Edge halos that are invisible on white often become obvious on a dark thumbnail.",
          "If you use an AI-assisted face replacement, work only with your own likeness or a person who has granted permission. Match head angle and lighting, then inspect eyes, teeth, ears, and hair before publication. The output is a draft, not proof that a depicted event happened.",
        ],
      },
      {
        heading: "Use text only when it adds information",
        paragraphs: [
          "Thumbnail text should contribute a missing detail rather than restate the title. Use a short phrase, a meaningful number, or a contrast label. If removing the text makes no difference, remove it permanently.",
        ],
        bullets: [
          "Prefer a few large words over a sentence.",
          "Keep critical text away from the lower-right timestamp area.",
          "Test the type at actual feed size, not only on a large design canvas.",
          "Use contrast and spacing before adding multiple shadows or strokes.",
        ],
      },
      {
        heading: "Compare concepts without changing everything",
        paragraphs: [
          "Create two or three controlled variations. Change one meaningful variable at a time—such as expression, background, or headline—so the result teaches you something. Five radically different drafts make it difficult to understand why one performed better.",
          "Ask a reviewer to describe what they expect the video to contain after a one-second glance. If their answer differs from the actual topic, revise the concept before polishing it.",
        ],
      },
      {
        heading: "Export and learn from real performance",
        paragraphs: [
          "Export a 16:9 image at a resolution suitable for the publishing platform, check that the file is sharp, and view it on a phone. After publishing, evaluate the thumbnail together with the title, topic, audience source, and viewer retention. Click-through rate alone cannot tell you whether the promise was accurate or whether the video satisfied the click.",
        ],
        takeaway: "Keep a simple decision log: what you changed, why you changed it, and what happened. Over time, your own audience data is more useful than generic thumbnail rules.",
      },
    ],
    related: ["remove-background-clean-edges", "ai-face-swap-safety-checklist"],
  },
  {
    slug: "write-better-video-hooks",
    title: "How to write stronger video hooks without misleading your audience",
    description: "A practical method for drafting, testing, and revising opening lines for short-form and long-form videos while keeping the promise accurate.",
    category: "Script writing",
    readTime: "7 min read",
    published: "2026-10-23",
    updated: "2026-10-23",
    toolHref: "/tools/ai-script-writer",
    toolLabel: "Open the AI script-writer guide",
    sections: [
      {
        heading: "Define the value before the opening line",
        paragraphs: [
          "A hook is not decoration added after a script is finished. It is a compact statement of why the next part deserves attention. Write down the viewer, the problem, and the useful change the video delivers. If those three details are unclear, a dramatic opening line will only hide a weak premise.",
          "Use a specific outcome when possible. “This lighting setup removed the shadow under my eyes” gives the viewer a clearer reason to continue than “This trick changed everything.”",
        ],
      },
      {
        heading: "Choose the right type of tension",
        paragraphs: [
          "Good openings create an information gap the video can honestly close. That gap might be a mistake the viewer can avoid, an unexpected result, a visible transformation, a direct question, or a constraint that makes the process interesting.",
        ],
        bullets: [
          "Problem: name the cost of continuing with the current approach.",
          "Outcome: show the useful result before explaining the method.",
          "Contrast: place a common assumption beside what actually happened.",
          "Constraint: explain the limit that makes the attempt worth watching.",
        ],
      },
      {
        heading: "Make the first sentence concrete",
        paragraphs: [
          "Replace vague intensifiers with observable details. Numbers, time limits, visual changes, and named mistakes are easier to understand than words such as amazing, insane, secret, or revolutionary. Specific language also makes fact-checking easier.",
          "Read the line aloud. Remove greetings, channel introductions, apologies, and setup that the viewer does not need yet. Context can follow after the value is clear.",
        ],
        takeaway: "The first sentence should create a clear expectation that the next section immediately begins to satisfy.",
      },
      {
        heading: "Connect the hook to the next beat",
        paragraphs: [
          "Many scripts lose attention because the hook promises one subject and the next paragraph begins somewhere else. The second beat should provide evidence, start the demonstration, or explain the exact problem named in the opening.",
          "For a tutorial, show the result and begin step one. For a story, establish the conflict and move into the first decision. For an analysis, state the evidence you will examine rather than repeating the claim in different words.",
        ],
      },
      {
        heading: "Use AI as a variation partner, not an authority",
        paragraphs: [
          "A writing assistant is useful for generating alternative structures, shortening a draft, or changing tone. Give it real constraints: audience knowledge, platform, duration, evidence, and phrases that must not be used. Then select and rewrite the useful parts in your own voice.",
          "Generated scripts can invent facts and default to familiar internet phrasing. Verify every factual statement and replace generic examples with first-hand experience, demonstrations, or reliable sources.",
        ],
      },
      {
        heading: "Run a simple honesty test",
        paragraphs: [
          "Before publishing, compare the opening with the finished video. Does the video deliver the promised result? Is an important condition omitted? Would a reasonable viewer feel that the wording exaggerated the evidence? Revise the hook if the answer is yes.",
        ],
        bullets: [
          "Keep one version that is direct and one that uses curiosity.",
          "Ask a reviewer what they expect to learn after hearing each version.",
          "Prefer the version whose expectation most closely matches the actual video.",
        ],
      },
    ],
    related: ["youtube-thumbnail-workflow", "ai-face-swap-safety-checklist"],
  },
  {
    slug: "remove-background-clean-edges",
    title: "How to remove an image background and keep clean edges",
    description: "Improve background-removal results around hair, hands, glass, products, and soft shadows with a practical inspection and export workflow.",
    category: "Image editing",
    readTime: "7 min read",
    published: "2026-10-23",
    updated: "2026-10-23",
    toolHref: "/tools/background-remover",
    toolLabel: "Open the background-remover guide",
    sections: [
      {
        heading: "Start with a source that can be separated",
        paragraphs: [
          "Background removal is easier when the subject is sharp, fully visible, and different in tone or color from the background. Motion blur, heavy compression, backlighting, and matching foreground/background colors remove information that an automated tool needs to identify the edge.",
          "Use the highest-quality original available. Screenshots and repeatedly downloaded images often introduce halos and block artifacts before editing even begins.",
        ],
      },
      {
        heading: "Inspect difficult edge categories separately",
        paragraphs: [
          "Do not judge the entire cutout at one zoom level. Hair needs fine detail, hands need accurate shape, and products need straight or curved boundaries. Transparent and reflective objects require a different expectation because some of the original background is visible through the object.",
        ],
        bullets: [
          "Hair and fur: look for large missing clumps before individual strands.",
          "Hands and accessories: check spaces between fingers, straps, and jewelry.",
          "Glass and reflections: preserve believable transparency instead of forcing a solid edge.",
          "Product edges: look for dents introduced along straight packaging lines.",
        ],
      },
      {
        heading: "Test on more than one background",
        paragraphs: [
          "Place the cutout over white, black, and a saturated color. A pale fringe may disappear on white but become obvious on black; a dark fringe behaves in the opposite way. Testing several backgrounds also reveals partially transparent pixels and accidental holes.",
          "Use the final design color as the last test. A technically clean cutout can still look unnatural if its original lighting direction or color temperature conflicts with the new scene.",
        ],
      },
      {
        heading: "Keep or rebuild the contact shadow",
        paragraphs: [
          "Removing every shadow can make a standing person or product appear to float. If the original ground shadow is clean and useful, preserve it as a soft translucent element. Otherwise, rebuild a subtle shadow that matches the new light direction rather than keeping a hard fragment from the old background.",
        ],
      },
      {
        heading: "Choose the right correction",
        paragraphs: [
          "Regenerate when the model misunderstood the subject, removed a large object, or produced a fundamentally uneven edge. Use manual mask cleanup for small local problems. Repeatedly regenerating a nearly correct result can waste time and may introduce a different mistake.",
        ],
        takeaway: "Fix structural mistakes with a new pass; fix a few isolated pixels or edge sections with a local mask editor.",
      },
      {
        heading: "Export without losing transparency",
        paragraphs: [
          "Use PNG or another format that supports transparency. JPEG replaces transparent areas with a solid background. Before delivery, reopen the exported file in a separate viewer and confirm that transparency, dimensions, and edge quality survived the export.",
        ],
        bullets: [
          "Keep a full-resolution master cutout.",
          "Export resized copies for each platform instead of repeatedly resizing the same small file.",
          "Name files by subject and intended size so the correct version is easy to find.",
        ],
      },
    ],
    related: ["youtube-thumbnail-workflow", "ai-face-swap-safety-checklist"],
  },
  {
    slug: "ai-face-swap-safety-checklist",
    title: "AI face-swap safety checklist for creators and client work",
    description: "A pre-publish checklist covering consent, source rights, misleading context, output inspection, disclosure, and secure handling of face images.",
    category: "Responsible AI",
    readTime: "8 min read",
    published: "2026-10-23",
    updated: "2026-10-23",
    toolHref: "/tools/ai-face-swap",
    toolLabel: "Read how SnapMod face swap works",
    sections: [
      {
        heading: "Get permission before processing",
        paragraphs: [
          "A publicly visible photo is not automatically permission to alter a person's likeness. Use your own image or obtain clear permission that covers the intended edit and publication context. Client approval should identify where the result may appear and whether it can be used in paid advertising.",
          "Consent must be meaningful. Do not rely on permission from someone who cannot legally provide it, and never create sexualized, exploitative, or deceptive content involving minors.",
        ],
      },
      {
        heading: "Confirm rights to both source images",
        paragraphs: [
          "Face-swap projects involve at least two inputs: a face reference and a target composition. Check the photographer's rights, model or publicity permissions, stock-license restrictions, client agreement, and any platform-specific rules for both images.",
          "Buying a stock image does not necessarily allow every synthetic-media use. Read the license instead of assuming that commercial access includes identity alteration or endorsement.",
        ],
      },
      {
        heading: "Evaluate the implied story",
        paragraphs: [
          "A technically convincing edit can still be misleading. Ask what a reasonable viewer would believe happened. Could the image suggest that a real person attended an event, used a product, made a statement, or endorsed a brand when they did not? If so, change the concept or add a clear disclosure.",
        ],
        bullets: [
          "Do not use synthetic images as evidence of real conduct.",
          "Do not create false endorsements or impersonate someone for financial gain.",
          "Avoid news-like presentation that makes a fictional event look documented.",
          "Follow election, advertising, and platform rules that apply to synthetic media.",
        ],
      },
      {
        heading: "Inspect identity and image artifacts",
        paragraphs: [
          "Zoom in before publishing. Check pupils, eye direction, teeth, earrings, hairline, ears, skin texture, glasses, and transitions around the jaw. Compare the result with the permitted reference to make sure it has not created an unwanted hybrid identity.",
          "Also inspect the whole composition. Lighting direction, skin tone, depth of field, and image grain should make sense together. A realistic face with inconsistent scene lighting still produces a misleading or low-quality result.",
        ],
      },
      {
        heading: "Decide when and how to disclose",
        paragraphs: [
          "Disclosure is especially important when viewers could mistake the image for a real event, testimonial, or documentary photograph. Use plain language near the content, such as “AI-assisted composite” or “face digitally replaced with permission.” Do not hide a meaningful disclosure in unrelated fine print.",
          "Some platforms provide synthetic-media labels. Use them when required, but do not treat a platform label as a replacement for obtaining permission or avoiding deception.",
        ],
      },
      {
        heading: "Handle face images as sensitive creative assets",
        paragraphs: [
          "Limit access to source images, avoid sending them through unnecessary services, and remove copies when the project no longer needs them. For client work, document the approved purpose, retention period, and people allowed to download the files.",
        ],
        takeaway: "Before export, confirm five things: permission, source rights, truthful context, artifact review, and appropriate disclosure.",
      },
    ],
    related: ["youtube-thumbnail-workflow", "remove-background-clean-edges"],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
