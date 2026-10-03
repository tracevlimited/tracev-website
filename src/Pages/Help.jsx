// src/pages/Help.jsx

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const Icon = ({
  children,
  size = 24,
  strokeWidth = 1.8,
  className = "",
}) => (
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

const Search = ({ size = 22 }) => (
  <Icon size={size}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icon>
);

const Mail = ({ size = 24 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);

const MessageCircle = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 7.7 7.7 0 0 1-3.4-.8L4 20l1.8-4.2A7.5 7.5 0 1 1 20 11.5Z" />
    <path d="M8 11.5h.01" />
    <path d="M12 11.5h.01" />
    <path d="M16 11.5h.01" />
  </Icon>
);

const ShieldCheck = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const CreditCard = ({ size = 24 }) => (
  <Icon size={size}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
    <path d="M7 15h3" />
  </Icon>
);

const Wallet = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7" />
    <path d="M16 14h.01" />
  </Icon>
);

const User = ({ size = 24 }) => (
  <Icon size={size}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
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

const AlertCircle = ({ size = 24 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </Icon>
);

const ChevronDown = ({ size = 19 }) => (
  <Icon size={size}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

const ChevronRight = ({ size = 18 }) => (
  <Icon size={size}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);

const CheckCircle = ({ size = 24 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 2.5 2.5L16 9" />
  </Icon>
);

const Clock = ({ size = 24 }) => (
  <Icon size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

const FileText = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8" />
    <path d="M8 17h6" />
  </Icon>
);

const Sparkles = ({ size = 24 }) => (
  <Icon size={size}>
    <path d="m12 3-1.2 4.3a3 3 0 0 1-2.1 2.1L4.5 11l4.2 1.2a3 3 0 0 1 2.1 2.1L12 18.5l1.2-4.2a3 3 0 0 1 2.1-2.1l4.2-1.2-4.2-1.2a3 3 0 0 1-2.1-2.1L12 3Z" />
    <path d="m19 17-.5 1.8a1.5 1.5 0 0 1-1 1L15.7 20l1.8.5a1.5 1.5 0 0 1 1 1L19 23l.5-1.5a1.5 1.5 0 0 1 1-1L22 20l-1.5-.5a1.5 1.5 0 0 1-1-1L19 17Z" />
  </Icon>
);

const supportEmail = "support@tracev.com";
const businessEmail = "business@tracev.com";
const securityEmail = "security@tracev.com";

function Help() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    {
      icon: User,
      title: "Account & Login",
      text: "Get help with signing in, account access, verification, and profile settings.",
    },
    {
      icon: CreditCard,
      title: "Payments",
      text: "Questions about making payments, payment pages, checkout, and payment status.",
    },
    {
      icon: Wallet,
      title: "Wallets",
      text: "Learn about payment wallets, balances, wallet items, and wallet management.",
    },
    {
      icon: Building2,
      title: "Business",
      text: "Support for businesses using traceV to collect and organise customer payments.",
    },
    {
      icon: ShieldCheck,
      title: "Security",
      text: "Report suspicious activity or learn how to protect your traceV account.",
    },
    {
      icon: FileText,
      title: "Transactions",
      text: "Find help with transaction records, references, payment details, and receipts.",
    },
  ];

  const faqs = [
    {
      question: "How do I contact traceV support?",
      answer: `You can contact the traceV support team by email at ${supportEmail}. Include the email address associated with your account and a clear description of the issue so the support team can understand what happened.`,
    },
    {
      question: "I cannot log into my traceV account. What should I do?",
      answer:
        "Use the account recovery options available on the traceV login page first. If you still cannot access your account, contact support and provide the account email address and a description of the problem. Never send your password or authentication codes by email.",
    },
    {
      question: "My payment has not been completed. What should I do?",
      answer:
        "First check the payment status and confirm that the transaction was initiated with the correct details. If the status remains unclear, contact support with the transaction reference and relevant payment information. Avoid sharing passwords, PINs, or one-time authentication codes.",
    },
    {
      question: "Can businesses create payment pages?",
      answer:
        "Yes. traceV is designed to support businesses that want to create public payment experiences and collect customer payments through shareable payment pages.",
    },
    {
      question: "How do I report suspicious activity?",
      answer: `If you notice suspicious account or payment activity, contact the security team at ${securityEmail} as soon as possible. Do not share your password, PIN, biometric information, or one-time authentication codes.`,
    },
    {
      question: "Can I contact traceV about a business partnership?",
      answer: `For business enquiries, partnerships, or merchant-related questions, contact ${businessEmail}.`,
    },
    {
      question: "What information should I include in a support email?",
      answer:
        "Include the email address associated with your traceV account, a short description of the issue, the approximate time it happened, and any relevant transaction reference. Do not include passwords, PINs, card security codes, or one-time authentication codes.",
    },
    {
      question: "Where can I learn more about traceV security?",
      answer:
        "Visit the Security page for more information about traceV's security approach and account protection.",
    },
  ];

  const filteredFaqs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [search]);

  const scrollToFaq = () => {
    document
      .getElementById("faq")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#07050f] text-white">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .28;
            transform: scale(1);
          }
          50% {
            opacity: .52;
            transform: scale(1.08);
          }
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

        .tracev-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .tracev-fade {
          animation: fadeUp .7s ease-out both;
        }

        .tracev-fade-2 {
          animation: fadeUp .7s ease-out .12s both;
        }

        .tracev-fade-3 {
          animation: fadeUp .7s ease-out .24s both;
        }
      `}</style>

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-300px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple-700/20 blur-[130px]" />
        <div className="absolute right-[-200px] top-[500px] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute left-[-220px] top-[900px] h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
      </div>

      {/* NAVIGATION */}
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
              className="text-sm text-white/60 transition hover:text-white"
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
              className="text-sm font-medium text-white"
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

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_.72fr]">
            <div className="tracev-fade">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <MessageCircle size={16} />
                <span>traceV Help Center</span>
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                We are here to help you{" "}
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent">
                  move forward.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">
                Find answers, get help with your account, resolve payment
                questions, or contact the traceV team directly.
              </p>

              {/* Search */}
              <div className="mt-9 max-w-2xl">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-2 shadow-2xl shadow-purple-950/20 backdrop-blur-xl">
                  <Search size={21} />

                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        scrollToFaq();
                      }
                    }}
                    placeholder="Search for help..."
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35"
                    aria-label="Search help articles"
                  />

                  <button
                    type="button"
                    onClick={scrollToFaq}
                    className="hidden rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500 sm:block"
                  >
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Payment",
                  "Account",
                  "Wallet",
                  "Security",
                  "Business",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSearch(item);
                      setTimeout(scrollToFaq, 0);
                    }}
                    className="rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-2 text-xs text-white/45 transition hover:border-purple-400/20 hover:text-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* SUPPORT CARD */}
            <div className="relative tracev-fade-2">
              <div className="tracev-glow absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/20 blur-[100px]" />

              <div className="relative rounded-[32px] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-purple-950/50 backdrop-blur-xl">
                <div className="rounded-[25px] border border-white/[0.07] bg-[#0d0918] p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.16em] text-purple-300/70">
                        Need direct help?
                      </p>

                      <h2 className="mt-3 text-2xl font-bold">
                        Contact traceV
                      </h2>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                      <Mail size={23} />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-white/45">
                    Send us an email and tell us what happened. Our team can
                    help with account, payment, wallet, and general support
                    questions.
                  </p>

                  <a
                    href={`mailto:${supportEmail}`}
                    className="mt-6 flex items-center justify-between rounded-2xl border border-purple-400/15 bg-purple-500/[0.08] px-4 py-4 transition hover:border-purple-400/30 hover:bg-purple-500/[0.12]"
                  >
                    <div>
                      <p className="text-xs text-white/35">Support email</p>
                      <p className="mt-1 break-all text-sm font-semibold text-purple-200">
                        {supportEmail}
                      </p>
                    </div>

                    <ArrowUpRight size={18} className="shrink-0" />
                  </a>

                  <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                      <Clock size={17} />
                    </div>

                    <div>
                      <p className="text-xs font-medium text-white/65">
                        Support requests
                      </p>
                      <p className="mt-0.5 text-xs text-white/35">
                        Include your account email and relevant reference
                        details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="tracev-float absolute -bottom-5 -left-6 hidden rounded-2xl border border-white/10 bg-[#120d20]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300">
                    <CheckCircle size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold">Support is here</p>
                    <p className="mt-0.5 text-[10px] text-white/35">
                      Find an answer or contact us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK SUPPORT */}
        <section className="border-y border-white/[0.06] bg-white/[0.018]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-purple-300">
                How can we help?
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Find the right place to start.
              </h2>

              <p className="mt-4 leading-7 text-white/45">
                Choose a category below or search the help center for an
                answer.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => {
                const CategoryIcon = category.icon;

                return (
                  <button
                    key={category.title}
                    type="button"
                    onClick={() => {
                      setSearch(category.title.replace(" & ", " "));
                      scrollToFaq();
                    }}
                    className="group text-left rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:bg-white/[0.045]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                        <CategoryIcon size={21} />
                      </div>

                      <ChevronRight
                        size={17}
                        className="text-white/20 transition group-hover:translate-x-1 group-hover:text-purple-300"
                      />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {category.text}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT OPTIONS */}
        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <div className="text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
              <Mail size={15} />
              Contact options
            </div>

            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Talk to the right team.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">
              Different questions can go to different teams. Choose the
              contact that matches what you need.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {/* GENERAL SUPPORT */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                <MessageCircle size={22} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                General support
              </h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                Account access, payments, wallets, transactions, and general
                product questions.
              </p>

              <a
                href={`mailto:${supportEmail}`}
                className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition hover:border-purple-400/20 hover:bg-white/[0.045]"
              >
                <span className="break-all text-sm font-medium text-white/75">
                  {supportEmail}
                </span>
                <ArrowUpRight size={17} className="shrink-0 text-purple-300" />
              </a>
            </div>

            {/* BUSINESS */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 text-fuchsia-300">
                <Building2 size={22} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Business enquiries
              </h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                Merchant questions, business partnerships, integrations, and
                commercial enquiries.
              </p>

              <a
                href={`mailto:${businessEmail}`}
                className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition hover:border-fuchsia-400/20 hover:bg-white/[0.045]"
              >
                <span className="break-all text-sm font-medium text-white/75">
                  {businessEmail}
                </span>
                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-fuchsia-300"
                />
              </a>
            </div>

            {/* SECURITY */}
            <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">
                <ShieldCheck size={22} />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Security concerns
              </h3>

              <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/45">
                Use this channel to report suspicious account or payment
                activity that requires security attention.
              </p>

              <a
                href={`mailto:${securityEmail}`}
                className="mt-6 flex items-center justify-between rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5 transition hover:border-emerald-400/20 hover:bg-white/[0.045]"
              >
                <span className="break-all text-sm font-medium text-white/75">
                  {securityEmail}
                </span>
                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-emerald-300"
                />
              </a>
            </div>
          </div>
        </section>

        {/* IMPORTANT SECURITY NOTICE */}
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
          <div className="rounded-[30px] border border-amber-400/10 bg-amber-400/[0.035] p-7 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                <AlertCircle size={22} />
              </div>

              <div>
                <h3 className="text-lg font-semibold">
                  Keep your account information private
                </h3>

                <p className="mt-2 max-w-4xl text-sm leading-7 text-white/45">
                  traceV support will not need your password, PIN, biometric
                  information, or one-time authentication codes. Do not send
                  these details by email or share them with anyone claiming to
                  provide support.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="scroll-mt-10 border-y border-white/[0.06] bg-[#0b0713]"
        >
          <div className="mx-auto max-w-5xl px-6 py-24 lg:px-8 lg:py-28">
            <div className="text-center">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm text-purple-200">
                <FileText size={15} />
                Frequently asked questions
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Answers to common questions.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">
                Search the questions below or contact the support team if you
                need help with something else.
              </p>
            </div>

            {search && (
              <div className="mt-10 flex items-center justify-between rounded-2xl border border-purple-400/15 bg-purple-500/[0.06] px-4 py-3">
                <p className="text-sm text-white/55">
                  Showing results for{" "}
                  <span className="font-semibold text-white">
                    “{search}”
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs font-medium text-purple-300 transition hover:text-purple-200"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="mt-10 space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm font-semibold leading-6 text-white/85 sm:text-base">
                          {faq.question}
                        </span>

                        <span
                          className={`shrink-0 text-white/35 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-purple-300" : ""
                          }`}
                        >
                          <ChevronDown size={18} />
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-white/[0.06] px-5 pb-6 pt-4 sm:px-6">
                          <p className="text-sm leading-7 text-white/45">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="rounded-3xl border border-white/[0.07] bg-white/[0.025] px-6 py-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-white/40">
                    <Search size={22} />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    No matching help articles
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/40">
                    Try another search or contact our support team directly.
                  </p>

                  <a
                    href={`mailto:${supportEmail}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold transition hover:bg-purple-500"
                  >
                    Email support
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="relative px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-purple-400/15 bg-gradient-to-br from-purple-900/30 via-[#110a1e] to-[#0a0710] px-7 py-16 text-center sm:px-12">
            <div className="tracev-glow absolute left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[80px]" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300">
                <Sparkles size={26} />
              </div>

              <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                Still need a hand?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/45">
                Tell us what you need help with and the traceV team can point
                you in the right direction.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href={`mailto:${supportEmail}`}
                  className="group flex items-center justify-center gap-2 rounded-2xl bg-purple-600 px-7 py-4 font-semibold shadow-xl shadow-purple-600/20 transition hover:bg-purple-500"
                >
                  Email support
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <Link
                  to="/security"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-7 py-4 font-semibold transition hover:bg-white/[0.07]"
                >
                  Visit security
                  <ArrowUpRight size={17} />
                </Link>
              </div>
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

export default Help;