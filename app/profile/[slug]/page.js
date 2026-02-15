import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatScore, initials, tier } from "../../lib/leaderboard";
import { getProfileBySlug } from "../../lib/profiles-store";

function getTraitCategory(text) {
  const value = text.toLowerCase();

  if (/(canthal|scleral|eye|iris|eyelid|spacing)/.test(value)) return "eyes";
  if (/(gonial|jaw|chin|cheekbone|mandible|midface|thirds|symmetry|soft tissue|leanness)/.test(value)) {
    return "structure";
  }
  if (/(bridge|tip|nose|philtrum|lip|cupid)/.test(value)) return "nose";
  if (/(skin|tone|clarity|texture)/.test(value)) return "skin";
  if (/(hair|hairline|curl|style|density)/.test(value)) return "hair";
  return "general";
}

function categoryLabel(category) {
  if (category === "eyes") return "Eyes";
  if (category === "structure") return "Structure";
  if (category === "nose") return "Nose/Lips";
  if (category === "skin") return "Skin";
  if (category === "hair") return "Hair";
  return "General";
}

const CATEGORY_ORDER = ["eyes", "structure", "nose", "skin", "hair", "general"];

export const dynamic = "force-dynamic";

export default async function ProfilePage({ params }) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);

  if (!profile) {
    notFound();
  }

  const losses = Math.max(profile.total - profile.elite, 0);
  const traitCount = profile.traits.length;
  const parsedTraits = profile.traits.map((trait, index) => {
    const separator = trait.indexOf(":");
    const hasLabel = separator > 0;
    const label = hasLabel ? trait.slice(0, separator).trim() : null;
    const value = hasLabel ? trait.slice(separator + 1).trim() : trait;
    const category = getTraitCategory(label || value);

    return {
      id: `${profile.slug}-${index}-${trait}`,
      index,
      label,
      value,
      category,
    };
  });

  const groupedTraits = CATEGORY_ORDER.map((category) => ({
    category,
    label: categoryLabel(category),
    items: parsedTraits.filter((trait) => trait.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="profile-page">
      <div className="profile-shell">
        <Link className="back-link" href="/">
          ← Back to leaderboard
        </Link>

        <header className="profile-hero">
          <div className="profile-identity">
            <div className="profile-avatar">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={`${profile.name} avatar`}
                  fill
                  sizes="72px"
                  className="avatar-img"
                />
              ) : (
                initials(profile.name)
              )}
            </div>
            <div className="profile-title">
              <h1>{profile.name}</h1>
              <p>{profile.handle}</p>
            </div>
          </div>
          <div className="profile-score-card">
            <span>Overall Score</span>
            <strong>{profile.score.toFixed(1)}</strong>
            <em>{profile.rankLabel || tier(profile.score)}</em>
          </div>
        </header>

        <section className="profile-grid">
          <div className="profile-stats">
            <article className="stat-card">
              <span>Score</span>
              <strong>{formatScore(profile.score, profile.rankLabel, profile.slug)}</strong>
            </article>
            <article className="stat-card">
              <span>Tier</span>
              <strong>{profile.rankLabel || tier(profile.score)}</strong>
            </article>
            <article className="stat-card">
              <span>Positive / Negative</span>
              <strong>
                {profile.elite} / {losses}
              </strong>
            </article>
          </div>

          <section className="trait-sheet">
            <header className="trait-head">
              <h2>Trait Breakdown</h2>
              <span>{traitCount} traits</span>
            </header>
            <div className="trait-groups">
              {groupedTraits.map((group) => (
                <section key={group.category} className={`trait-group trait-${group.category}`}>
                  <header className="trait-group-head">
                    <h3>{group.label}</h3>
                    <span>{group.items.length}</span>
                  </header>

                  <div className="trait-grid">
                    {group.items.map((trait) => (
                      <article key={trait.id} className={`detail-chip trait-${group.category}`}>
                        <div className="trait-chip-head">
                          <span className="trait-chip-index">{String(trait.index + 1).padStart(2, "0")}</span>
                          {trait.label ? <h4 className="trait-chip-label">{trait.label}</h4> : null}
                        </div>
                        <p className="trait-chip-value">{trait.value}</p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
