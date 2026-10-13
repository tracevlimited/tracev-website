
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Loader2,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  AlertCircle,
  X,
  CreditCard,
  ReceiptText,
  Store,
  Wallet,
  Building2,
  Timer,
  Info,
} from "lucide-react";

const API_URL = "https://proxy-server-twzj.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const POLL_INTERVAL = 10000;

const formatMoney = (amount, currency = "NGN") => {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "₦0.00";

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `₦${value.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return parsed.toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const normalizeStatus = (status) =>
  String(status || "pending")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");

const isSuccessfulStatus = (status) =>
  ["success", "successful", "paid", "completed", "complete"].includes(
    normalizeStatus(status)
  );

const isFailedStatus = (status) =>
  [
    "failed",
    "failure",
    "cancelled",
    "canceled",
    "expired",
    "reversed",
  ].includes(normalizeStatus(status));

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong. Please try again.";

const getCheckoutAmount = (checkout) => {
  const candidates = [
    checkout?.totalAmount,
    checkout?.total_amount,
    checkout?.total,
    checkout?.amount,
    checkout?.metadata?.totalAmount,
    checkout?.metadata?.total_amount,
  ];

  const amount = candidates.find(
    (value) => value !== undefined && value !== null && value !== ""
  );

  return Number(amount) || 0;
};

const getCheckoutReference = (checkout) =>
  checkout?.reference ||
  checkout?.paymentReference ||
  checkout?.payment_reference ||
  checkout?.paystackChargeReference ||
  checkout?.paystack_charge_reference ||
  checkout?.metadata?.paystackChargeReference ||
  checkout?.metadata?.reference ||
  checkout?.metadata?.transferAccount?.reference ||
  checkout?.transferAccount?.reference ||
  "";

const getCheckoutStatus = (checkout) =>
  checkout?.paymentStatus ||
  checkout?.payment_status ||
  checkout?.status ||
  checkout?.checkoutStatus ||
  checkout?.checkout_status ||
  checkout?.paystack_status ||
  checkout?.metadata?.checkoutStatus ||
  checkout?.metadata?.paystack_status ||
  "pending";

const getMerchantName = (checkout) =>
  checkout?.merchantName ||
  checkout?.merchant_name ||
  checkout?.profile?.businessName ||
  checkout?.profile?.business_name ||
  checkout?.profile?.fullName ||
  checkout?.profile?.full_name ||
  checkout?.businessName ||
  checkout?.business_name ||
  "traceV Merchant";

const getCheckoutItems = (checkout) => {
  const items =
    checkout?.items ||
    checkout?.cartItems ||
    checkout?.cart_items ||
    checkout?.transaction_items ||
    [];

  return Array.isArray(items) ? items : [];
};

const getItemName = (item) =>
  item?.name ||
  item?.itemName ||
  item?.item_name ||
  item?.title ||
  item?.productName ||
  item?.product_name ||
  item?.payment_items?.name ||
  item?.payment_item?.name ||
  item?.page_wallets?.name ||
  "Payment item";

const getItemQuantity = (item) =>
  Math.max(1, Number(item?.quantity || item?.qty || 1));

const getItemAmount = (item) => {
  const directTotal =
    item?.total ??
    item?.totalAmount ??
    item?.total_amount ??
    item?.subtotal;

  if (directTotal !== undefined && directTotal !== null) {
    return Number(directTotal) || 0;
  }

  const unitPrice =
    item?.price ??
    item?.amount ??
    item?.unitPrice ??
    item?.unit_price ??
    0;

  return (Number(unitPrice) || 0) * getItemQuantity(item);
};

const getTransferAccount = (checkout) => {
  const metadata = checkout?.metadata || {};
  
  const account =
    checkout?.transferAccount ||
    checkout?.transfer_account ||
    metadata?.transferAccount ||
    metadata?.transfer_account ||
    null;

  if (!account || typeof account !== "object") return null;

  return {
    accountName:
      account.accountName ||
      account.account_name ||
      account.accountNameOnAccount ||
      "",
    accountNumber:
      account.accountNumber ||
      account.account_number ||
      account.accountNo ||
      "",
    bankName:
      account.bankName ||
      account.bank_name ||
      account.bank?.name ||
      account.bank ||
      "",
    expiresAt:
      account.expiresAt ||
      account.expires_at ||
      account.accountExpiresAt ||
      account.account_expires_at ||
      "",
    displayText: account.displayText || account.display_text || "",
    reference:
      account.reference ||
      account.chargeReference ||
      account.charge_reference ||
      "",
    status: account.status || "pending",
  };
};

function StatusBadge({ status }) {
  if (isSuccessfulStatus(status)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
        <CheckCircle2 size={14} />
        Paid
      </span>
    );
  }

  if (isFailedStatus(status)) {
    const normalized = normalizeStatus(status);

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
        <AlertCircle size={14} />
        {normalized === "expired"
          ? "Expired"
          : normalized === "cancelled" || normalized === "canceled"
            ? "Cancelled"
            : "Failed"}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
      <Clock size={14} />
      Awaiting payment
    </span>
  );
}

function DetailRow({
  label,
  value,
  copyable = false,
  onCopy,
  copied,
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="shrink-0 text-sm text-slate-500">{label}</span>

      <div className="flex min-w-0 items-center gap-2">
        <span className="break-all text-right text-sm font-semibold text-slate-800">
          {value || "—"}
        </span>

        {copyable && value && (
          <button
            type="button"
            onClick={() => onCopy(value, label)}
            aria-label={`Copy ${label}`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {copied ? (
              <Check size={15} className="text-emerald-600" />
            ) : (
              <Copy size={15} />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function TransferAccountCard({
  account,
  amount,
  currency,
  reference,
  copiedField,
  onCopy,
  expired,
  expiresIn,
}) {
  const accountName = account?.accountName;
  const accountNumber = account?.accountNumber;
  const bankName =
    typeof account?.bankName === "string"
      ? account.bankName
      : account?.bankName?.name || "";

  const accountReady = Boolean(accountNumber && bankName);

  return (
    <section className="mt-5 overflow-hidden rounded-3xl border border-blue-200 bg-white shadow-sm">
      <div className="bg-blue-700 p-5 text-white sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <Building2 size={23} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
              Bank transfer
            </p>

            <h2 className="mt-1 text-xl font-extrabold">
              Pay directly to this account
            </h2>

            <p className="mt-2 text-sm leading-6 text-blue-100">
              Transfer the exact amount below. Your payment will be confirmed
              after the backend verifies it with Paystack.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4">
          <p className="text-xs font-medium text-blue-100">
            Exact amount to transfer
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {formatMoney(amount, currency)}
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {accountReady ? (
          <>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Bank name
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="break-words text-lg font-bold text-slate-900">
                  {bankName}
                </p>

                <button
                  type="button"
                  onClick={() => onCopy(bankName, "Bank name")}
                  aria-label="Copy bank name"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                >
                  {copiedField === "Bank name" ? (
                    <Check size={16} className="text-emerald-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>

              <div className="my-4 border-t border-slate-200" />

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Account number
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="break-all font-mono text-2xl font-extrabold tracking-wider text-slate-950 sm:text-3xl">
                  {accountNumber}
                </p>

                <button
                  type="button"
                  onClick={() => onCopy(accountNumber, "Account number")}
                  aria-label="Copy account number"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
                >
                  {copiedField === "Account number" ? (
                    <Check size={17} className="text-emerald-600" />
                  ) : (
                    <Copy size={17} />
                  )}
                </button>
              </div>

              <div className="my-4 border-t border-slate-200" />

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Account name
              </p>

              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="break-words text-base font-bold text-slate-900">
                  {accountName || "Not provided by Paystack"}
                </p>

                {accountName && (
                  <button
                    type="button"
                    onClick={() => onCopy(accountName, "Account name")}
                    aria-label="Copy account name"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  >
                    {copiedField === "Account name" ? (
                      <Check size={16} className="text-emerald-600" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {expired ? (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                <AlertCircle size={19} className="mt-0.5 shrink-0 text-red-600" />
                <div>
                  <p className="text-sm font-bold text-red-800">
                    Transfer account expired
                  </p>
                  <p className="mt-1 text-sm leading-6 text-red-700">
                    Do not transfer to an expired account. Refresh the payment
                    status or contact the merchant to arrange a new checkout.
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <Info size={19} className="mt-0.5 shrink-0 text-amber-700" />

                <div className="min-w-0">
                  <p className="text-sm font-bold text-amber-900">
                    Important transfer instructions
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm leading-6 text-amber-900">
                    <li>• Transfer exactly {formatMoney(amount, currency)}.</li>
                    <li>• Use the account details shown above.</li>
                    <li>
                      • Keep this page open and refresh to check confirmation.
                    </li>
                    <li>
                      • Do not share your banking PIN, password, or OTP.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {account.expiresAt && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Timer size={17} />
                  <span>Account expires</span>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">
                    {expired ? "Expired" : expiresIn || "Checking expiry"}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {formatDate(account.expiresAt)}
                  </p>
                </div>
              </div>
            )}

            {reference && (
              <div className="mt-4 rounded-xl border border-slate-200 px-4">
                <DetailRow
                  label="Payment reference"
                  value={reference}
                  copyable
                  onCopy={onCopy}
                  copied={copiedField === "Payment reference"}
                />
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 shrink-0 text-amber-700" />
              <div>
                <p className="text-sm font-bold text-amber-900">
                  Transfer details are not available yet
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-800">
                  The backend has not returned a complete bank account. Please
                  refresh the checkout. Do not send money to an account that
                  is not displayed here.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProcessPaymentPage() {
  const { checkoutId } = useParams();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [startingPayment, setStartingPayment] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [now, setNow] = useState(Date.now());

  const loadCheckout = useCallback(
    async ({ silent = false } = {}) => {
      if (!checkoutId) {
        setError("The checkout link is missing its checkout ID.");
        setLoadingCheckout(false);
        return null;
      }

      if (!silent) setLoadingCheckout(true);

      try {
        setError("");

        const response = await api.get(
          `/api/checkout/${encodeURIComponent(checkoutId)}`
        );

        const payload =
          response?.data?.checkout ||
          response?.data?.data ||
          response?.data;

        if (!payload || typeof payload !== "object") {
          throw new Error("The checkout details could not be loaded.");
        }

        setCheckout(payload);
        setLastUpdated(new Date());

        return payload;
      } catch (err) {
        setError(getErrorMessage(err));
        return null;
      } finally {
        if (!silent) setLoadingCheckout(false);
      }
    },
    [checkoutId]
  );

  const verifyPayment = useCallback(async (reference) => {
    if (!reference) {
      throw new Error("A payment reference is not available yet.");
    }

    const response = await api.get(
      `/api/payment/verify/${encodeURIComponent(reference)}`
    );

    return response?.data;
  }, []);

  useEffect(() => {
    loadCheckout();
  }, [loadCheckout]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!copiedField) return undefined;

    const timeout = window.setTimeout(() => setCopiedField(""), 1800);

    return () => window.clearTimeout(timeout);
  }, [copiedField]);

  useEffect(() => {
    if (!checkoutId) return undefined;

    const handleBeforeUnload = (event) => {
      if (startingPayment) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [checkoutId, startingPayment]);

  const paymentStatus = getCheckoutStatus(checkout);
  const isPaid = isSuccessfulStatus(paymentStatus);
  const isFailed = isFailedStatus(paymentStatus);

  const amount = getCheckoutAmount(checkout);
  const currency = checkout?.currency || checkout?.metadata?.currency || "NGN";
  const reference = getCheckoutReference(checkout);
  const merchantName = getMerchantName(checkout);
  const items = getCheckoutItems(checkout);
  const transferAccount = getTransferAccount(checkout);

  const authorizationUrl =
    checkout?.authorizationUrl ||
    checkout?.authorization_url ||
    checkout?.metadata?.authorizationUrl ||
    checkout?.metadata?.authorization_url ||
    "";

  const checkoutExpiry =
    checkout?.expiresAt ||
    checkout?.expires_at ||
    checkout?.metadata?.expiresAt ||
    checkout?.metadata?.expires_at;

  const transferExpiry = transferAccount?.expiresAt;

  const checkoutExpired =
    Boolean(checkoutExpiry) &&
    !isPaid &&
    new Date(checkoutExpiry).getTime() < now;

  const transferExpired =
    Boolean(transferExpiry) &&
    new Date(transferExpiry).getTime() <= now;

  const isExpired =
    normalizeStatus(paymentStatus) === "expired" || checkoutExpired;

  const canPay = !isPaid && !isFailed && !isExpired;

  const expiresIn = useMemo(() => {
    if (!transferExpiry) return "";

    const difference = new Date(transferExpiry).getTime() - now;

    if (!Number.isFinite(difference) || difference <= 0) {
      return "Expired";
    }

    const totalSeconds = Math.floor(difference / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${String(minutes).padStart(2, "0")}m remaining`;
    }

    return `${minutes}m ${String(seconds).padStart(2, "0")}s remaining`;
  }, [transferExpiry, now]);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + getItemQuantity(item), 0),
    [items]
  );

  const copyText = useCallback(async (value, label) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(value));
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = String(value);
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();

        const copied = document.execCommand("copy");
        document.body.removeChild(textArea);

        if (!copied) throw new Error("Copy failed");
      }

      setCopiedField(label);
      setError("");
    } catch {
      setError("Could not copy automatically. Please select and copy the text.");
    }
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setError("");

    try {
      const currentCheckout = await loadCheckout({ silent: true });
      const currentReference = getCheckoutReference(currentCheckout);

      if (currentReference) {
        try {
          await verifyPayment(currentReference);
        } catch (verifyError) {
          console.warn(
            "Payment verification request failed:",
            getErrorMessage(verifyError)
          );
        }
      }

      await loadCheckout({ silent: true });
    } finally {
      setRefreshing(false);
    }
  }, [loadCheckout, verifyPayment]);

  useEffect(() => {
    if (!checkoutId || isPaid || isFailed || isExpired) return undefined;

    const interval = window.setInterval(async () => {
      const currentCheckout = await loadCheckout({ silent: true });
      const currentReference = getCheckoutReference(currentCheckout);

      if (currentReference) {
        try {
          await verifyPayment(currentReference);
        } catch (err) {
          // Polling is best-effort; the next cycle will retry.
          console.warn("Automatic payment check failed:", getErrorMessage(err));
        }

        await loadCheckout({ silent: true });
      }
    }, POLL_INTERVAL);

    return () => window.clearInterval(interval);
  }, [
    checkoutId,
    isPaid,
    isFailed,
    isExpired,
    loadCheckout,
    verifyPayment,
  ]);

  const handlePaystackPayment = useCallback(async () => {
    if (startingPayment || !checkout) return;

    setError("");

    if (!canPay) {
      setError("This checkout is no longer available for payment.");
      return;
    }

    const currentReference = getCheckoutReference(checkout);
    const currentAuthorizationUrl =
      checkout?.authorizationUrl ||
      checkout?.authorization_url ||
      checkout?.metadata?.authorizationUrl ||
      checkout?.metadata?.authorization_url ||
      "";

    if (!currentReference) {
      setError("A payment reference is missing. Please refresh the checkout.");
      return;
    }

    if (!currentAuthorizationUrl) {
      setError(
        "The Paystack checkout link is not available. Refresh the checkout to check for an update."
      );
      return;
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(currentAuthorizationUrl);
    } catch {
      setError("The payment link is invalid. Please contact the merchant.");
      return;
    }

    if (
      parsedUrl.protocol !== "https:" ||
      parsedUrl.hostname !== "checkout.paystack.com"
    ) {
      setError("The payment link could not be trusted.");
      return;
    }

    setStartingPayment(true);

    try {
      const verification = await verifyPayment(currentReference);

      if (
        verification?.paid === true ||
        isSuccessfulStatus(
          verification?.status ||
            verification?.transaction?.status ||
            verification?.data?.status
        )
      ) {
        await loadCheckout({ silent: true });
        setError("Payment has already been completed. Your status was refreshed.");
        setStartingPayment(false);
        return;
      }

      window.location.assign(parsedUrl.toString());
    } catch (err) {
      setError(
        `We couldn't confirm the current payment status. Refresh and try again. ${getErrorMessage(err)}`
      );
      setStartingPayment(false);
    }
  }, [checkout, startingPayment, canPay, verifyPayment, loadCheckout]);

  const handleCancel = useCallback(() => {
    setShowCancelConfirm(false);

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (loadingCheckout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Loader2 className="animate-spin text-blue-700" size={26} />
          </div>
          <h1 className="text-lg font-bold text-slate-900">
            Loading secure checkout
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Please wait while we retrieve your payment details.
          </p>
        </div>
      </main>
    );
  }

  if (!checkout) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <AlertCircle size={24} />
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            Checkout unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {error || "We couldn't retrieve this checkout."}
          </p>

          <button
            type="button"
            onClick={() => loadCheckout()}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            <RefreshCw size={16} />
            Try again
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setShowCancelConfirm(true)}
            className="inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-white">
              <Wallet size={19} />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-900">
                trace<span className="text-blue-700">V</span>
              </p>
              <p className="-mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Secure checkout
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
            <LockKeyhole size={13} />
            <span className="hidden sm:inline">Secure payment</span>
            <span className="sm:hidden">Secure</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-7 sm:px-6 sm:py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:px-8">
        <section className="min-w-0">
          <div className="mb-6">
            <p className="text-sm font-semibold text-blue-700">
              Payment checkout
            </p>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Complete your payment
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Review your order and follow the payment instructions below.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
            >
              <AlertCircle className="mt-0.5 shrink-0 text-amber-700" size={18} />
              <div className="min-w-0 flex-1 leading-6">{error}</div>
              <button
                type="button"
                onClick={() => setError("")}
                aria-label="Dismiss message"
                className="rounded-lg p-1 text-amber-700 hover:bg-amber-100"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {isPaid ? (
            <div className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={30} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-950">
                Payment confirmed
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                The backend reports that this payment is complete. Keep your
                reference for your records.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Amount paid
                </p>
                <p className="mt-1 text-3xl font-extrabold text-slate-950">
                  {formatMoney(amount, currency)}
                </p>
                <div className="mt-4 border-t border-slate-200 pt-1">
                  <DetailRow
                    label="Reference"
                    value={reference}
                    copyable
                    onCopy={copyText}
                    copied={copiedField === "Reference"}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {refreshing ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <RefreshCw size={17} />
                )}
                Refresh payment details
              </button>
            </div>
          ) : isFailed || isExpired ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <AlertCircle size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-950">
                {isExpired
                  ? "This checkout has expired"
                  : "Payment was not completed"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {isExpired
                  ? "This checkout is no longer available for payment. Return to the merchant to request a new checkout link."
                  : "The backend reports that this payment was unsuccessful. Refresh the status to check for updates."}
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <DetailRow
                  label="Status"
                  value={isExpired ? "Expired" : "Unsuccessful"}
                />
                <div className="border-t border-slate-200">
                  <DetailRow
                    label="Reference"
                    value={reference}
                    copyable
                    onCopy={copyText}
                    copied={copiedField === "Reference"}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              >
                {refreshing ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <RefreshCw size={17} />
                )}
                Check payment status
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <Store size={22} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Paying merchant
                        </p>
                        <h2 className="mt-1 truncate text-base font-bold text-slate-900">
                          {merchantName}
                        </h2>
                      </div>
                    </div>

                    <StatusBadge status={paymentStatus} />
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm font-medium text-slate-500">
                    Total amount due
                  </p>

                  <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                    <p className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                      {formatMoney(amount, currency)}
                    </p>

                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                      <ShoppingBag size={13} />
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 px-4">
                    <DetailRow
                      label="Payment reference"
                      value={reference}
                      copyable
                      onCopy={copyText}
                      copied={copiedField === "Payment reference"}
                    />

                    <div className="border-t border-slate-200">
                      <DetailRow
                        label="Checkout created"
                        value={formatDate(
                          checkout?.createdAt ||
                            checkout?.created_at ||
                            checkout?.created
                        )}
                      />
                    </div>

                    {checkoutExpiry && (
                      <div className="border-t border-slate-200">
                        <DetailRow
                          label="Checkout expires"
                          value={formatDate(checkoutExpiry)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {items.length > 0 && (
                <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ReceiptText size={18} className="text-slate-500" />
                    <h2 className="font-bold text-slate-900">Order summary</h2>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {items.map((item, index) => (
                      <div
                        key={
                          item?.id ||
                          item?.itemId ||
                          item?.item_id ||
                          `${getItemName(item)}-${index}`
                        }
                        className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
                      >
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold text-slate-800">
                            {getItemName(item)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Qty: {getItemQuantity(item)}
                          </p>
                        </div>

                        <p className="shrink-0 text-sm font-semibold text-slate-900">
                          {formatMoney(getItemAmount(item), currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {transferAccount ? (
                <TransferAccountCard
                  account={transferAccount}
                  amount={amount}
                  currency={currency}
                  reference={reference || transferAccount.reference}
                  copiedField={copiedField}
                  onCopy={copyText}
                  expired={transferExpired}
                  expiresIn={expiresIn}
                />
              ) : (
                <div className="mt-5 rounded-3xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                      <CreditCard size={20} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-bold text-slate-900">
                        Pay securely with Paystack
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Your temporary transfer account has not been returned
                        by the backend. If a hosted checkout link is available,
                        you can continue to Paystack below.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                          <LockKeyhole size={13} className="text-emerald-600" />
                          Secure checkout
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
                          <ShieldCheck size={13} className="text-emerald-600" />
                          Server-verified payment
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!transferAccount && (
                <>
                  <button
                    type="button"
                    onClick={handlePaystackPayment}
                    disabled={!canPay || startingPayment || !authorizationUrl}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-blue-700 px-5 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  >
                    {startingPayment ? (
                      <>
                        <Loader2 size={19} className="animate-spin" />
                        Checking payment status...
                      </>
                    ) : (
                      <>
                        Continue to Paystack
                        <ExternalLink size={17} />
                      </>
                    )}
                  </button>

                  {!authorizationUrl && (
                    <p className="mt-3 text-center text-xs leading-5 text-amber-700">
                      No hosted checkout link or transfer account is available
                      yet. Refresh to check for an update.
                    </p>
                  )}
                </>
              )}

              {transferAccount && !transferExpired && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-xs leading-5 text-slate-500">
                  <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                  <p>
                    Payment confirmation is handled by the traceV backend.
                    Copying account details or returning to this page does not
                    itself mark an order as paid.
                  </p>
                </div>
              )}
            </>
          )}

          <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 sm:flex-row">
            <p className="text-xs text-slate-500">
              {lastUpdated
                ? `Last updated ${lastUpdated.toLocaleTimeString("en-NG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`
                : "Payment status is provided by traceV"}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 disabled:opacity-50"
            >
              {refreshing ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <RefreshCw size={14} />
              )}
              Refresh status
              <ArrowRight size={13} />
            </button>
          </div>
        </section>

        <aside className="min-w-0">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
            <h2 className="text-base font-bold text-slate-900">
              Payment details
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Check the details before proceeding.
            </p>

            <div className="my-5 border-t border-slate-100" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Merchant</span>
                <span className="max-w-[65%] break-words text-right text-sm font-semibold text-slate-800">
                  {merchantName}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Currency</span>
                <span className="text-sm font-semibold text-slate-800">
                  {currency}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Status</span>
                <StatusBadge status={paymentStatus} />
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-slate-500">Method</span>
                <span className="text-right text-sm font-semibold text-slate-800">
                  {transferAccount ? "Bank transfer" : "Paystack checkout"}
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-slate-100" />

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total to pay</p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">
                {formatMoney(amount, currency)}
              </p>
            </div>

            <div className="mt-5 flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Your payment is protected
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Payment confirmation comes from the server, not from a
                  browser redirect or a screenshot.
                </p>
              </div>
            </div>

            {reference && (
              <button
                type="button"
                onClick={() => copyText(reference, "Sidebar reference")}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {copiedField === "Sidebar reference" ? (
                  <Check size={16} className="text-emerald-600" />
                ) : (
                  <Copy size={16} />
                )}
                {copiedField === "Sidebar reference"
                  ? "Reference copied"
                  : "Copy payment reference"}
              </button>
            )}
          </div>
        </aside>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} traceV. Secure payment processing.
          </p>
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-500">
            <LockKeyhole size={13} />
            Payments are processed securely by Paystack.
          </p>
        </div>
      </footer>

      {showCancelConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCancelConfirm(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-checkout-title"
            className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
              <AlertCircle size={24} />
            </div>

            <h2
              id="cancel-checkout-title"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Leave checkout?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You will leave this payment page. If you have already transferred
              money, refresh the checkout later to confirm the payment status.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowCancelConfirm(false)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Stay here
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Leave checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
