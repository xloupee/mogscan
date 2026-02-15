import Link from "next/link";
import SiteBrand from "../components/site-brand";

const tierGlossary = [
  {
    title: "TERA CHAD",
    medal: "🥇",
    color: "Iridescent white / holographic glow",
    accent: "linear-gradient(135deg, #aef 0%, #fff 50%, #faff00 100%)",
    quote: "Meta-defining.",
    reputation: "Top 0.01% tier in looksmaxing culture. People argue whether anyone even qualifies. Final boss level.",
    traits: [
      "Extremely strong facial harmony",
      "Elite eye area + jawline combo",
      "Photogenic from most angles",
    ],
  },
  {
    title: "GIGA CHAD",
    medal: "🥈",
    color: "Royal Blue",
    accent: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    quote: "Genetic lottery winner.",
    reputation: "Rare but realistic. Most viral male models/influencers get labeled here.",
    traits: [
      "Very high facial symmetry",
      "Strong bone structure",
      "Wide appeal across audiences",
      "Looks impressive even candidly",
    ],
  },
  {
    title: "CHAD",
    medal: "🥉",
    color: "Crimson Red",
    accent: "linear-gradient(135deg, #cb2d3e 0%, #ef473a 100%)",
    quote: "Clearly above average.",
    reputation: "The classic good-looking guy. Still mogs most people in a room.",
    traits: [
      "Noticeably attractive",
      "Good proportions",
      "Solid jaw/eye area",
      "Benefits from grooming and style",
    ],
  },
  {
    title: "CHADLITE",
    medal: "🔹",
    color: "Deep Purple",
    accent: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
    quote: "High potential / situational Chad.",
    reputation: "Often called borderline Chad. Looksmaxing can push them higher.",
    traits: [
      "Can look Chad-tier with angles, lighting, or styling",
      "Above average but not dominant",
    ],
  },
  {
    title: "NORMIE",
    medal: "⚖️",
    color: "Green",
    accent: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    quote: "Average baseline.",
    reputation: "Most people fall here. Not bad, just not striking.",
    traits: [
      "No major strengths or flaws",
      "Blends into the crowd",
      "Normal proportions",
    ],
  },
  {
    title: "CHUD",
    medal: "📉",
    color: "Dull Brown / Gray",
    accent: "linear-gradient(135deg, #603813 0%, #b29f94 100%)",
    quote: "Below average in looksmax slang.",
    reputation: "Used half-seriously, half as an insult in forums. Still very subjective.",
    traits: [
      "Weak bone structure or harmony",
      "Poor proportions or presentation",
      "Low aesthetic impact",
    ],
  },
  {
    title: "GOBLIN CHAD",
    medal: "👹",
    color: "Dark Gray / Muddy Green",
    accent: "linear-gradient(135deg, #2c3e50 0%, #000000 100%)",
    quote: "Meme-tier unattractive.",
    reputation: "Very unconventional or distorted feature read.",
    traits: ["Lacks harmony or balance"],
  },
];

const termDefinitions = [
  {
    term: "Jester gooning",
    definition:
      "Someone acting foolish, overly down bad, or unserious online about attraction or thirst.",
  },
  {
    term: "Looksmaxing (lookmax)",
    definition:
      "Trying to improve physical attractiveness through grooming, fitness, style, skincare, and related habits.",
  },
  {
    term: "PSL (Physical Sexual/Lifestyle) rating",
    definition:
      "A 1-10 style attractiveness rating people use to score faces or bodies.",
  },
  {
    term: "SMV (Sexual Market Value)",
    definition:
      "Slang for perceived dating desirability based on looks, status, money, and social skills.",
  },
  {
    term: "Mog / Mogging",
    definition: "Outclassing someone in looks.",
  },
  {
    term: "Frame mog",
    definition:
      "Outclassing others due to height, shoulder width, bone structure, and posture.",
  },
  {
    term: "Canthal tilt",
    definition:
      "Angle of the eyes. Positive tilt (outer corner higher) is considered attractive in this community.",
  },
  {
    term: "Hunter eyes",
    definition: "Deep-set eyes with a strong brow ridge, often praised in looksmax spaces.",
  },
  {
    term: "Prey eyes",
    definition:
      "Rounder, more exposed eyes that are often labeled less attractive in these communities.",
  },
  {
    term: "Jawline maxxing",
    definition: "Trying to improve jaw definition via fat loss, posture, or grooming.",
  },
  {
    term: "Cheekbone maxxing",
    definition: "Enhancing cheekbone appearance through leanness, styling, or angles.",
  },
  {
    term: "Leanmaxxing",
    definition: "Lowering body fat to reveal facial structure.",
  },
  {
    term: "Gymmaxxing",
    definition: "Using weight training to improve attractiveness.",
  },
  {
    term: "Skinmaxxing",
    definition: "Improving skin through skincare routines.",
  },
  {
    term: "Hairmaxxing",
    definition: "Optimizing haircut, hair health, or hairline.",
  },
  {
    term: "Bone smashing",
    definition:
      "A fringe practice where people hit facial bones hoping to change structure.",
  },
  {
    term: "Mewing",
    definition: "A tongue-posture technique claimed to improve jawline appearance.",
  },
  {
    term: "Surgerymaxxing",
    definition: "Using cosmetic surgery to improve looks.",
  },
  {
    term: "Roidsmaxxing",
    definition: "Using steroids for physique enhancement.",
  },
  {
    term: "Foid",
    definition:
      "Short for 'female humanoid.' Mostly meme or edgy slang, but widely seen as derogatory.",
  },
  {
    term: "Stacy",
    definition:
      "Term for a very attractive woman who is stereotyped as dating only 'Chads.'",
  },
  {
    term: "Becky",
    definition:
      "Term for an average-looking woman, usually framed as below 'Stacy' tier.",
  },
  {
    term: "Femcel",
    definition:
      "Female equivalent of an incel (involuntarily celibate), sometimes used self-ironically online.",
  },
  {
    term: "Chad",
    definition: "Highly attractive, confident, and socially successful with women.",
  },
  {
    term: "Normie",
    definition: "An average person who is not deep into internet subcultures.",
  },
  {
    term: "Incel",
    definition:
      "'Involuntary celibate' - someone who feels unable to attract partners despite wanting to.",
  },
  {
    term: "Blackpill",
    definition:
      "Belief that looks determine almost everything in dating and that improvement is limited.",
  },
  {
    term: "Redpill",
    definition:
      "Belief focused on hidden truths about dating dynamics, self-improvement, and social behavior.",
  },
  {
    term: "Bluepill",
    definition:
      "Mainstream belief that personality and compatibility matter more than looks alone.",
  },
  {
    term: "Orbiting",
    definition:
      "Hanging around someone you like while hoping for a romantic chance.",
  },
  {
    term: "LDAR (Lay Down And Rot)",
    definition: "Giving up on self-improvement.",
  },
  {
    term: "Coping",
    definition:
      "Telling yourself comforting explanations to deal with insecurity or failure.",
  },
  {
    term: "Seething",
    definition: "Being secretly upset or jealous.",
  },
  {
    term: "Sub5 / Subhuman",
    definition: "Slang for someone rated below 5 in perceived attractiveness.",
  },
  {
    term: "High-tier normie (HTN)",
    definition: "Above average but not Chad-level.",
  },
  {
    term: "Halo effect",
    definition:
      "Psychological bias where attractive people are assumed to have better traits overall.",
  },
];

export default function FaqPage() {
  return (
    <>
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />

      <header className="topbar">
        <SiteBrand />

        <nav className="main-nav" aria-label="Primary">
          <Link href="/">Leaderboard</Link>
          <Link href="/news">News</Link>
          <Link href="/faq" className="active">
            FAQ
          </Link>
        </nav>
      </header>

      <main className="faq-page">
        <section className="faq-hero">
          <span className="faq-pill">Mogscan Docs</span>
          <h1>Frequently Asked Questions</h1>
          <p>Fast answers for teams using Mogscan to manage rankings and profile analysis.</p>

          <div className="faq-hero-actions">
            <Link className="faq-btn primary" href="/">
              Open Leaderboard
            </Link>
            <Link className="faq-btn" href="/news">
              Read News
            </Link>
          </div>

        </section>

        <section className="faq-shell">
          <aside className="faq-nav-card">
            <h2>Browse Sections</h2>
            <p>Jump to a topic:</p>
            <div className="faq-toc">
              <a href="#tier-glossary">Tier Glossary</a>
              <a href="#psl-definition">PSL Definition</a>
              <a href="#community-definitions">Community Definitions</a>
            </div>
          </aside>

          <div className="faq-main-card">
            <section id="tier-glossary" className="faq-tier-section" aria-label="Mog tier glossary">
              <h2>Mog Tier Glossary</h2>
              <p className="faq-tier-sub">
                Tier labels and shorthand used across Mogscan profile scoring.
              </p>

              <div className="faq-tier-grid">
                {tierGlossary.map((tier) => (
                  <article
                    key={tier.title}
                    className="faq-tier-card"
                    style={{ "--card-accent": tier.accent }}
                  >
                    <div className="tier-card-header">
                      <span className="tier-medal">{tier.medal}</span>
                      <h3>{tier.title}</h3>
                    </div>
                    
                    <div className="tier-card-body">
                      <div className="tier-meta">
                        <p><strong>Rep:</strong> {tier.reputation}</p>
                      </div>

                      <div className="tier-traits">
                        <strong>Traits:</strong>
                        <ul>
                          {tier.traits.map((trait) => (
                            <li key={trait}>{trait}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div id="psl-definition" className="faq-psl-note">
                <h3>PSL Definition</h3>
                <p>
                  PSL (Physical Sexual Look) score is a looksmaxing community term for rating perceived facial
                  attractiveness. It is shorthand for how visually appealing someone&apos;s face is based on traits
                  the community tends to value. On MogScan, PSL is used as a trend metric, not a scientific
                  measurement.
                </p>
              </div>
            </section>

            <section id="community-definitions" className="faq-tier-section" aria-label="Community definitions">
              <h2>Community Definitions</h2>
              <p className="faq-tier-sub">
                Common looksmaxing and internet slang used across profile ratings and discussions.
              </p>

              <div className="faq-term-grid">
                {termDefinitions.map((entry) => (
                  <article key={entry.term} className="faq-term-card">
                    <h3>{entry.term}</h3>
                    <p>{entry.definition}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
