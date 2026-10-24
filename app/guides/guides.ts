export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  takeaway?: string;
  sources?: Array<{ label: string; href: string }>;
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
    slug: "start-gta-6-youtube-channel",
    title: "How to start a GTA 6 YouTube channel before launch: a practical growth plan",
    description: "Build an original GTA 6 YouTube channel with a clear niche, efficient publishing system, launch-week plan, stronger thumbnails, and realistic monetization expectations.",
    category: "YouTube strategy",
    readTime: "11 min read",
    published: "2026-10-24",
    updated: "2026-10-24",
    toolHref: "/tools/ai-script-writer",
    toolLabel: "Draft your next GTA 6 video outline",
    sections: [
      {
        heading: "Treat the release window as an opportunity, not a guarantee",
        paragraphs: [
          "Rockstar currently lists Grand Theft Auto VI for November 19, 2026 on PlayStation 5 and Xbox Series X|S. That creates a concentrated period of audience interest, but it does not guarantee views or income. A new channel still has to earn attention with useful ideas, recognizable presentation, and consistent execution.",
          "The efficient approach is to build the channel system before the busiest search period. Decide what your channel helps viewers do, publish several original videos, learn which topics attract the right audience, and prepare repeatable production templates. Then launch week becomes an acceleration point instead of the first time you test your workflow.",
          "This guide is independent editorial advice. SnapMod is not affiliated with or endorsed by Rockstar Games or Take-Two Interactive, and release details can change. Verify important game information through Rockstar's official website before publishing.",
        ],
        takeaway: "Your advantage is not merely being early. It is arriving early with a clear promise and a production system that can survive launch-week demand.",
      },
      {
        heading: "Choose a channel angle narrow enough to remember",
        paragraphs: [
          "A channel about everything related to GTA 6 is difficult to distinguish from established gaming publishers. Start with one repeatable viewer promise. You can expand later, but the first twenty videos should make it easy for a stranger to explain why they would subscribe.",
          "Pick an angle that fits your actual strengths. A strong analyst can examine trailers, systems, and design choices. A skilled player can build challenge runs and practical guides after release. A storyteller can document characters, locations, and theories while clearly separating confirmed information from interpretation.",
        ],
        bullets: [
          "Evidence-first analysis: explain confirmed details and label speculation clearly.",
          "Beginner guidance: controls, progression, settings, missions, and common early mistakes.",
          "Challenge and experiment videos: answer one specific gameplay question with an original test.",
          "Creative and technical analysis: study world design, vehicles, systems, performance, or visual storytelling.",
          "News with context: explain why an official update matters instead of reading it aloud.",
        ],
        takeaway: "Write one sentence: 'People subscribe because I help GTA 6 players ______.' Use that sentence to reject off-topic ideas.",
      },
      {
        heading: "Create three content lanes before creating a logo",
        paragraphs: [
          "Branding matters, but a content map is more valuable than a perfect banner. Build three connected lanes so the channel feels focused without repeating the same video. Each lane should serve a different stage of viewer intent.",
          "A useful mix is discovery, depth, and utility. Discovery videos respond quickly to a confirmed announcement. Depth videos remain useful because they explain a system or idea. Utility videos help viewers complete a task and can attract search traffic long after publication.",
        ],
        bullets: [
          "Discovery: official-news breakdowns, trailer observations, and clearly labeled first reactions.",
          "Depth: location analysis, character studies, system explainers, and evidence-based comparisons.",
          "Utility: setup guides, beginner mistakes, mission help, settings, accessibility, and performance guidance.",
        ],
        takeaway: "Before launch, prepare at least five ideas in each lane. Do not depend on one unpredictable news feed for the entire channel.",
      },
      {
        heading: "Use a 90-minute production system for pre-launch videos",
        paragraphs: [
          "Speed should come from fewer decisions, not lower standards. Create a repeatable production board with six stages: verify, angle, outline, record, package, and review. Put a time limit on each stage and save reusable checklists for descriptions, disclosures, source links, and final quality checks.",
          "For a focused pre-launch analysis, spend roughly fifteen minutes verifying official information, fifteen minutes defining the viewer promise, twenty minutes drafting the outline, twenty minutes recording, and twenty minutes editing the clearest version. Complex videos will take longer, but this structure prevents endless polishing before the core idea is proven.",
        ],
        bullets: [
          "Keep a source log containing the official URL and the exact claim it supports.",
          "Open with the useful conclusion, then show how the evidence supports it.",
          "Record original commentary instead of relying on text-to-speech over borrowed clips.",
          "Use a repeatable editing structure, but change the substance and examples in every video.",
          "End with one relevant next video rather than several unrelated calls to action.",
        ],
      },
      {
        heading: "Build a launch-week operating plan",
        paragraphs: [
          "Launch week rewards preparation because search behavior changes quickly. Prepare flexible outlines, thumbnail layouts, recording scenes, project folders, and upload checklists in advance. Do not pre-write factual conclusions about gameplay you have not experienced.",
          "Plan one dependable long-form video per day only if you can maintain quality. A smaller creator may perform better with three strong videos than seven rushed uploads. Use Shorts to extract one self-contained insight from your original long-form work, not to flood the channel with nearly identical clips.",
        ],
        bullets: [
          "Day one: first-hour beginner mistakes or settings you verified yourself.",
          "Day two: one mission, mechanic, or progression system explained clearly.",
          "Day three: an original experiment with a measurable question and result.",
          "Days four to seven: update the subjects that generated useful comments, search impressions, or sustained watch time.",
        ],
        takeaway: "Leave empty space in the calendar. The best launch-week topic may be a real player problem that nobody can predict before release.",
      },
      {
        heading: "Package each video around one honest promise",
        paragraphs: [
          "A searchable title should identify the subject and the useful outcome. A browse-focused title can create curiosity, but the opening of the video must fulfill the same promise. Avoid release rumors presented as facts, fake leaks, invented map details, or thumbnails that suggest footage and features you cannot verify.",
          "Create the title and thumbnail together. Use one main subject, strong foreground-background separation, and only a few words when text adds information. At phone size, a viewer should understand the topic without inspecting small details.",
        ],
        bullets: [
          "Search example: 'GTA 6 beginner settings to check first' after you have verified them.",
          "Analysis example: 'What Rockstar's latest GTA 6 footage actually confirms.'",
          "Experiment example: 'I tested three ways to escape this mission.'",
          "Avoid: 'SECRET FEATURE CONFIRMED' when the evidence is only speculation.",
        ],
        takeaway: "If the title would disappoint someone after watching the complete video, rewrite the title before publishing.",
      },
      {
        heading: "Make the content original enough to build a business",
        paragraphs: [
          "YouTube says gaming content may be monetizable when creators have the necessary commercial-use rights and add commentary that is tied to the action and provides instructional or educational value. Extended gameplay with little added value may not be accepted for monetization.",
          "YouTube also reviews reused and repetitive content at the channel level. Reading articles over official footage, compiling trailers with minimal narration, or producing many template-based videos can attract views while weakening a future monetization application. Make your contribution obvious through your voice, testing, analysis, editing decisions, or on-camera participation.",
        ],
        bullets: [
          "Use official assets only within the permissions that apply to them.",
          "Record your own gameplay when available and preserve the original project files.",
          "Keep borrowed clips limited to what your criticism or explanation needs.",
          "Use licensed music or the YouTube Audio Library rather than copying soundtrack recordings.",
          "Add meaningful original narration, evidence, comparisons, or demonstrated results.",
        ],
      },
      {
        heading: "Plan for revenue without building around a fantasy number",
        paragraphs: [
          "A GTA 6 channel can have commercial potential because viewers may search for entertainment, guidance, and analysis, but revenue is never guaranteed. YouTube Partner Program access requires eligibility thresholds, policy compliance, an account review, and an active AdSense for YouTube setup. Meeting a numeric threshold does not automatically approve a channel.",
          "Build the first phase around audience trust rather than projected ad revenue. Later revenue may include YouTube ads, memberships or fan funding where available, relevant affiliate links, and sponsorships that genuinely fit the audience. Disclose commercial relationships and never buy views, subscribers, or engagement.",
        ],
        bullets: [
          "Month one goal: publish a coherent library and identify repeat viewers.",
          "Month two goal: improve packaging and retention using your own analytics.",
          "Month three goal: double down on two proven formats and stop weak formats.",
          "Monetization goal: qualify with original, policy-compliant work—not shortcuts.",
        ],
        takeaway: "Treat income as a result of useful content and audience trust. Do not spend money based on earnings that have not happened.",
      },
      {
        heading: "Measure signals that improve the next video",
        paragraphs: [
          "Early channels have small samples, so avoid making major decisions from one upload. Review impressions, click-through rate, average view duration, retention drops, search terms, returning viewers, and comments together. Each metric answers a different question.",
          "If impressions are low, the topic may be too narrow or the channel may need more history. If impressions are healthy but clicks are weak, test the title and thumbnail. If viewers click and leave immediately, the opening may not fulfill the promise. If one section is repeatedly rewatched, it may deserve a dedicated follow-up video.",
        ],
        bullets: [
          "Log the topic, promise, format, title, thumbnail concept, and publication time.",
          "Review each video after 48 hours, seven days, and 28 days.",
          "Change one important packaging variable at a time so the result teaches you something.",
          "Turn recurring viewer questions into the next useful video.",
        ],
      },
      {
        heading: "Your efficient seven-day starting plan",
        paragraphs: [
          "Day one: choose the channel promise and three content lanes. Day two: collect official sources and write fifteen useful video ideas. Day three: create a simple visual identity and two thumbnail layouts. Day four: script and record the first evidence-based video. Day five: edit, fact-check, and publish it. Day six: create a related Short with a complete standalone insight. Day seven: review the workflow, not just the view count, and prepare the next two videos.",
          "A strong start is a small body of original work that tells viewers exactly what they will get next. The release window may increase attention, but a disciplined channel can continue through updates, guides, experiments, and community questions long after launch week.",
        ],
        takeaway: "Publish one genuinely useful video, learn from it, and improve the system. Efficiency is the ability to repeat good work—not the ability to upload the most files.",
      },
      {
        heading: "Official sources and further reading",
        paragraphs: [
          "Verify release details and official announcements before recording. Review YouTube's current monetization, gaming-content, and copyright guidance before building a revenue plan. Policies and eligibility requirements can change after this guide is updated.",
        ],
        sources: [
          { label: "Rockstar Games: Grand Theft Auto VI official site", href: "https://www.rockstargames.com/VI" },
          { label: "Rockstar Newswire: Grand Theft Auto VI extended look", href: "https://www.rockstargames.com/newswire/article/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing" },
          { label: "YouTube Help: Partner Program overview and eligibility", href: "https://support.google.com/youtube/answer/72851" },
          { label: "YouTube Help: Channel monetization policies", href: "https://support.google.com/youtube/answer/1311392" },
          { label: "YouTube Help: Video game and software content", href: "https://support.google.com/youtube/answer/138161" },
          { label: "YouTube Help: Copyright on YouTube", href: "https://support.google.com/youtube/answer/2797466" },
        ],
      },
    ],
    related: ["youtube-thumbnail-workflow", "write-better-video-hooks", "ai-face-swap-safety-checklist"],
  },
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
    related: ["start-gta-6-youtube-channel", "remove-background-clean-edges", "ai-face-swap-safety-checklist"],
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
    related: ["start-gta-6-youtube-channel", "youtube-thumbnail-workflow", "ai-face-swap-safety-checklist"],
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
