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

const DownloadIcon = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M12 3v11" />
    <path d="m7 10 5 5 5-5" />
    <path d="M5 20h14" />
  </Icon>
);

const Smartphone = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10 5h4" />
    <path d="M11.5 18.5h1" />
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

const CheckCircle = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.7 2.7L16 9.5" />
  </Icon>
);

const Sparkles = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
    <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" />
    <path d="m5 15-.6 1.9L2.5 17.5l1.9.6L5 20l.6-1.9 1.9-.6L5 15Z" />
  </Icon>
);

const ChevronRight = ({ size = 16, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

/* =========================================================
   GOOGLE PLAY ICON
========================================================= */

const GooglePlayIcon = ({ size = 28, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="#00D66F"
      d="M5.4 4.8C4.5 5.7 4 7.1 4 8.9v30.2c0 1.8.5 3.2 1.4 4.1L25.1 24 5.4 4.8Z"
    />
    <path
      fill="#FFD500"
      d="m31.8 30.7-6.7-6.6L5.4 43.2c1 .9 2.5 1 4 .2l22.4-12.7Z"
    />
    <path
      fill="#FF3D5A"
      d="M39.5 20.9 31.7 16.5 25.1 23l6.7 6.7 7.8-4.4c2.2-1.3 2.2-3.2-.1-4.4Z"
    />
    <path
      fill="#00B7FF"
      d="M9.4 4.6c-1.5-.8-3-.7-4 .2l19.7 18.8 6.6-6.6L9.4 4.6Z"
    />
  </svg>
);

/* =========================================================
   DOWNLOAD PAGE
========================================================= */

function Download() {
  /*
   * Replace this with your real Google Play Store URL.
   */
  const googlePlayUrl =
    "https://play.google.com/store/apps/";

  const appImage =
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=85";

  return (
    <main className="min-h-screen overflow-hidden bg-[#080511] text-white">
      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes downloadGlow {
          0%, 100% {
            opacity: .2;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: .4;
            transform: translate(-50%, -50%) scale(1.12);
          }
        }

        @keyframes downloadFloat {
          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes downloadFloatSmall {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }

        @keyframes downloadIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes downloadPhone {
          from {
            opacity: 0;
            transform: translateY(30px) rotate(2deg) scale(.95);
          }

          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        @keyframes downloadPulse {
          0%, 100% {
            opacity: .45;
            transform: scale(.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        .download-in {
          animation: downloadIn .75s cubic-bezier(.22, 1, .36, 1) both;
        }

        .download-delay-1 {
          animation-delay: .1s;
        }

        .download-delay-2 {
          animation-delay: .2s;
        }

        .download-delay-3 {
          animation-delay: .3s;
        }

        .download-delay-4 {
          animation-delay: .4s;
        }

        .download-glow {
          animation: downloadGlow 6s ease-in-out infinite;
        }

        .download-float {
          animation: downloadFloat 5s ease-in-out infinite;
        }

        .download-float-small {
          animation: downloadFloatSmall 4.5s ease-in-out infinite;
        }

        .download-phone {
          animation: downloadPhone 1s cubic-bezier(.22, 1, .36, 1) .15s both;
        }

        .download-pulse {
          animation: downloadPulse 2.3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .download-in,
          .download-glow,
          .download-float,
          .download-float-small,
          .download-phone,
          .download-pulse {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="download-glow absolute left-[25%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-700/20 blur-[130px]" />

        <div
          className="absolute right-[-10%] top-[35%] h-[500px] w-[500px] rounded-full bg-fuchsia-600/10 blur-[150px]"
          style={{
            animation:
              "downloadGlow 8s ease-in-out infinite reverse",
          }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_38%)]" />

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
          <Link
            to="/"
            className="group flex items-center gap-1 text-[25px] font-black tracking-[-0.06em]"
          >
            trace
            <span className="text-violet-400">V</span>

            <span className="download-pulse ml-0.5 mt-[-16px] h-1.5 w-1.5 rounded-full bg-violet-400" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-white/55 transition hover:text-white"
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
            className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,0.25)]"
          >
            Download App
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-24">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_.85fr] lg:gap-10">
            {/* LEFT */}

            <div className="relative z-20 max-w-2xl">
              <div className="download-in inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3.5 py-2 text-sm text-violet-200">
                <DownloadIcon size={15} />
                Download traceV
              </div>

              <h1 className="download-in download-delay-1 mt-7 text-5xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl lg:text-[72px]">
                Your money,
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                  in your hands.
                </span>
              </h1>

              <p className="download-in download-delay-2 mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
                Download the traceV app and experience a simpler way
                to manage your digital wallet, payments and everyday
                money movement.
              </p>

              {/* GOOGLE PLAY BUTTON */}

              <div className="download-in download-delay-3 mt-9">
                <a
                  href={googlePlayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl transition hover:border-violet-400/30 hover:bg-white/[0.09]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                    <GooglePlayIcon size={28} />
                  </div>

                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">
                      Get it on
                    </p>

                    <p className="mt-0.5 text-lg font-semibold text-white">
                      Google Play
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="ml-3 text-white/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                  />
                </a>
              </div>

              <div className="download-in download-delay-4 mt-8 flex flex-wrap gap-x-7 gap-y-3">
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <ShieldCheck
                    size={15}
                    className="text-violet-300"
                  />
                  Secure
                </div>

                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Zap
                    size={15}
                    className="text-fuchsia-300"
                  />
                  Fast
                </div>

                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Smartphone
                    size={15}
                    className="text-violet-300"
                  />
                  Android
                </div>
              </div>
            </div>

            {/* RIGHT PHONE */}

            <div className="relative mx-auto min-h-[580px] w-full max-w-[510px]">
              <div className="download-glow absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/30 blur-[110px]" />

              {/* Phone */}

              <div className="download-phone absolute left-1/2 top-1/2 z-10 h-[560px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[42px] border-[7px] border-[#292038] bg-[#100a1b] p-2 shadow-[0_40px_100px_rgba(0,0,0,.55)]">
                <div className="relative h-full overflow-hidden rounded-[32px] bg-[#0b0713]">
                  {/* Phone top */}

                  <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

                  {/* App screen */}

                  <div className="h-full bg-gradient-to-b from-[#211038] via-[#12091e] to-[#0b0713] px-5 pt-12">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-white/35">
                          Welcome back
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          traceV
                        </p>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                        <Wallet size={14} />
                      </div>
                    </div>

                    {/* Balance */}

                    <div className="mt-7 rounded-[22px] border border-violet-300/10 bg-gradient-to-br from-violet-600/80 to-fuchsia-600/70 p-5">
                      <p className="text-[9px] text-white/60">
                        Available balance
                      </p>

                      <p className="mt-2 text-2xl font-semibold tracking-tight">
                        ••••••••
                      </p>

                      <div className="mt-7 flex items-center justify-between">
                        <span className="text-[9px] text-white/50">
                          traceV wallet
                        </span>

                        <span className="text-[9px] text-white/50">
                          NGN
                        </span>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.035] py-3">
                        <DownloadIcon
                          size={15}
                          className="rotate-180 text-violet-300"
                        />
                        <span className="text-[8px] text-white/35">
                          Send
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.035] py-3">
                        <ArrowUpRight
                          size={15}
                          className="text-fuchsia-300"
                        />
                        <span className="text-[8px] text-white/35">
                          Receive
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-2 rounded-xl border border-white/[0.05] bg-white/[0.035] py-3">
                        <Wallet
                          size={15}
                          className="text-violet-300"
                        />
                        <span className="text-[8px] text-white/35">
                          Wallet
                        </span>
                      </div>
                    </div>

                    {/* Activity */}

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-white/55">
                          Recent activity
                        </span>

                        <span className="text-[8px] text-violet-300">
                          View all
                        </span>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                            <CheckCircle size={13} />
                          </div>

                          <div className="flex-1">
                            <p className="text-[9px] font-medium">
                              Payment received
                            </p>

                            <p className="mt-1 text-[7px] text-white/25">
                              Completed
                            </p>
                          </div>

                          <span className="text-[8px] text-white/35">
                            •••
                          </span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/10 text-violet-300">
                            <Zap size={13} />
                          </div>

                          <div className="flex-1">
                            <p className="text-[9px] font-medium">
                              Transfer
                            </p>

                            <p className="mt-1 text-[7px] text-white/25">
                              Completed
                            </p>
                          </div>

                          <span className="text-[8px] text-white/35">
                            •••
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom bar */}

                  <div className="absolute bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-white/20" />
                </div>
              </div>

              {/* FLOATING SECURITY CARD */}

              <div className="download-float absolute left-[-5%] top-[19%] z-20 rounded-2xl border border-white/10 bg-[#171026]/90 p-4 shadow-2xl backdrop-blur-xl sm:left-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Secure wallet
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Built with security in mind
                    </p>
                  </div>
                </div>
              </div>

              {/* FLOATING PAYMENT CARD */}

              <div className="download-float-small absolute bottom-[18%] right-[-4%] z-20 rounded-2xl border border-violet-300/15 bg-[#171026]/90 p-4 shadow-2xl backdrop-blur-xl sm:right-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                    <Zap size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      Fast payments
                    </p>

                    <p className="mt-1 text-[10px] text-white/35">
                      Simple money movement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT YOU GET
      ====================================================== */}

      <section className="relative z-10 border-y border-white/[0.06] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300">
              <Sparkles size={13} />
              Inside traceV
            </div>

            <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              One app for your{" "}
              <span className="text-violet-300">
                money experience.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/40 sm:text-base">
              Everything is designed around making digital payments
              and wallet management feel simpler.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Wallet,
                title: "Digital Wallet",
                text: "Manage your digital wallet and keep your money experience organized.",
              },
              {
                icon: Zap,
                title: "Fast Payments",
                text: "Move through payment experiences without unnecessary complexity.",
              },
              {
                icon: ShieldCheck,
                title: "Security",
                text: "Financial interactions designed with security at the center.",
              },
              {
                icon: Smartphone,
                title: "Mobile First",
                text: "A mobile experience built around how people use money today.",
              },
            ].map((item, index) => {
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-violet-500/[0.04]"
                  style={{
                    animation: `downloadIn .7s cubic-bezier(.22,1,.36,1) ${
                      index * 100
                    }ms both`,
                  }}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
                    <ItemIcon size={20} />
                  </div>

                  <h3 className="mt-6 text-base font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          SIMPLE STEPS
      ====================================================== */}

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/15 bg-fuchsia-500/[0.07] px-3 py-1.5 text-xs font-medium text-fuchsia-300">
                <DownloadIcon size={13} />
                Get started
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Start in{" "}
                <span className="text-fuchsia-300">
                  three simple steps.
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-white/45">
                Download the app, create your account and start
                exploring your traceV wallet.
              </p>

              <a
                href={googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
              >
                Download from Google Play

                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Download traceV",
                  text: "Get the traceV app from Google Play.",
                },
                {
                  number: "02",
                  title: "Create your account",
                  text: "Set up your account and your digital wallet.",
                },
                {
                  number: "03",
                  title: "Start using traceV",
                  text: "Explore payments, transfers and your wallet experience.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="group flex gap-5 rounded-3xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-violet-400/20 hover:bg-violet-500/[0.035]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-sm font-semibold text-violet-300">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-white/40">
                      {step.text}
                    </p>
                  </div>

                  <ChevronRight
                    size={17}
                    className="ml-auto mt-3 text-white/20 transition group-hover:translate-x-1 group-hover:text-violet-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-10 lg:pb-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-violet-400/15 bg-gradient-to-br from-violet-900/40 via-[#180b2c] to-[#0d0717] px-7 py-16 text-center sm:px-12">
          <div className="download-glow pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] rounded-full bg-violet-500/20 blur-[100px]" />

          <div className="relative z-10">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/15 bg-violet-500/10 text-violet-300">
              <Smartphone size={20} />
            </div>

            <h2 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Ready to experience{" "}
              <span className="text-violet-300">
                traceV?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/45 sm:text-base">
              Download the app and take your wallet and payment
              experience with you.
            </p>

            <a
              href={googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
            >
              <GooglePlayIcon size={20} />

              Get traceV on Google Play

              <ArrowUpRight
                size={16}
                className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
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
                Wallet and payment infrastructure for modern
                financial experiences.
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

export default Download;