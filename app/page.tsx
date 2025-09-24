"use client";

import type { MotionProps } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Megaphone,
  Server,
  Shield,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { label: "Members", value: "2,480" },
  { label: "Community Rating", value: "4.8 / 5" },
  { label: "Active Sessions", value: "187" },
];

const features = [
  {
    title: "Quest Tracking",
    body: "Track Roblox event quests in one dashboard with live Discord alerts and custom goals.",
    icon: Sparkles,
  },
  {
    title: "Community Profiles",
    body: "Showcase member stats, badges, and sync Roblox roles directly to the hub.",
    icon: Users,
  },
  {
    title: "Secure Access",
    body: "Discord authentication, role-based access, and audit logging keep everything locked in.",
    icon: Shield,
  },
];

const discordHighlights = [
  {
    title: "Live Role Sync",
    body: "Automatically grant and revoke roles based on purchases and quest progress.",
    icon: Server,
  },
  {
    title: "Real-Time Signals",
    body: "Broadcast announcements to both the site and the Discord server in seconds.",
    icon: Megaphone,
  },
  {
    title: "Bot Intelligence",
    body: "Let the companion bot collect activity, store metrics, and trigger workflows.",
    icon: Bot,
  },
];

const dashboardShowcase = [
  {
    title: "Member Dashboard",
    body: "Players review recent drops, track progress, and customize their widgets.",
  },
  {
    title: "Admin Control",
    body: "Team members edit content, moderate users, and trigger Discord broadcasts.",
  },
  {
    title: "Insight Stream",
    body: "Analytics surface top performers, retention curves, and shop conversions.",
  },
];

const shopProducts = [
  {
    title: "Starter Crate",
    description: "Unlock a weekly quest pack, bonus cosmetics, and Discord perks.",
    price: "$4.99",
  },
  {
    title: "Creator Bundle",
    description: "Boost your squad with exclusive builds, templates, and role rewards.",
    price: "$14.99",
  },
  {
    title: "Season Pass",
    description: "Get premium track access, limited skins, and early event invites.",
    price: "$24.99",
  },
];

const testimonials = [
  {
    quote: "The dashboard made managing our Roblox community effortless—everything syncs instantly.",
    name: "Alex R.",
    role: "Community Lead",
  },
  {
    quote: "We finally have a hub that looks as good as it feels. Members love the animated UI.",
    name: "Jordan P.",
    role: "Design Partner",
  },
  {
    quote: "Linking the Discord bot let us automate member perks the same day we launched.",
    name: "Sierra K.",
    role: "Automation Lead",
  },
];

const roadmap = [
  {
    title: "Shop Launch",
    body: "Finalize product catalog, Stripe flows, and reward automation for purchases.",
    accent: "Soon",
  },
  {
    title: "Bot Enhancements",
    body: "Add custom commands, leaderboard export, and onboarding drip campaigns.",
    accent: "Planned",
  },
  {
    title: "Mobile Companion",
    body: "Craft a mobile-first view so players can manage progress on the go.",
    accent: "Exploring",
  },
];

const resources = [
  { label: "Support", value: "support@stellarforge.gg", href: "mailto:support@stellarforge.gg" },
  { label: "Terms", value: "View Terms", href: "#contact" },
  { label: "Privacy", value: "Privacy Policy", href: "#contact" },
];

const easingCurve = [0.21, 0.47, 0.32, 0.98] as const;

const sectionMotion: MotionProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: easingCurve },
};

const SITE_NAME = "StellarForge";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(5,6,8,0.78)] backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
          <Link href="#hero" className="flex items-center gap-3">
        <Image
              src="/placeholder-logo.svg"
              alt={`${SITE_NAME} logo`}
              width={40}
              height={40}
              className="h-10 w-10"
          priority
        />
            <span className="text-lg font-semibold tracking-wide">{SITE_NAME}</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-white/75 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/api/auth/signin"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-primary)] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[rgba(92,108,253,0.4)] transition duration-200 hover:bg-[var(--accent-secondary)]"
            >
              Join via Discord
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <motion.section
          id="hero"
          {...sectionMotion}
          className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-24 md:flex-row md:items-center md:py-32"
        >
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Live Beta Access
            </span>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Unlock the Roblox hub built for high-energy crews.
            </h1>
            <p className="text-base text-white/75 md:text-lg">
              Build a polished command center that syncs your Discord community, shop perks, and live analytics in one place.
            </p>
            <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row md:justify-start">
              <Link
                href="/api/auth/signin"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent-secondary)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[rgba(168,85,247,0.4)] transition duration-200 hover:bg-[var(--accent-primary)]"
              >
                Launch Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/80 transition duration-200 hover:border-white/40 hover:text-white"
              >
                Explore Features
              </Link>
            </div>
            <div className="grid gap-6 pt-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left shadow-inner shadow-black/20 backdrop-blur"
                >
                  <div className="text-xs uppercase tracking-[0.35em] text-white/60">
                    {stat.label}
                  </div>
                  <div className="mt-2 text-2xl font-semibold">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          <motion.div
            className="relative w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(10,12,30,0.55)] backdrop-blur"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: easingCurve }}
          >
            <div className="absolute inset-x-6 top-6 h-44 rounded-[24px] bg-[radial-gradient(circle_at_10%_10%,rgba(92,108,253,0.4),transparent_55%),radial-gradient(circle_at_90%_20%,rgba(168,85,247,0.35),transparent_40%)] blur-3xl" />
            <div className="relative z-10 space-y-6">
            <Image
                src="/placeholder-hero.svg"
                alt="Dashboard preview"
                width={512}
                height={512}
                className="w-full rounded-3xl border border-white/10 object-cover"
                priority
              />
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="flex items-center justify-between text-xs font-medium text-white/70">
                  <span>Sync Status</span>
                  <span className="inline-flex items-center gap-1 text-green-300">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    Online
                  </span>
                </div>
                <div className="mt-3 grid gap-3 text-sm text-white/65">
                  <div className="flex justify-between">
                    <span>Latest quest updated</span>
                    <span>16s ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Role sync queue</span>
                    <span>4 pending</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shop fulfillment</span>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          id="features"
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">
              Features
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Tools tailored for high-energy Roblox teams.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Manage events, rewards, and Discord sync with a single control center—optimized for younger audiences and competitive squads.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_18px_45px_rgba(12,14,30,0.45)] backdrop-blur transition duration-200 hover:border-white/25"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25, ease: easingCurve }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(92,108,253,0.18)] text-[var(--accent-tertiary)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm text-white/70">{feature.body}</p>
                  <Link
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tertiary)] hover:text-white"
                  >
                    Talk with us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                Discord Link
              </span>
              <h2 className="text-3xl font-semibold md:text-4xl">
                Keep Discord and the hub perfectly in sync.
              </h2>
              <p className="text-sm text-white/70 md:text-base">
                Roles, alerts, and analytics all flow through a single bridge, so your Roblox players stay engaged wherever they are.
              </p>
              <div className="mt-8 grid gap-4">
                {discordHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(49,198,255,0.18)] text-[var(--accent-tertiary)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="text-base font-semibold text-white">{item.title}</div>
                        <p className="mt-1">{item.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <motion.div
              className="space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(10,12,30,0.5)] backdrop-blur"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.15, ease: easingCurve }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60">
                  <span>Discord Insights</span>
                  <span className="inline-flex items-center gap-1 text-green-300">
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                    Live
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Online players</span>
                    <span>482</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quest completions</span>
                    <span>76 today</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Discord joins</span>
                    <span>12</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
                <div className="text-xs uppercase tracking-[0.3em] text-white/60">Alerts</div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    Quest &quot;Crystal Rush&quot; completes in 2h. Reward reminder sent.
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                    Shop restock scheduled for 6PM. Roles will update automatically.
                  </div>
                </div>
                <Link
                  href="/api/discord/webhook"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tertiary)] hover:text-white"
                >
                  View webhook status
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          id="dashboard"
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">
              Dashboard
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Control every piece from one immersive dashboard.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Members and admins get tailored views with quick actions, analytics, and moderation tools you can grow into.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {dashboardShowcase.map((card) => (
              <motion.div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_18px_45px_rgba(12,14,30,0.45)] backdrop-blur"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: easingCurve }}
              >
                <div className="text-sm uppercase tracking-[0.3em] text-white/60">Snapshot</div>
                <h3 className="mt-3 text-lg font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-sm text-white/70">{card.body}</p>
                <Link
                  href="#dashboard"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tertiary)] hover:text-white"
                >
                  View preview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          id="shop"
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="flex flex-col gap-4 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">
              Shop
            </span>
            <h2 className="text-3xl font-semibold md:text-4xl">Power up your community store.</h2>
            <p className="mx-auto max-w-2xl text-sm text-white/70 md:text-base">
              Launch a digital shop that rewards members instantly—link Discord roles, Roblox perks, and real-time fulfillment flows.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {shopProducts.map((product) => (
              <motion.div
                key={product.title}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_18px_45px_rgba(12,14,30,0.45)] backdrop-blur"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: easingCurve }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(168,85,247,0.2)] text-[var(--accent-secondary)]">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{product.title}</h3>
                <p className="mt-3 text-sm text-white/70">{product.description}
                </p>
                <div className="mt-auto pt-6 text-lg font-semibold text-white">{product.price}</div>
                <Link
                  href="#shop"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tertiary)] hover:text-white"
                >
                  View details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 text-sm text-white/70">
            <span>Secure checkout powered by Stripe. Instant Discord role delivery.</span>
            <Link
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 font-semibold text-white transition duration-200 hover:border-white/40"
            >
              Enter the shop
              <Target className="h-4 w-4" />
            </Link>
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-[0.4em] text-white/60">
                Roadmap
              </span>
              <h2 className="text-3xl font-semibold md:text-4xl">What’s shipping next.</h2>
              <p className="text-sm text-white/70 md:text-base">
                We’re building a future-proof hub with a focus on a polished experience for Roblox communities and staff teams.
              </p>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70">
                <div className="flex items-center gap-3 text-white">
                  <Star className="h-5 w-5 text-[var(--accent-tertiary)]" />
                  <span className="text-base font-semibold">Community First</span>
                </div>
                <p className="mt-3">
                  Everything we ship is reviewed with creators and players—expect clear tutorials, quick support, and playful touches.
                </p>
                <Link
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-tertiary)] hover:text-white"
                >
                  Stay informed
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {roadmap.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70"
                >
                  <div>
                    <div className="text-base font-semibold text-white">{item.title}</div>
                    <p className="mt-2">{item.body}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                    {item.accent}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          className="mx-auto w-full max-w-6xl px-6 py-24"
        >
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">
              Voices
            </span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Teams that already love the flow.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/70 md:text-base">
              Early partners are using StellarForge to organize Roblox experiences, automate perks, and keep younger audiences engaged.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <motion.div
                key={item.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_18px_45px_rgba(12,14,30,0.45)] backdrop-blur"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: easingCurve }}
              >
                <p className="text-sm text-white/80">“{item.quote}”</p>
                <div className="mt-6 text-xs uppercase tracking-[0.3em] text-white/60">{item.role}</div>
                <div className="mt-2 text-sm font-semibold text-white">{item.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...sectionMotion}
          id="contact"
          className="mx-auto w-full max-w-6xl px-6 pb-28"
        >
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(92,108,253,0.22),rgba(168,85,247,0.22))] p-10 text-center shadow-[0_30px_80px_rgba(12,14,30,0.55)] backdrop-blur">
            <h2 className="text-3xl font-semibold md:text-4xl">Ready to build your hub?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-base">
              Tell us about your Roblox crew, and we’ll walk through the launch plan, Discord setup, and shop workflow.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="mailto:hello@stellarforge.gg"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-slate-200"
              >
                Message the team
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="https://discord.com/oauth2/authorize"
            target="_blank"
            rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 transition duration-200 hover:border-white/70 hover:text-white"
          >
                Join the Discord
              </Link>
            </div>
        </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-black/40">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <span className="text-lg font-semibold text-white">{SITE_NAME}</span>
              <p className="text-sm text-white/65">
                A playful control center linking Roblox experiences to Discord communities with shop automation.
              </p>
              <Link
                href="https://github.com/BareMelon"
          target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition duration-200 hover:text-white"
              >
                GitHub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-3 text-sm text-white/65">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Resources
              </div>
              {resources.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex justify-between hover:text-white"
                >
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </Link>
              ))}
            </div>
            <div className="space-y-3 text-sm text-white/65">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Contact
              </div>
              <p>Email: hello@stellarforge.gg</p>
              <p>Discord: @StellarForgeBot</p>
            </div>
            <div className="space-y-3 text-sm text-white/65">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                Status
              </div>
              <p>Systems online • Latency 42ms</p>
              <p>Updated 10 minutes ago</p>
            </div>
          </div>
          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
            <span>© {new Date().getFullYear()} {SITE_NAME} · All rights reserved.</span>
            <span>Built for Roblox creators and their communities.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
