import { ArrowUpRight, Facebook, Instagram } from 'lucide-react';
import { TEAM_MEMBERS, type TeamMember } from '../data/salonData';
import { SalonImage } from './SalonImage';

interface TeamSectionProps {
  onBookWithStylist: (member: TeamMember) => void;
}

export function TeamSection({ onBookWithStylist }: TeamSectionProps) {
  return (
    <section
      id="team"
      className="w-full py-20 lg:py-28 bg-[var(--salon-surface)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 pb-12">
          <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
            04. Our Master Artists
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
            Meet the Specialists Behind Every Look
          </h2>
          <p className="text-[15px] text-[var(--salon-muted)] leading-relaxed">
            Seasoned bridal directors, precision hair colorists, and certified clinical skin
            therapists bringing over 35 combined years of luxury salon experience.
          </p>
        </div>

        {/* 4-Column Editorial Portrait Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {TEAM_MEMBERS.map((member) => {
            const firstName = member.name.split(' ')[0];
            return (
              <article
                key={member.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-[var(--salon-card)] border border-[var(--salon-border)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {/* Uniform 3:4 Portrait Frame (.jpg) */}
                <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--salon-surface)] border-b border-[var(--salon-border)]">
                  <SalonImage
                    src={member.image}
                    alt={member.imageAlt}
                    fallbackTitle={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-[var(--salon-accent)] tabular-nums">
                      {member.experience}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[var(--salon-text)] leading-tight">
                      {member.name}
                    </h3>
                    <div className="text-xs font-medium text-[var(--salon-secondary)]">
                      {member.role}
                    </div>
                    <div className="text-[11.5px] text-[var(--salon-muted)]">
                      {member.specialty}
                    </div>
                    <p className="pt-1 text-xs sm:text-[13px] leading-relaxed text-[var(--salon-muted)]">
                      {member.bio}
                    </p>
                  </div>

                  {/* Footer Actions & Social Links */}
                  <div className="pt-4 border-t border-[var(--salon-border)] flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 text-[var(--salon-muted)]">
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on Instagram`}
                        className="p-1.5 rounded-md hover:text-[var(--salon-accent)] transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                      {member.socials.facebook && (
                        <a
                          href={member.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on Facebook`}
                          className="p-1.5 rounded-md hover:text-[var(--salon-accent)] transition-colors"
                        >
                          <Facebook className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.tiktok && (
                        <a
                          href={member.socials.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on TikTok`}
                          className="px-1.5 py-1 text-[11px] font-semibold hover:text-[var(--salon-accent)] transition-colors"
                        >
                          TikTok
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onBookWithStylist(member)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--salon-text)] hover:text-[var(--salon-accent)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Book {firstName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
