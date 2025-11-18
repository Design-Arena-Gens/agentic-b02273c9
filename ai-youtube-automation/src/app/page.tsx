"use client";

import { FormEvent, useMemo, useState } from "react";
import { AutomationResponseNormalized } from "@/lib/schema";

type FormState = {
  topic: string;
  targetAudience: string;
  contentGoal: string;
  tone: string;
  duration: string;
  platformFocus: string;
  callToAction: string;
  includeResearch: boolean;
  keywords: string;
  competitors: string;
};

const initialState: FormState = {
  topic: "Mastering short-form AI productivity hacks",
  targetAudience: "Busy creators who want to automate YouTube channel growth",
  contentGoal: "Drive newsletter signups for my automation playbook",
  tone: "Energetic, witty, data-backed",
  duration: "8 minute deep-dive",
  platformFocus: "YouTube",
  callToAction: "Subscribe and download the automation toolkit",
  includeResearch: true,
  keywords: "youtube automation, viral video ideas, ai video editor",
  competitors: "Ali Abdaal, Think Media, Film Booth",
};

export default function Home() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AutomationResponseNormalized | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: form.topic,
          targetAudience: form.targetAudience,
          contentGoal: form.contentGoal,
          tone: form.tone,
          duration: form.duration,
          platformFocus: form.platformFocus,
          callToAction: form.callToAction,
          includeResearch: form.includeResearch,
          keywords: parseCommaSeparated(form.keywords),
          competitors: parseCommaSeparated(form.competitors),
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? "Failed to generate automation plan.");
      }

      const payload = await response.json();
      setResult(payload.data as AutomationResponseNormalized);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = useMemo(() => {
    return (
      form.topic.trim().length > 3 &&
      form.targetAudience.trim().length > 3 &&
      form.contentGoal.trim().length > 3 &&
      form.tone.trim().length > 3 &&
      form.duration.trim().length > 2
    );
  }, [form]);

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-20 pt-12 sm:pt-16">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-900 backdrop-blur lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Agentic Flow
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              AI YouTube Automation Studio
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
              Drop in a topic and unleash an end-to-end production pipeline.
              Scripts, research, visual direction, sound design, and automation
              prompts are crafted in seconds.
            </p>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="font-semibold text-emerald-200">Blueprint includes</p>
            <ul className="grid grid-cols-2 gap-2 text-slate-300 sm:grid-cols-3">
              <li>Viral concept mapping</li>
              <li>Retention-first script</li>
              <li>Thumbnail prompts</li>
              <li>Scene-by-scene visuals</li>
              <li>Audio &amp; SFX cues</li>
              <li>Competitor research</li>
            </ul>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          <form
            onSubmit={handleSubmit}
            className="flex h-fit flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/50 backdrop-blur"
          >
            <div className="space-y-2">
              <label
                htmlFor="topic"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200"
              >
                Core Topic
              </label>
              <textarea
                id="topic"
                value={form.topic}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, topic: event.target.value }))
                }
                className="min-h-[80px] rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                placeholder="What is this video about?"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="audience"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200"
              >
                Target Audience
              </label>
              <textarea
                id="audience"
                value={form.targetAudience}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    targetAudience: event.target.value,
                  }))
                }
                className="min-h-[80px] rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                placeholder="Who should binge this?"
              />
            </div>

            <fieldset className="grid gap-4">
              <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Positioning
              </legend>
              <TextField
                id="goal"
                label="Content Goal"
                value={form.contentGoal}
                placeholder="E.g. sell your course, capture emails, launch a product"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, contentGoal: value }))
                }
              />
              <TextField
                id="tone"
                label="Preferred Tone"
                value={form.tone}
                placeholder="Explain the vibe (motivating, cinematic, documentary...)"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, tone: value }))
                }
              />
              <TextField
                id="duration"
                label="Ideal Duration"
                value={form.duration}
                placeholder="E.g. 8-minute deep dive, 12 shorts series, etc."
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, duration: value }))
                }
              />
              <TextField
                id="platform"
                label="Primary Platform"
                value={form.platformFocus}
                placeholder="YouTube, YT Shorts, TikTok..."
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, platformFocus: value }))
                }
              />
              <TextField
                id="cta"
                label="Call To Action"
                value={form.callToAction}
                placeholder="Optional but powerful."
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, callToAction: value }))
                }
              />
            </fieldset>

            <fieldset className="grid gap-4">
              <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                Optimization Inputs
              </legend>
              <TextField
                id="keywords"
                label="Keywords (comma separated)"
                value={form.keywords}
                placeholder="automation, ai video editor, viral content"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, keywords: value }))
                }
              />
              <TextField
                id="competitors"
                label="Competitors (comma separated)"
                value={form.competitors}
                placeholder="Channels you want to outrank"
                onChange={(value) =>
                  setForm((prev) => ({ ...prev, competitors: value }))
                }
              />
            </fieldset>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={form.includeResearch}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    includeResearch: event.target.checked,
                  }))
                }
                className="h-5 w-5 rounded border border-slate-400 bg-slate-900 checked:bg-emerald-400 checked:hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
              Enrich with deep research and referenced data
            </label>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-emerald-500/60 bg-emerald-400/80 px-6 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/80 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500"
            >
              {loading ? (
                <>
                  <Spinner />
                  Generating automation
                </>
              ) : (
                <>
                  <Lightning />
                  Generate in One Click
                </>
              )}
            </button>
            {error && (
              <p className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </p>
            )}
          </form>

          <div className="space-y-6">
            {!result && !loading && <EmptyState />}
            {loading && <GenerationSkeleton />}
            {result && !loading && <AutomationResults data={result} />}
          </div>
        </section>
      </main>
    </div>
  );
}

function parseCommaSeparated(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

function TextField({ id, label, value, placeholder, onChange }: TextFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300"
      >
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
      <Lightning className="h-12 w-12 text-emerald-300" />
      <h2 className="text-xl font-semibold text-slate-100">
        Launch a viral-ready content factory
      </h2>
      <p className="max-w-md text-sm text-slate-300">
        Plug in your idea and get a full stack of outputs: strategy, research,
        script, thumbnail, audio, automations. Everything engineered for speed
        and impact.
      </p>
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
        No manual prompt chains. One click.
      </div>
    </div>
  );
}

function GenerationSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border border-white/5 bg-white/5 p-6"
        >
          <div className="h-4 w-32 rounded bg-white/10" />
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-white/10" />
            <div className="h-3 w-5/6 rounded bg-white/10" />
            <div className="h-3 w-2/3 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

type AutomationResultsProps = {
  data: AutomationResponseNormalized;
};

function AutomationResults({ data }: AutomationResultsProps) {
  return (
    <div className="space-y-6">
      <ResultCard title="Core Concept" badge="Strategy">
        <div className="space-y-4 text-sm text-slate-200">
          <p className="text-base font-semibold text-emerald-200">
            {data.coreConcept.viralIdea.title}
          </p>
          <p className="text-slate-300">{data.coreConcept.viralIdea.hook}</p>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Channel Mission
            </h3>
            <p className="mt-2 text-slate-200">{data.coreConcept.channelMission}</p>
          </div>

          <section className="grid gap-4 md:grid-cols-2">
            <DetailList
              title="Virality Triggers"
              items={data.coreConcept.viralIdea.viralityTriggers}
            />
            <DetailList
              title="Signature Angle"
              items={[data.coreConcept.signatureAngle]}
            />
          </section>

          <section className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Narrative Pillars
            </h3>
            <div className="mt-3 space-y-3">
              {data.coreConcept.narrativePillars.map((pillar) => (
                <div
                  key={pillar.pillar}
                  className="rounded-2xl border border-white/5 bg-slate-950/40 p-4"
                >
                  <h4 className="text-sm font-semibold text-slate-100">
                    {pillar.pillar}
                  </h4>
                  <p className="mt-1 text-slate-300">{pillar.description}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
                    Performance Hook
                  </p>
                  <p className="text-sm text-slate-200">
                    {pillar.performanceHook}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <DetailChips
            title="Recommended Keywords"
            items={data.coreConcept.recommendedKeywords}
          />
        </div>
      </ResultCard>

      <ResultCard title="Script Blueprint" badge="Scripting">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              Length: ~{Math.round(data.script.lengthEstimateSeconds / 60)} min
            </div>
            <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-100">
              CTA: {data.script.cta}
            </div>
          </div>
          <div className="space-y-4">
            {data.script.outline.map((segment) => (
              <div
                key={segment.segment}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-base font-semibold text-slate-100">
                    {segment.segment}
                  </h3>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-100">
                    {segment.retentionDevice}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{segment.objective}</p>
                <DetailList
                  title="Narration Beats"
                  items={segment.narrationBeats}
                />
                <DetailList title="Visual Notes" items={segment.visualNotes} />
              </div>
            ))}
          </div>
        </div>
      </ResultCard>

      <ResultCard title="Visual Direction" badge="Design">
        <div className="space-y-4">
          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Thumbnail Concepts
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {data.visualPlan.thumbnailConcepts.map((concept) => (
                <div
                  key={concept.headline}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {concept.headline}
                    </p>
                    <p className="text-xs text-slate-300">
                      {concept.description}
                    </p>
                  </div>
                  <DetailChips
                    title="Palette"
                    items={concept.colorPalette}
                  />
                  <PromptBlock label="AI Prompt" prompt={concept.aiPrompt} />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Scene Design
            </h3>
            <div className="space-y-3">
              {data.visualPlan.sceneDesign.map((scene) => (
                <div
                  key={scene.segment}
                  className="grid gap-3 rounded-2xl border border-white/5 bg-slate-950/50 p-4 md:grid-cols-2"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-100">
                      {scene.segment}
                    </p>
                    <DetailList
                      title="Primary Visuals"
                      items={scene.primaryVisuals}
                    />
                  </div>
                  <div>
                    <DetailList
                      title="Motion Ideas"
                      items={scene.motionIdeas}
                    />
                    <PromptBlock
                      label="Stock / AI Prompts"
                      prompt={scene.stockPrompts.join("\n")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ResultCard>

      <ResultCard title="Audio &amp; SFX" badge="Sound">
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Voice Profile
            </h3>
            <p className="text-sm text-slate-200">{data.audioPlan.voiceProfile}</p>
          </div>
          <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            {data.audioPlan.pacingGuidance}
          </p>

          <div className="space-y-3">
            {data.audioPlan.audioMoments.map((moment) => (
              <div
                key={moment.moment}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"
              >
                <p className="text-sm font-semibold text-slate-100">
                  {moment.moment}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                  Music Mood
                </p>
                <p className="text-xs text-slate-300">{moment.musicMood}</p>
                <DetailChips title="SFX Ideas" items={moment.sfxIdeas} />
              </div>
            ))}
          </div>

          <PromptBlock
            label="AI Voice Prompt"
            prompt={data.audioPlan.aiVoicePrompt}
          />
        </div>
      </ResultCard>

      <ResultCard title="Deep Research" badge="Intel">
        <div className="space-y-4">
          <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
            {data.research.summary}
          </p>

          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Key Insights
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {data.research.keyInsights.map((insight) => (
                <div
                  key={insight.insight}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-200"
                >
                  <p className="font-semibold text-slate-100">
                    {insight.insight}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Evidence: {insight.evidence}
                  </p>
                  <p className="mt-1 text-xs text-emerald-200">
                    Source: {insight.source}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Competitor Breakdown
            </h3>
            <div className="space-y-3">
              {data.research.competitorBreakdown.map((competitor) => (
                <div
                  key={competitor.channel}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200"
                >
                  <p className="font-semibold text-slate-100">
                    {competitor.channel}
                  </p>
                  <p className="mt-1 text-slate-300">{competitor.lesson}</p>
                  {competitor.reference && (
                    <p className="mt-1 text-xs text-emerald-200">
                      Reference: {competitor.reference}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <DetailChips title="SEO Keywords" items={data.research.seoKeywords} />
        </div>
      </ResultCard>

      <ResultCard title="Automation Stack" badge="Execution">
        <div className="space-y-4">
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Tool Prompts
            </h3>
            <div className="space-y-3">
              {data.workflow.automations.map((automation, index) => (
                <div
                  key={`${automation.tool}-${index}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
                >
                  <div className="flex flex-col gap-1 text-sm text-slate-200">
                    <p className="text-sm font-semibold text-slate-100">
                      {automation.tool}
                    </p>
                    <p className="text-slate-300">{automation.purpose}</p>
                  </div>
                  <PromptBlock label="Prompt" prompt={automation.prompt} />
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Execution Timeline (hours)
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-3">
              <TimelineCard
                phase="Pre-Production"
                hours={data.workflow.executionTimelineHours.preProduction}
              />
              <TimelineCard
                phase="Production"
                hours={data.workflow.executionTimelineHours.production}
              />
              <TimelineCard
                phase="Post-Production"
                hours={data.workflow.executionTimelineHours.postProduction}
              />
            </div>
          </section>
        </div>
      </ResultCard>
    </div>
  );
}

type ResultCardProps = {
  title: string;
  badge: string;
  children: React.ReactNode;
};

function ResultCard({ title, badge, children }: ResultCardProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-slate-950/60 to-slate-950/80 p-6 shadow-xl shadow-slate-950/60">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-white/5 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          {badge}
        </div>
        <h2 className="text-2xl font-semibold text-slate-50">{title}</h2>
      </div>
      {children}
    </section>
  );
}

type DetailListProps = {
  title: string;
  items: string[];
};

function DetailList({ title, items }: DetailListProps) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
        {title}
      </p>
      <ul className="space-y-1 text-sm text-slate-300">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="leading-snug">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

type DetailChipsProps = {
  title: string;
  items: string[];
};

function DetailChips({ title, items }: DetailChipsProps) {
  if (!items.length) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
        {title}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-slate-100">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-1"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

type PromptBlockProps = {
  label: string;
  prompt: string;
};

function PromptBlock({ label, prompt }: PromptBlockProps) {
  if (!prompt) return null;
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
        {label}
      </p>
      <pre className="max-h-60 overflow-auto rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-xs leading-relaxed text-emerald-100">
        {prompt}
      </pre>
    </div>
  );
}

type TimelineCardProps = {
  phase: string;
  hours: number;
};

function TimelineCard({ phase, hours }: TimelineCardProps) {
  const rounded = Math.round(hours * 10) / 10;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {phase}
      </p>
      <p className="mt-1 text-2xl font-semibold text-emerald-200">
        {rounded.toFixed(1)}h
      </p>
    </div>
  );
}

type IconProps = {
  className?: string;
};

function Lightning({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13 2a1 1 0 0 1 .894.553l.053.12 5 14a1 1 0 0 1-1.518 1.15l-.095-.08L13.38 13.5 11 22a1 1 0 0 1-1.894.447l-.053-.12-5-14A1 1 0 0 1 5.57 7.177l.095.08L10.62 10.5 12 3a1 1 0 0 1 .894-.777L13 2Z" />
    </svg>
  );
}

function Spinner({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={`animate-spin text-slate-900 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
      />
    </svg>
  );
}
