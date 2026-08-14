import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Flame, Quote as QuoteIcon, RefreshCw, Sparkles } from "lucide-react";

import { OWNER_NAME, QUOTES, QUOTE_TAGS, quoteOfTheDay, randomQuote, type Quote, type QuoteTag } from "@/lib/quotes";
import { PageHeader, Pill, Section } from "@/components/jee/ui";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/coach")({
  component: CoachPage,
  head: () => ({
    meta: [
      { title: "Coach · JEE Command Center" },
      {
        name: "description",
        content: "Daily motivation, mindset fuel and a library of quotes to keep your JEE prep on track.",
      },
      { property: "og:title", content: "Coach · JEE Command Center" },
      { property: "og:description", content: "Daily motivation and mindset fuel for JEE preparation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function CoachPage() {
  const daily = useMemo(() => quoteOfTheDay(), []);
  const [spark, setSpark] = useState<Quote>(() => randomQuote(daily.text));
  const [filter, setFilter] = useState<QuoteTag | "All">("All");

  const list = filter === "All" ? QUOTES : QUOTES.filter((q) => q.tag === filter);

  return (
    <>
      <PageHeader
        title="Coach"
        subtitle={`Mindset fuel for ${OWNER_NAME} — read one, then get back to work.`}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-card/60 to-accent/10 p-6">
          <QuoteIcon className="absolute -right-4 -top-4 size-28 text-primary/10" />
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
            <Flame className="size-3.5" /> Quote of the day
          </div>
          <p className="mt-4 font-display text-xl font-bold leading-snug text-foreground sm:text-2xl">
            “{daily.text}”
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            — {daily.author} <Pill tone="gold">{daily.tag}</Pill>
          </div>
        </div>

        <Section>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            <Sparkles className="size-3.5" /> Instant spark
          </div>
          <p className="mt-4 font-display text-lg font-semibold leading-snug text-foreground">
            “{spark.text}”
          </p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            — {spark.author} <Pill tone="teal">{spark.tag}</Pill>
          </div>
          <Button className="mt-5" variant="secondary" onClick={() => setSpark(randomQuote(spark.text))}>
            <RefreshCw className="mr-1.5 size-4" /> Another one
          </Button>
        </Section>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {(["All", ...QUOTE_TAGS] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(tag as QuoteTag | "All")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === tag
                ? "border-accent bg-accent/15 text-accent"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((q) => (
          <div
            key={q.text}
            className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
          >
            <p className="text-sm leading-relaxed text-foreground">“{q.text}”</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="text-xs text-muted-foreground">— {q.author}</span>
              <Pill>{q.tag}</Pill>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        Built for {OWNER_NAME} · {QUOTES.length} quotes and counting
      </p>
    </>
  );
}
