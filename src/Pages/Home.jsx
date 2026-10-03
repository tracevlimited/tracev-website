import React from "react";
import { Link } from "react-router-dom";

/* =========================================================
   INLINE SVG ICONS
========================================================= */

const Icon = ({
  children,
  size = 20,
  className = "",
  strokeWidth = 1.8,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ArrowRight = ({ size = 18, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

const ArrowUpRight = ({ size = 18, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Icon>
);

const ShieldCheck = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
    <path d="m8.5 12 2.2 2.2 4.8-5" />
  </Icon>
);

const Wallet = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H19a1 1 0 0 1 1 1v2H7a3 3 0 0 0 0 6h13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6.5Z" />
    <path d="M20 7H7a3 3 0 0 0 0 6h13V7Z" />
    <path d="M16.5 10h.01" />
  </Icon>
);

const Zap = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
  </Icon>
);

const Globe2 = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z" />
  </Icon>
);

const CreditCard = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </Icon>
);

const Send = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m21 3-7.2 18-3.8-8L3 9l18-6Z" />
    <path d="M10 13 21 3" />
  </Icon>
);

const ReceiptText = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M5 3v18l3-2 4 2 4-2 3 2V3l-3 2-4-2-4 2-3-2Z" />
    <path d="M9 9h6" />
    <path d="M9 13h6" />
  </Icon>
);

const Building2 = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M16 9h2a2 2 0 0 1 2 2v10" />
    <path d="M2 21h20" />
    <path d="M8 7h4" />
    <path d="M8 11h4" />
    <path d="M8 15h4" />
    <path d="M9 21v-3h2v3" />
  </Icon>
);

const UserRound = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" />
  </Icon>
);

const LockKeyhole = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <rect x="5" y="10" width="14" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="15" r="1" />
    <path d="M12 16v2" />
  </Icon>
);

const CheckCircle2 = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.7 2.7L16 9.5" />
  </Icon>
);

const Sparkles = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
    <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" />
    <path d="m5 15-.6 1.9L2.5 17.5l1.9.6L5 20l.6-1.9 1.9-.6-1.9-.6L5 15Z" />
  </Icon>
);

const ChevronRight = ({ size = 16, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

/* =========================================================
   HOME
========================================================= */

function Home() {
  const personImage =
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1100&q=85";

  const businessImage =
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1100&q=85";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080511] text-white">
      {/* =====================================================
          CSS ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes tracevFloatSlow {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -14px, 0) scale(1.04);
          }
        }

        @keyframes tracevFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -10px, 0);
          }
        }

        @keyframes tracevFloatRight {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(2deg);
          }
          50% {
            transform: translate3d(5px, -10px, 0) rotate(4deg);
          }
        }

        @keyframes tracevFloatLeft {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-5deg);
          }
          50% {
            transform: translate3d(0, -14px, 0) rotate(-2deg);
          }
        }

        @keyframes tracevGlow {
          0%, 100% {
            opacity: .28;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: .5;
            transform: translate(-50%, -50%) scale(1.08);
          }
        }

        @keyframes tracevGlowSmall {
          0%, 100% {
            opacity: .2;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: .35;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        @keyframes tracevOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes tracevOrbitReverse {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes tracevPulse {
          0%, 100% {
            opacity: .5;
            transform: scale(.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes tracevHeroIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes tracevPersonIn {
          from {
            opacity: 0;
            transform: translate(-50%, 20px) scale(.95);
          }

          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }

        @keyframes tracevCardIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tracev-hero-in {
          animation: tracevHeroIn .75s cubic-bezier(.22, 1, .36, 1) both;
        }

        .tracev-hero-delay-1 {
          animation-delay: .1s;
        }

        .tracev-hero-delay-2 {
          animation-delay: .2s;
        }

        .tracev-hero-delay-3 {
          animation-delay: .3s;
        }

        .tracev-hero-delay-4 {
          animation-delay: .4s;
        }

        .tracev-glow {
          animation: tracevGlow 5s ease-in-out infinite;
        }

        .tracev-glow-small {
          animation: tracevGlowSmall 6s ease-in-out infinite;
        }

        .tracev-orbit {
          animation: tracevOrbit 24s linear infinite;
        }

        .tracev-orbit-reverse {
          animation: tracevOrbitReverse 30s linear infinite;
        }

        .tracev-pulse {
          animation: tracevPulse 2.2s ease-in-out infinite;
        }

        .tracev-float {
          animation: tracevFloat 4.5s ease-in-out infinite;
        }

        .tracev-float-slow {
          animation: tracevFloatSlow 5s ease-in-out infinite;
        }

        .tracev-float-left {
          animation: tracevFloatLeft 5s ease-in-out infinite;
        }

        .tracev-float-right {
          animation: tracevFloatRight 4.5s ease-in-out infinite;
        }

        .tracev-person {
          animation: tracevPersonIn 1s cubic-bezier(.22, 1, .36, 1) .15s both;
        }

        .tracev-card-in {
          animation: tracevCardIn .7s cubic-bezier(.22, 1, .36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .tracev-glow,
          .tracev-glow-small,
          .tracev-orbit,
          .tracev-orbit-reverse,
          .tracev-pulse,
          .tracev-float,
          .tracev-float-slow,
          .tracev-float-left,
          .tracev-float-right,
          .tracev-person,
          .tracev-card-in,
          .tracev-hero-in {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          GLOBAL BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="tracev-glow absolute left-[-12%] top-[5%] h-[520px] w-[520px] rounded-full bg-violet-700/20 blur-[130px]" />

        <div
          className="absolute right-[-10%] top-[10%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/15 blur-[150px]"
          style={{
            animation:
              "tracevGlow 7s ease-in-out infinite reverse",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.13),transparent_35%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <header className="relative z-50 border-b border-white/[0.06] bg-[#080511]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="group flex items-center gap-2">
            <div className="relative flex items-center">
              <span className="text-[25px] font-black tracking-[-0.06em] text-white">
                trace
              </span>

              <span className="text-[25px] font-black tracking-[-0.06em] text-violet-400">
                V
              </span>

              <span className="tracev-pulse absolute -right-1 -top-1 h-1.5 w-1.5 rounded-full bg-violet-400" />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-white"
            >
              Home
            </Link>

            <Link
              to="/business"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Business
            </Link>

            <Link
              to="/security"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Security
            </Link>

            <Link
              to="/pricing"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Pricing
            </Link>

            <Link
              to="/help"
              className="text-sm font-medium text-white/55 transition hover:text-white"
            >
              Help
            </Link>
          </nav>

          <Link
            to="/download"
            className="group inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)] transition hover:bg-violet-400"
          >
            Download App

            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
            {/* LEFT */}

            <div className="relative z-20 max-w-2xl">
              <div className="tracev-hero-in inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3.5 py-2 text-sm text-violet-200">
                <Sparkles size={15} className="text-violet-300" />

                Wallet & Payment Infrastructure
              </div>

              <h1 className="tracev-hero-in tracev-hero-delay-1 mt-7 text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
                More than a wallet.

                <span className="mt-2 block">
                  It&apos;s your{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                    financial infrastructure.
                  </span>
                </span>
              </h1>

              <p className="tracev-hero-in tracev-hero-delay-2 mt-7 max-w-xl text-base leading-7 text-white/55 sm:text-lg">
                traceV gives people and businesses the tools to hold,
                send, receive and manage money through secure digital
                wallets and modern payment infrastructure.
              </p>

              <div className="tracev-hero-in tracev-hero-delay-3 mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/download"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
                >
                  Get Started

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/business"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/40 hover:bg-violet-500/10"
                >
                  Explore for Business
                </Link>
              </div>

              <div className="tracev-hero-in tracev-hero-delay-4 mt-12 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Secure",
                  },
                  {
                    icon: Zap,
                    label: "Fast",
                  },
                  {
                    icon: Globe2,
                    label: "Connected",
                  },
                  {
                    icon: UserRound,
                    label: "For Everyone",
                  },
                ].map((item) => {
                  const IconComponent = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-2.5"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/10 text-violet-300">
                        <IconComponent size={15} />
                      </div>

                      <span className="text-xs font-medium text-white/55">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT VISUAL */}

            <div className="relative min-h-[570px] lg:min-h-[650px]">
              <div className="tracev-glow absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full bg-violet-600/30 blur-[110px]" />

              <div className="tracev-orbit absolute left-1/2 top-1/2 h-[480px] w-[480px] rounded-full border border-violet-400/10" />

              <div className="tracev-orbit-reverse absolute left-1/2 top-1/2 h-[570px] w-[570px] rounded-full border border-fuchsia-400/[0.07]" />

              {/* PERSON */}

              <div className="tracev-person absolute bottom-0 left-1/2 z-10 h-[500px] w-[360px] overflow-hidden rounded-[180px_180px_35px_35px] border border-white/10 bg-gradient-to-b from-violet-500/20 to-transparent shadow-[0_0_100px_rgba(124,58,237,0.25)] sm:h-[570px] sm:w-[410px]">
                <img
                  src={personImage}
                  alt="Person using traceV"
                  className="h-full w-full object-cover object-center grayscale-[15%]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0614] via-transparent to-violet-600/10" />
              </div>

              {/* WALLET CARD */}

              <div className="tracev-float-left absolute left-[2%] top-[25%] z-20 w-[190px] rounded-3xl border border-white/15 bg-[#171026]/90 p-5 shadow-2xl backdrop-blur-xl sm:left-[1%]">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/60">
                    traceV
                  </div>

                  <Wallet size={18} className="text-violet-300" />
                </div>

                <div className="mt-8 text-[11px] text-white/35">
                  Your Wallet
                </div>

                <div className="mt-1 text-lg font-semibold tracking-wide">
                  •••• ••••
                </div>

                <div className="mt-6 flex items-center justify-between text-[10px] text-white/40">
                  <span>Digital Wallet</span>
                  <span>Secure</span>
                </div>
              </div>

              {/* PAYMENT SUCCESS */}

              <div className="tracev-float-right absolute right-0 top-[18%] z-30 flex items-center gap-3 rounded-2xl border border-emerald-300/10 bg-[#171026]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 size={19} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Payment successful
                  </p>

                  <p className="mt-0.5 text-[10px] text-white/40">
                    Transaction completed securely
                  </p>
                </div>
              </div>

              {/* FLOATING PAYMENT */}

              <div className="tracev-float absolute bottom-[17%] right-[1%] z-30 w-[190px] rounded-2xl border border-violet-300/15 bg-[#171026]/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Send size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      Send money
                    </p>

                    <p className="mt-1 text-[10px] text-white/40">
                      Fast & secure transfers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTRO STRIP
      ====================================================== */}

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-3 lg:px-10">
          <div className="flex gap-4">
            <Wallet
              className="mt-1 shrink-0 text-violet-400"
              size={21}
            />

            <div>
              <h3 className="font-semibold">
                Digital wallets
              </h3>

              <p className="mt-1 text-sm leading-6 text-white/45">
                Simple wallet infrastructure for holding and moving
                money.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Zap
              className="mt-1 shrink-0 text-fuchsia-400"
              size={21}
            />

            <div>
              <h3 className="font-semibold">
                Payment infrastructure
              </h3>

              <p className="mt-1 text-sm leading-6 text-white/45">
                Tools designed to support modern payment experiences.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Globe2
              className="mt-1 shrink-0 text-violet-300"
              size={21}
            />

            <div>
              <h3 className="font-semibold">
                Built to connect
              </h3>

              <p className="mt-1 text-sm leading-6 text-white/45">
                Designed for people, businesses and digital payment
                products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY TRACEV
      ====================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles size={13} />
              Why traceV
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Everything you need to{" "}
              <span className="text-violet-300">
                move money.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/45">
              From everyday payments to business payment
              experiences, traceV brings wallets and payment
              capabilities together in one connected platform.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wallet,
                title: "Digital Wallet",
                text: "Give users a simple place to hold, manage and move money.",
              },
              {
                icon: Send,
                title: "Payments",
                text: "Create smooth payment and transfer experiences around your product.",
              },
              {
                icon: ShieldCheck,
                title: "Security",
                text: "Build financial experiences with security at the center.",
              },
              {
                icon: Globe2,
                title: "Connected",
                text: "Designed to work across modern financial and payment journeys.",
              },
            ].map((feature, index) => {
              const FeatureIcon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-2 hover:border-violet-400/20 hover:bg-violet-500/[0.045]"
                  style={{
                    animation: `tracevCardIn .7s cubic-bezier(.22,1,.36,1) ${
                      index * 100
                    }ms both`,
                  }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/10 text-violet-300 transition group-hover:scale-105">
                    <FeatureIcon size={21} />
                  </div>

                  <h3 className="mt-7 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {feature.text}
                  </p>

                  <div className="mt-7 flex items-center gap-1 text-xs font-medium text-violet-300 opacity-0 transition group-hover:opacity-100">
                    Learn more
                    <ChevronRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          BUSINESS SECTION
      ====================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
          <div className="overflow-hidden rounded-[34px] border border-white/[0.07] bg-gradient-to-br from-violet-950/70 via-[#130a24] to-[#0b0714]">
            <div className="grid lg:grid-cols-2">
              {/* IMAGE */}

              <div className="relative min-h-[400px] overflow-hidden lg:min-h-[600px]">
                <img
                  src={businessImage}
                  alt="Business team using digital payment technology"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#11091e]/20 to-[#11091e]" />

                <div className="absolute inset-0 bg-violet-950/25 mix-blend-multiply" />

                <div className="tracev-float absolute bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#11091e]/80 text-violet-300 shadow-2xl backdrop-blur-xl">
                  <Building2 size={23} />
                </div>
              </div>

              {/* CONTENT */}

              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                  <Building2 size={13} />
                  For businesses
                </div>

                <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Build your payment experience on{" "}
                  <span className="text-violet-300">
                    traceV.
                  </span>
                </h2>

                <p className="mt-6 text-base leading-7 text-white/45">
                  Whether you are building a marketplace, digital
                  service, community or financial product, traceV
                  provides the wallet and payment building blocks to
                  create a better money experience.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Wallet infrastructure",
                    "Payment and transfer experiences",
                    "Customer payment pages",
                    "Built for growing digital businesses",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-violet-300"
                      />

                      {item}
                    </div>
                  ))}
                </div>

                <Link
                  to="/business"
                  className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
                >
                  Explore traceV for Business

                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PAYMENT EXPERIENCE
      ====================================================== */}

      <section className="relative z-10 border-y border-white/[0.05] bg-[#0b0613]">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* TEXT */}

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/[0.07] px-3 py-1.5 text-xs font-medium text-fuchsia-300">
                <CreditCard size={13} />
                Modern payments
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Payments should feel{" "}
                <span className="text-fuchsia-300">
                  effortless.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
                traceV is designed around the way people actually
                move money: send it, receive it, pay for something,
                manage it and keep everything in one place.
              </p>

              <div className="mt-9 space-y-5">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <LockKeyhole size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Security at the center
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/40">
                      Designed with secure financial interactions in
                      mind.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
                    <ReceiptText size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Clear payment experiences
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-white/40">
                      Make every payment journey simple and
                      understandable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* PAYMENT UI */}

            <div className="relative min-h-[460px]">
              <div className="tracev-float-slow absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-violet-300/15 bg-[#171026] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] sm:w-[350px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/35">
                      traceV Wallet
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      Your wallet
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                    <Wallet size={17} />
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/70">
                      Available balance
                    </span>

                    <span className="text-[10px] text-white/50">
                      NGN
                    </span>
                  </div>

                  <div className="mt-3 text-2xl font-semibold tracking-tight">
                    ••••••••
                  </div>

                  <div className="mt-8 flex items-center justify-between text-[10px] text-white/60">
                    <span>traceV</span>
                    <span>••••</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: Send,
                      label: "Send",
                    },
                    {
                      icon: ArrowUpRight,
                      label: "Receive",
                    },
                    {
                      icon: CreditCard,
                      label: "Pay",
                    },
                  ].map((action) => {
                    const ActionIcon = action.icon;

                    return (
                      <div
                        key={action.label}
                        className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.04] py-3"
                      >
                        <ActionIcon
                          size={16}
                          className="text-violet-300"
                        />

                        <span className="text-[10px] text-white/40">
                          {action.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">
                      Recent activity
                    </span>

                    <span className="text-[10px] text-violet-300">
                      View all
                    </span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                          <ArrowUpRight size={14} />
                        </div>

                        <div>
                          <p className="text-[11px] font-medium">
                            Payment
                          </p>

                          <p className="text-[9px] text-white/30">
                            Completed
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-white/40">
                        ••••
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                          <Send size={14} />
                        </div>

                        <div>
                          <p className="text-[11px] font-medium">
                            Transfer
                          </p>

                          <p className="text-[9px] text-white/30">
                            Completed
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-white/40">
                        ••••
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECURITY CARD */}

              <div className="tracev-float absolute right-[1%] top-[10%] rounded-2xl border border-white/10 bg-[#171026]/90 p-4 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Secure
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Protected payment
                    </p>
                  </div>
                </div>
              </div>

              {/* FAST PAYMENT CARD */}

              <div className="tracev-float absolute bottom-[12%] left-[0%] flex items-center gap-3 rounded-2xl border border-violet-400/15 bg-[#171026]/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                  <Zap size={17} />
                </div>

                <div>
                  <p className="text-xs font-semibold">
                    Fast payments
                  </p>

                  <p className="mt-1 text-[10px] text-white/35">
                    Built for modern money movement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative z-10 px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-violet-400/15 bg-gradient-to-br from-violet-900/40 via-[#180b2c] to-[#0d0717] px-7 py-16 text-center sm:px-12">
          <div className="tracev-glow-small pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] rounded-full bg-violet-500/25 blur-[100px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-300">
              <Sparkles size={20} />
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              The future of payments starts with{" "}
              <span className="text-violet-300">
                better infrastructure.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
              Whether you are moving money personally or building the
              next payment experience for your customers, traceV gives
              you the foundation to get started.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/download"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
              >
                Get Started

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/business"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/30 hover:bg-violet-500/10"
              >
                For Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-sm">
              <Link
                to="/"
                className="text-2xl font-black tracking-[-0.06em]"
              >
                trace
                <span className="text-violet-400">V</span>
              </Link>

              <p className="mt-4 text-sm leading-6 text-white/35">
                Wallet and payment infrastructure for modern financial
                experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                  Product
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/business"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Business
                  </Link>

                  <Link
                    to="/pricing"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Pricing
                  </Link>

                  <Link
                    to="/download"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Download
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                  Company
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/about"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    About
                  </Link>

                  <Link
                    to="/security"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Security
                  </Link>

                  <Link
                    to="/contact"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/30">
                  Support
                </p>

                <div className="mt-4 space-y-3">
                  <Link
                    to="/help"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Help Center
                  </Link>

                  <Link
                    to="/privacy"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Privacy
                  </Link>

                  <Link
                    to="/terms"
                    className="block text-sm text-white/50 transition hover:text-white"
                  >
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-xs text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} traceV. All rights reserved.
            </p>

            <p>Wallets. Payments. Infrastructure.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default Home;