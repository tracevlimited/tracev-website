import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://tracev-backend.onrender.com";

/* =========================================================
   ICONS
   ========================================================= */

function Icon({
  children,
  size = 20,
  strokeWidth = 1.8,
  className = "",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
}

const ArrowLeft = (props) => (
  <Icon {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </Icon>
);

const ArrowRight = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Icon>
);

const Check = (props) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);

const LockKeyhole = (props) => (
  <Icon {...props}>
    <rect width="16" height="12" x="4" y="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="16" r="1" />
    <path d="M12 17v2" />
  </Icon>
);

const Receipt = (props) => (
  <Icon {...props}>
    <path d="M4 3v18l3-2 3 2 2-2 2 2 3-2 3 2V3l-3 2-3-2-2 2-3-2-3 2Z" />
    <path d="M8 9h8M8 13h8M8 17h4" />
  </Icon>
);

const User = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);

const Phone = (props) => (
  <Icon {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  </Icon>
);

const Store = (props) => (
  <Icon {...props}>
    <path d="M3 9l1-5h16l1 5" />
    <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
    <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
    <path d="M9 21v-6h6v6" />
  </Icon>
);

const ShieldCheck = (props) => (
  <Icon {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

const X = (props) => (
  <Icon {...props}>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </Icon>
);

const AlertCircle = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </Icon>
);

const RefreshCw = (props) => (
  <Icon {...props}>
    <path d="M21 12a9 9 0 0 0-15.1-6.7L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 15.1 6.7L21 16" />
    <path d="M21 21v-5h-5" />
  </Icon>
);

/* =========================================================
   HELPERS
   ========================================================= */

function formatMoney(amount) {
  return Number(amount || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function getInitials(name) {
  const cleanName = String(name || "").trim();

  if (!cleanName) {
    return "T";
  }

  const parts = cleanName
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

/* =========================================================
   CHECKOUT PAGE
   ========================================================= */

export default function CheckoutPage() {
  const { checkoutId } = useParams();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [continuing, setContinuing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  /* =======================================================
     LOAD CHECKOUT
     ======================================================= */

  const loadCheckout = useCallback(
    async (isRefresh = false) => {
      if (!checkoutId) {
        setError("Checkout ID is missing.");
        setLoading(false);
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await axios.get(
          `${API_URL}/api/checkout/${encodeURIComponent(
            checkoutId
          )}`,
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 20000,
          }
        );

        const payload =
          response.data?.data ||
          response.data ||
          null;

        if (!payload) {
          throw new Error(
            "Checkout information was not returned."
          );
        }

        setCheckout(payload);
      } catch (err) {
        console.error(
          "[CHECKOUT PAGE] Load checkout error:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            "Unable to load this checkout."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [checkoutId]
  );

  useEffect(() => {
    loadCheckout();
  }, [loadCheckout]);

  /* =======================================================
     NORMALIZED DATA
     ======================================================= */

  const merchantName =
    checkout?.merchant?.name ||
    "TraceV Merchant";

  const merchantInitial =
    getInitials(merchantName);

  const buyerName =
    checkout?.buyer?.name ||
    "";

  const buyerPhone =
    checkout?.buyer?.phone ||
    "";

  const items = useMemo(() => {
    return Array.isArray(checkout?.items)
      ? checkout.items
      : [];
  }, [checkout]);

  const subtotal = useMemo(() => {
    if (
      checkout?.subtotal !== undefined &&
      checkout?.subtotal !== null
    ) {
      return Number(checkout.subtotal || 0);
    }

    return items.reduce((sum, item) => {
      return sum + Number(item?.lineTotal || 0);
    }, 0);
  }, [checkout, items]);

  const processingFee = Number(
    checkout?.processingFee || 0
  );

  const total = useMemo(() => {
    if (
      checkout?.total !== undefined &&
      checkout?.total !== null
    ) {
      return Number(checkout.total || 0);
    }

    if (
      checkout?.amount !== undefined &&
      checkout?.amount !== null
    ) {
      return Number(checkout.amount || 0);
    }

    return subtotal + processingFee;
  }, [checkout, subtotal, processingFee]);

  const currency =
    checkout?.currency || "NGN";

  const checkoutStatus = String(
    checkout?.paymentStatus ||
      checkout?.status ||
      "pending"
  ).toLowerCase();

  const isCompleted =
    checkoutStatus === "paid" ||
    checkoutStatus === "successful" ||
    checkoutStatus === "completed";

  const isCancelled =
    checkoutStatus === "cancelled" ||
    checkoutStatus === "canceled" ||
    checkoutStatus === "failed" ||
    checkoutStatus === "expired";

  /* =======================================================
     CONTINUE TO PAYMENT
     ======================================================= */

  const handleContinue = () => {
    if (!checkoutId) {
      setError("Checkout ID is missing.");
      return;
    }

    if (isCompleted) {
      setError(
        "This checkout has already been completed."
      );
      return;
    }

    if (isCancelled) {
      setError(
        "This checkout is no longer available for payment."
      );
      return;
    }

    setError("");
    setContinuing(true);

    navigate(
      `/process-payment/${encodeURIComponent(
        checkoutId
      )}`
    );
  };

  /* =======================================================
     BACK
     ======================================================= */

  const handleBack = () => {
    if (continuing) {
      return;
    }

    navigate(-1);
  };

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-5">
          <div className="w-full text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
            </div>

            <h1 className="mt-5 text-base font-bold text-slate-900">
              Loading secure checkout
            </h1>

            <p className="mt-1.5 text-xs leading-5 text-slate-500">
              Please wait while we prepare your order.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR WITHOUT CHECKOUT
     ======================================================= */

  if (error && !checkout) {
    return (
      <div className="min-h-screen bg-[#f6f7fb]">
        <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-5">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <AlertCircle size={23} />
            </div>

            <h1 className="mt-4 text-lg font-black text-slate-900">
              Checkout unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Go back
              </button>

              <button
                type="button"
                onClick={() => loadCheckout(true)}
                disabled={refreshing}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-xs font-bold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                <RefreshCw
                  size={14}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     COMPLETED
     ======================================================= */

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 py-8">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <Check
                size={32}
                className="text-emerald-600"
                strokeWidth={2.5}
              />
            </div>

            <h1 className="mt-5 text-xl font-black text-slate-900">
              Payment completed
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This checkout has already been completed
              successfully.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Amount
              </p>

              <p className="mt-1 text-2xl font-black text-slate-900">
                ₦{formatMoney(total)}
              </p>

              {checkout?.reference && (
                <p className="mt-2 break-all font-mono text-[10px] text-slate-400">
                  {checkout.reference}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     CANCELLED
     ======================================================= */

  if (isCancelled) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] px-4 py-8">
        <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
          <div className="w-full rounded-3xl border border-red-200 bg-white p-7 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <X
                size={30}
                className="text-red-500"
              />
            </div>

            <h1 className="mt-5 text-xl font-black text-slate-900">
              Checkout unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This checkout is no longer available for
              payment.
            </p>

            <button
              type="button"
              onClick={handleBack}
              className="mt-6 w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN CHECKOUT
     ======================================================= */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f7fb] font-sans text-slate-900 antialiased">
      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={continuing}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900 disabled:opacity-50 sm:text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 sm:text-xs">
            <LockKeyhole size={13} />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3.5 py-5 pb-10 sm:px-6 sm:py-8">
        {/* MERCHANT */}

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-6 sm:rounded-3xl sm:p-6">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1a1054] text-sm font-black text-white sm:h-14 sm:w-14 sm:rounded-2xl">
              {merchantInitial}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-indigo-600">
                Paying
              </p>

              <h1 className="mt-0.5 truncate text-base font-black text-slate-900 sm:text-xl">
                {merchantName}
              </h1>

              <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                Review your order before continuing.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-[10px] font-bold text-emerald-600 sm:flex">
              <ShieldCheck size={13} />
              Protected
            </div>
          </div>
        </section>

        {/* GRID */}

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}

          <div className="space-y-5">
            {/* ORDER */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Receipt size={17} />
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                      Order
                    </p>

                    <h2 className="text-sm font-black text-slate-900 sm:text-base">
                      Your payment items
                    </h2>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {items.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <p className="text-sm font-semibold text-slate-600">
                      No items found.
                    </p>
                  </div>
                ) : (
                  items.map((item, index) => {
                    const quantity = Number(
                      item?.quantity || 0
                    );

                    const unitPrice = Number(
                      item?.unitPrice || 0
                    );

                    const lineTotal = Number(
                      item?.lineTotal ??
                        unitPrice * quantity
                    );

                    return (
                      <div
                        key={
                          item?.id ||
                          item?.itemId ||
                          index
                        }
                        className="px-4 py-4 sm:px-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                              {item?.name ||
                                "Payment Item"}
                            </h3>

                            {item?.walletName && (
                              <p className="mt-0.5 text-[10px] font-medium text-indigo-500 sm:text-xs">
                                {item.walletName}
                              </p>
                            )}

                            <p className="mt-1.5 text-[10px] text-slate-400 sm:text-xs">
                              {quantity} × ₦
                              {formatMoney(
                                unitPrice
                              )}
                            </p>
                          </div>

                          <div className="shrink-0 text-right">
                            <p className="text-sm font-black text-slate-900 sm:text-base">
                              ₦
                              {formatMoney(
                                lineTotal
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>

            {/* CUSTOMER */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <User size={16} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Customer
                  </p>

                  <h2 className="text-sm font-black text-slate-900 sm:text-base">
                    Your details
                  </h2>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <User size={13} />

                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      Full name
                    </span>
                  </div>

                  <p className="mt-1.5 truncate text-xs font-bold text-slate-800 sm:text-sm">
                    {buyerName || "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone size={13} />

                    <span className="text-[9px] font-bold uppercase tracking-wider">
                      Phone
                    </span>
                  </div>

                  <p className="mt-1.5 truncate text-xs font-bold text-slate-800 sm:text-sm">
                    {buyerPhone || "Not provided"}
                  </p>
                </div>
              </div>
            </section>

            {/* REFERENCE */}

            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Store size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Checkout reference
                  </p>

                  <p className="mt-1 break-all font-mono text-[10px] font-semibold text-slate-600 sm:text-xs">
                    {checkout?.reference ||
                      checkout?.checkoutId ||
                      checkoutId}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT */}

          <aside className="lg:sticky lg:top-20">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                      Amount
                    </p>

                    <h2 className="text-base font-black text-slate-900 sm:text-lg">
                      Payment summary
                    </h2>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Receipt size={16} />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    Subtotal
                  </span>

                  <span className="text-sm font-bold text-slate-800">
                    ₦{formatMoney(subtotal)}
                  </span>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-slate-500">
                      {checkout?.processingFeeLabel ||
                        "TraceV service fee"}
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-slate-400">
                      {checkout?.processingFeeRate ||
                        "1% + ₦300"}{" "}
                      · capped at ₦
                      {Number(
                        checkout?.processingFeeCap ||
                          2000
                      ).toLocaleString("en-NG")}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-slate-800">
                    ₦{formatMoney(processingFee)}
                  </span>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Total to pay
                      </p>

                      <p className="mt-0.5 text-[9px] text-slate-400">
                        {currency}
                      </p>
                    </div>

                    <p className="text-2xl font-black tracking-tight text-slate-900">
                      ₦{formatMoney(total)}
                    </p>
                  </div>
                </div>

                {/* CLEAN PAYMENT ACTION */}

                <div className="mt-5 border-t border-slate-100 pt-5">
                  {error && (
                    <div className="mb-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-[10px] font-semibold leading-4 text-red-600">
                      <AlertCircle
                        size={14}
                        className="mt-0.5 shrink-0"
                      />

                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={continuing}
                    onClick={handleContinue}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
                  >
                    {continuing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Preparing payment...
                      </>
                    ) : (
                      <>
                        Continue to payment
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-1.5 text-[9px] text-slate-400">
                    <LockKeyhole size={10} />
                    Securely handled by traceV
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}

      <footer className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <div className="border-t border-slate-200 pt-5 text-center">
          <p className="flex items-center justify-center gap-1.5 text-[9px] font-semibold text-slate-400">
            <ShieldCheck size={11} />
            Secure payment checkout powered by traceV
          </p>
        </div>
      </footer>
    </div>
  );
}