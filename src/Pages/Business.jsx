// src/pages/Business.jsx

import React from "react";
import { Link } from "react-router-dom";

const Icon = ({ children, size = 24, strokeWidth = 1.8, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ArrowRight = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Icon>
);

const ArrowUpRight = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Icon>
);

const Building2 = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M3 21h18" />
    <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
    <path d="M9 7h2" />
    <path d="M13 7h2" />
    <path d="M9 11h2" />
    <path d="M13 11h2" />
    <path d="M9 15h2" />
    <path d="M13 15h2" />
  </Icon>
);

const Wallet = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
    <path d="M16 14h.01" />
  </Icon>
);

const CreditCard = ({ size = 24 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </Icon>
);

const Link2 = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M10 13a5 5 0 0 0 7.54.54l2-2a5 5 0 0 0-7.07-7.07l-1.14 1.14" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-2 2a5 5 0 0 0 7.07 7.07l1.14-1.14" />
  </Icon>
);

const ReceiptText = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M4 2v20l3-2 3 2 3-2 3 2 4-2V2l-4 2-3-2-3 2-3-2-3 2Z" />
    <path d="M8 9h8" />
    <path d="M8 13h6" />
  </Icon>
);

const Users = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
);

const ShieldCheck = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const Zap = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
  </Icon>
);

const CheckCircle = ({ size = 24 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </Icon>
);

const Sparkles = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="m12 3-1.2 4.3a3 3 0 0 1-2.1 2.1L4.5 11 8.7 12.2a3 3 0 0 1 2.1 2.1L12 18.5l1.2-4.2a3 3 0 0 1 2.1-2.1l4.2-1.2-4.2-1.2a3 3 0 0 1-2.1-2.1L12 3Z" />
    <path d="m19 17-.5 1.8a1.5 1.5 0 0 1-1 1L15.7 20l1.8.5a1.5 1.5 0 0 1 1 1L19 23l.5-1.5a1.5 1.5 0 0 1 1-1L22 20l-1.5-.5a1.5 1.5 0 0 1-1-1L19 17Z" />
  </Icon>
);

const ChevronRight = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

function Business() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#07050f] text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .6; transform: scale(1.08); }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tracev-float {
          animation: float 5s ease-in-out infinite;
        }

        .tracev-float-delay {
          animation: float 6s ease-in-out 1s infinite;
        }

        .tracev-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .tracev-fade {
          animation: fadeUp .8s ease-out both;
        }

        .tracev-fade-2 {
          animation: fadeUp .8s ease-out .15s both;
        }

        .tracev-fade-3 {
          animation: fadeUp .8s ease-out .3s both;
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[130px]" />
        <div className="absolute right-[-180px] top-[500px] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute left-[-200px] top-[900px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
      </div>

      {/* NAVBAR */}
      <header className="relative z-20 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 shadow-lg shadow-purple-600/25">
              <span className="text-lg font-black">t</span>
            </div>

            <span className="text-xl font-bold tracking-tight">
              trace<span className="text-purple-400">V</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/business"
              className="text-sm font-medium text-white"
            >
              Business
            </Link>

            <Link
              to="/security"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Security
            </Link>

            <Link
              to="/pricing"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Pricing
            </Link>

            <Link
              to="/help"
              className="text-sm text-white/60 transition hover:text-white"
            >
              Help
            </Link>
          </nav>

          <Link
            to="/download"
            className="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-purple-100"
          >
            Download App
            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </header>

      {/* HERO */}
      <main className="relative z-10">
        <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            <div className="tracev-fade">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <Building2 size={16} />
                <span>Built for modern businesses</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Turn every payment into a{" "}
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                  better business
                </span>
                .
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                traceV gives businesses a simple way to collect payments,
                create payment pages, manage wallets, and keep track of
                transactions from one secure platform.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/download"
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-purple-600 px-6 py-4 font-semibold shadow-xl shadow-purple-600/20 transition hover:-translate-y-0.5 hover:bg-purple-500"
                >
                  Get traceV
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 font-semibold text-white/90 transition hover:border-white/20 hover:bg-white/[0.07]"
                >
                  Talk to us
                  <ArrowUpRight size={18} />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/45">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-400" />
                  Payment pages
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-400" />
                  Wallet management
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-purple-400" />
                  Transaction visibility
                </div>
              </div>
            </div>

            {/* BUSINESS VISUAL */}
            <div className="relative tracev-fade-2">
              <div className="tracev-glow absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]" />

              <div className="relative mx-auto max-w-[520px]">
                <div className="rounded-[32px] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[25px] border border-white/[0.07] bg-[#0d0918]">
                    {/* dashboard top */}
                    <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                      <div>
                        <p className="text-xs text-white/40">Business wallet</p>
                        <p className="mt-1 text-sm font-semibold">
                          My Business
                        </p>
                      </div>

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
                        <Wallet size={18} />
                      </div>
                    </div>

                    {/* balance */}
                    <div className="px-5 pb-5 pt-6">
                      <p className="text-xs text-white/40">Available balance</p>

                      <div className="mt-2 flex items-end justify-between">
                        <p className="text-3xl font-bold tracking-tight">
                          ₦2,485,000
                        </p>

                        <span className="mb-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                          +12.8%
                        </span>
                      </div>
                    </div>

                    {/* mini cards */}
                    <div className="grid grid-cols-2 gap-3 px-5 pb-5">
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                          <CreditCard size={18} />
                        </div>
                        <p className="text-xs text-white/40">
                          Payments today
                        </p>
                        <p className="mt-1 text-lg font-bold">₦184,500</p>
                      </div>

                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-300">
                          <ReceiptText size={18} />
                        </div>
                        <p className="text-xs text-white/40">
                          Transactions
                        </p>
                        <p className="mt-1 text-lg font-bold">128</p>
                      </div>
                    </div>

                    {/* recent */}
                    <div className="border-t border-white/[0.07] px-5 py-5">
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-semibold">
                          Recent payments
                        </p>
                        <span className="text-xs text-purple-300">
                          View all
                        </span>
                      </div>

                      <div className="space-y-3">
                        {[
                          ["John Stores", "₦45,000"],
                          ["Apex Fashion", "₦28,500"],
                          ["Sarah Collections", "₦16,000"],
                        ].map(([name, amount]) => (
                          <div
                            key={name}
                            className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] px-3 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-xs font-bold text-purple-300">
                                {name.charAt(0)}
                              </div>

                              <div>
                                <p className="text-xs font-medium">
                                  {name}
                                </p>
                                <p className="mt-0.5 text-[10px] text-white/35">
                                  Payment received
                                </p>
                              </div>
                            </div>

                            <p className="text-xs font-semibold">
                              {amount}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* floating card */}
                <div className="tracev-float absolute -right-5 top-10 hidden w-48 rounded-2xl border border-white/10 bg-[#120d20]/95 p-4 shadow-2xl backdrop-blur-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">Payment</p>
                      <p className="text-sm font-semibold">Received</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xl font-bold">₦75,000</p>
                </div>

                {/* floating link */}
                <div className="tracev-float-delay absolute -left-8 bottom-12 hidden w-52 rounded-2xl border border-white/10 bg-[#120d20]/95 p-4 shadow-2xl backdrop-blur-xl sm:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                      <Link2 size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-white/40">Payment page</p>
                      <p className="text-sm font-semibold">tracev.me/shop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS PROBLEM */}
        <section className="border-y border-white/[0.06] bg-white/[0.018]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-purple-300">
                <Sparkles size={17} />
                Less friction. More control.
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Your business should not have to fight its payment tools.
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/50">
                Whether you sell online, operate a physical business, collect
                for a service, or manage payments for a community, traceV is
                designed to keep the payment experience simple.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Link2,
                  title: "Share one payment link",
                  text: "Give customers a simple destination where they can see what you offer and make a payment.",
                },
                {
                  icon: Wallet,
                  title: "Organise your money",
                  text: "Keep business payment activity organised with dedicated wallets and clear transaction records.",
                },
                {
                  icon: ReceiptText,
                  title: "Know what happened",
                  text: "Keep payment information visible so you can follow activity instead of chasing scattered records.",
                },
              ].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                      <ItemIcon size={23} />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/45">
                      {item.text}
                    </p>

                    <div className="mt-6 flex items-center gap-1 text-sm font-medium text-purple-300">
                      Explore
                      <ChevronRight size={16} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <Zap size={15} />
                Business toolkit
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Everything you need to move money with confidence.
              </h2>

              <p className="mt-6 text-lg leading-8 text-white/50">
                traceV brings the important pieces of your payment workflow
                together without making your business operations feel
                complicated.
              </p>

              <Link
                to="/download"
                className="group mt-8 inline-flex items-center gap-2 font-semibold text-purple-300 transition hover:text-purple-200"
              >
                Start with traceV
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Building2,
                  title: "Business profile",
                  text: "Present your business clearly and give customers a familiar payment experience.",
                },
                {
                  icon: Link2,
                  title: "Payment pages",
                  text: "Create shareable payment destinations for products, services, campaigns, and collections.",
                },
                {
                  icon: Wallet,
                  title: "Payment wallets",
                  text: "Separate payment activity into wallets that match the way your business operates.",
                },
                {
                  icon: ReceiptText,
                  title: "Transaction records",
                  text: "Review payment activity with useful references and transaction details.",
                },
                {
                  icon: Users,
                  title: "Customer payments",
                  text: "Make it easier for customers to complete payments from a simple public page.",
                },
                {
                  icon: ShieldCheck,
                  title: "Security focused",
                  text: "Build payment workflows around secure authentication and protected account access.",
                },
              ].map((item) => {
                const ItemIcon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05] text-purple-300">
                      <ItemIcon size={21} />
                    </div>

                    <h3 className="mt-5 font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PAYMENT FLOW */}
        <section className="relative border-y border-white/[0.06] bg-[#0b0713]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <CreditCard size={15} />
                A simpler customer journey
              </div>

              <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                From your business to your customer in a few simple steps.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">
                Create your payment destination, share it with customers, and
                keep the resulting payment activity organised.
              </p>
            </div>

            <div className="relative mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  number: "01",
                  icon: Building2,
                  title: "Set up",
                  text: "Create your business payment page and add the information customers need.",
                },
                {
                  number: "02",
                  icon: Link2,
                  title: "Share",
                  text: "Put your payment link on social media, messages, websites, or anywhere customers find you.",
                },
                {
                  number: "03",
                  icon: Wallet,
                  title: "Collect",
                  text: "Customers pay through your page while your payment activity stays organised in traceV.",
                },
              ].map((step) => {
                const StepIcon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                        <StepIcon size={22} />
                      </div>

                      <span className="text-sm font-bold text-white/15">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="mt-3 leading-7 text-white/45">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="overflow-hidden rounded-[36px] border border-purple-400/15 bg-gradient-to-br from-purple-900/30 via-[#110a1e] to-[#0a0710] p-8 sm:p-12 lg:p-16">
            <div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-center">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                  <ShieldCheck size={28} />
                </div>

                <h2 className="mt-7 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                  Your business deserves a payment experience built around
                  trust.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
                  traceV is designed with account security and protected
                  payment workflows in mind, helping businesses operate with
                  greater confidence.
                </p>

                <Link
                  to="/security"
                  className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold transition hover:bg-white/[0.08]"
                >
                  Explore security
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              <div className="grid gap-3">
                {[
                  "Secure account authentication",
                  "Protected payment workflows",
                  "Clear transaction references",
                  "Business-focused payment management",
                ].map((text) => (
                  <div
                    key={text}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-black/20 px-5 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
                      <CheckCircle size={17} />
                    </div>

                    <span className="text-sm text-white/70">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 pb-24 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/[0.08] bg-white/[0.035] px-7 py-16 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
              <Sparkles size={26} />
            </div>

            <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to make payments simpler for your business?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">
              Start building a cleaner payment experience with traceV.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/download"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-7 py-4 font-semibold shadow-xl shadow-purple-600/20 transition hover:bg-purple-500"
              >
                Get the app
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold transition hover:bg-white/[0.07]"
              >
                Contact traceV
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600">
                  <span className="text-lg font-black">t</span>
                </div>

                <span className="text-xl font-bold">
                  trace<span className="text-purple-400">V</span>
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-white/40">
                Simple, secure payment infrastructure for people and
                businesses.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Product</p>

              <div className="mt-4 space-y-3">
                <Link
                  to="/business"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Business
                </Link>

                <Link
                  to="/pricing"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Pricing
                </Link>

                <Link
                  to="/download"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Download
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Company</p>

              <div className="mt-4 space-y-3">
                <Link
                  to="/about"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Contact
                </Link>

                <Link
                  to="/help"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Help Center
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Legal</p>

              <div className="mt-4 space-y-3">
                <Link
                  to="/privacy"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Privacy
                </Link>

                <Link
                  to="/terms"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Terms
                </Link>

                <Link
                  to="/security"
                  className="block text-sm text-white/45 transition hover:text-white"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/[0.06] pt-7 text-sm text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} traceV. All rights reserved.</p>

            <p>Payments made simpler.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Business;