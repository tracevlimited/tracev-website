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

const ArrowLeft = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </Icon>
);

const HomeIcon = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m3 10 9-7 9 7" />
    <path d="M5 9v11h14V9" />
    <path d="M9 20v-6h6v6" />
  </Icon>
);

const WalletCards = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 9h18" />
    <path d="M16 14h.01" />
    <path d="M19 14h.01" />
  </Icon>
);

const Sparkles = ({ size = 20, className = "" }) => (
  <Icon size={size} className={className}>
    <path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3Z" />
    <path d="m19 14-.7 2.3L16 17l2.3.7L19 20l.7-2.3L22 17l-2.3-.7L19 14Z" />
    <path d="m5 15-.6 1.9L2.5 17.5l1.9.6L5 20l.6-1.9 1.9-.6-1.9-.6L5 15Z" />
  </Icon>
);

function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080511] px-5 text-white">
      {/* =====================================================
          CSS ANIMATIONS
      ====================================================== */}

      <style>{`
        @keyframes notFoundGlow {
          0%, 100% {
            opacity: .2;
            transform: translate(-50%, -50%) scale(1);
          }

          50% {
            opacity: .35;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        @keyframes notFoundContent {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes notFoundLogoDot {
          0%, 100% {
            opacity: .5;
            transform: scale(.9);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        @keyframes notFoundIcon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }

          25% {
            transform: translateY(-8px) rotate(-2deg);
          }

          75% {
            transform: translateY(-8px) rotate(2deg);
          }
        }

        .not-found-content {
          animation: notFoundContent .7s cubic-bezier(.22, 1, .36, 1) both;
        }

        .not-found-glow {
          animation: notFoundGlow 6s ease-in-out infinite;
        }

        .not-found-logo-dot {
          animation: notFoundLogoDot 2s ease-in-out infinite;
        }

        .not-found-icon {
          animation: notFoundIcon 4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .not-found-content,
          .not-found-glow,
          .not-found-logo-dot,
          .not-found-icon {
            animation: none !important;
          }
        }
      `}</style>

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="not-found-glow absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_45%)]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="not-found-content relative z-10 w-full max-w-xl text-center">
        {/* ===================================================
            LOGO
        ==================================================== */}

        <Link
          to="/"
          className="mb-12 inline-flex items-center gap-1 text-2xl font-black tracking-[-0.06em]"
        >
          trace
          <span className="text-violet-400">V</span>

          <span className="not-found-logo-dot ml-0.5 mt-[-16px] h-1.5 w-1.5 rounded-full bg-violet-400" />
        </Link>

        {/* ===================================================
            ICON
        ==================================================== */}

        <div className="not-found-icon mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-violet-400/15 bg-violet-500/10 text-violet-300 shadow-[0_0_60px_rgba(139,92,246,0.15)]">
          <WalletCards size={40} strokeWidth={1.5} />
        </div>

        {/* ===================================================
            404
        ==================================================== */}

        <div className="mt-9">
          <div className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-[100px] font-bold leading-none tracking-[-0.08em] text-transparent sm:text-[130px]">
            404
          </div>

          <div className="mx-auto mt-3 flex w-fit items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-3 py-1.5 text-xs font-medium text-violet-300">
            <Sparkles size={13} />

            Page not found
          </div>
        </div>

        {/* ===================================================
            MESSAGE
        ==================================================== */}

        <h1 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">
          This payment journey doesn&apos;t exist.
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/40 sm:text-base">
          The page you&apos;re looking for may have moved, expired, or
          the address may be incorrect.
        </p>

        {/* ===================================================
            ACTIONS
        ==================================================== */}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#10081c] transition hover:bg-violet-100"
          >
            <HomeIcon size={16} />

            Back to traceV

            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-violet-400/25 hover:bg-violet-500/10"
          >
            <ArrowLeft size={16} />

            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;