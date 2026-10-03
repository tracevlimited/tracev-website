import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://tracev-backend.onrender.com";

const Icon = ({ name, size = 20, strokeWidth = 2 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  const paths = {
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    arrowLeft: (
      <>
        <path d="m15 18-6-6 6-6" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    building: (
      <>
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-5h6v5" />
        <path d="M9 11h.01" />
        <path d="M15 11h.01" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    receipt: (
      <>
        <path d="M4 3h16v18l-3-2-2 2-3-2-3 2-2-2-3 2Z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8.1 8.1 0 0 0-14.8-4L3 10" />
        <path d="M3 4v6h6" />
        <path d="M4 13a8.1 8.1 0 0 0 14.8 4L21 14" />
        <path d="M21 20v-6h-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
      </>
    ),
    external: (
      <>
        <path d="M14 3h7v7" />
        <path d="M10 14 21 3" />
        <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
};

const formatMoney = (value, currency = "NGN") => {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatAccountNumber = (value) => {
  const digits = String(value || "").replace(/\s+/g, "");

  if (!digits) return "—";

  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const normalizeStatus = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
};

const isSuccessfulStatus = (status) => {
  return [
    "paid",
    "success",
    "successful",
    "completed",
    "complete",
    "confirmed",
  ].includes(normalizeStatus(status));
};

const isFailedStatus = (status) => {
  return [
    "failed",
    "failure",
    "cancelled",
    "canceled",
    "expired",
    "declined",
  ].includes(normalizeStatus(status));
};

export default function ProcessPaymentPage() {
  const { checkoutId } = useParams();
  const navigate = useNavigate();

  const [checkout, setCheckout] = useState(null);
  const [paymentAccount, setPaymentAccount] = useState(null);
  const [bankName, setBankName] = useState("");

  const [loadingCheckout, setLoadingCheckout] = useState(true);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");
  const [accountError, setAccountError] = useState("");

  const [copiedField, setCopiedField] = useState("");
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const [lastUpdated, setLastUpdated] = useState(null);

  const merchantProfileId = checkout?.merchant?.profileId || "";

  const paymentStatus = useMemo(() => {
    return normalizeStatus(
      checkout?.paymentStatus ||
        checkout?.status ||
        checkout?.paystackStatus ||
        "pending"
    );
  }, [checkout]);

  const isPaid = isSuccessfulStatus(paymentStatus);
  const isFailed = isFailedStatus(paymentStatus);

  const activePaymentFlow =
    Boolean(checkout) && !isPaid && !isFailed;

  const loadCheckout = useCallback(
    async ({ silent = false } = {}) => {
      if (!checkoutId) {
        setError("Checkout ID is missing.");
        setLoadingCheckout(false);
        return null;
      }

      if (silent) {
        setRefreshing(true);
      } else {
        setLoadingCheckout(true);
      }

      setError("");

      try {
        const response = await axios.get(
          `${API_URL}/api/checkout/${encodeURIComponent(checkoutId)}`,
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 20000,
          }
        );

        const data =
          response.data?.data ||
          response.data ||
          null;

        if (!data) {
          throw new Error("Checkout information was not returned.");
        }

        setCheckout(data);
        setLastUpdated(new Date());

        return data;
      } catch (err) {
        console.error(
          "[PROCESS PAYMENT] Checkout load error:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load this checkout.";

        setError(message);
        return null;
      } finally {
        setLoadingCheckout(false);
        setRefreshing(false);
      }
    },
    [checkoutId]
  );

  const loadBankName = useCallback(async (bankCode) => {
    if (!bankCode) {
      setBankName("");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/api/banks`,
        {
          headers: {
            Accept: "application/json",
          },
          timeout: 12000,
        }
      );

      const raw =
        response.data?.data ||
        response.data?.banks ||
        response.data ||
        [];

      const banks = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.banks)
        ? raw.banks
        : [];

      const normalizedCode = String(bankCode)
        .trim()
        .toLowerCase();

      const matchingBank = banks.find((bank) => {
        const code = String(
          bank?.code ??
            bank?.bankCode ??
            bank?.bank_code ??
            ""
        )
          .trim()
          .toLowerCase();

        return code === normalizedCode;
      });

      if (matchingBank) {
        setBankName(
          matchingBank.name ||
            matchingBank.bankName ||
            matchingBank.bank_name ||
            ""
        );
      } else {
        setBankName("");
      }
    } catch (err) {
      console.warn(
        "[PROCESS PAYMENT] Bank directory lookup failed:",
        err
      );

      setBankName("");
    }
  }, []);

  const loadPaymentAccount = useCallback(
    async (profileId) => {
      if (!profileId) {
        setAccountError(
          "The merchant payment account could not be identified."
        );
        return null;
      }

      setLoadingAccount(true);
      setAccountError("");

      try {
        const response = await axios.get(
          `${API_URL}/api/profile/${encodeURIComponent(
            profileId
          )}/account`,
          {
            headers: {
              Accept: "application/json",
            },
            timeout: 20000,
          }
        );

        const data =
          response.data?.data ||
          response.data ||
          null;

        const account =
          data?.account ||
          null;

        if (!account) {
          throw new Error(
            "The merchant payment account is not available."
          );
        }

        setPaymentAccount(account);

        if (account.bankCode) {
          loadBankName(account.bankCode);
        } else {
          setBankName("");
        }

        return account;
      } catch (err) {
        console.error(
          "[PROCESS PAYMENT] Payment account load error:",
          err
        );

        const message =
          err.response?.data?.message ||
          err.message ||
          "Unable to load the merchant payment account.";

        setAccountError(message);
        return null;
      } finally {
        setLoadingAccount(false);
      }
    },
    [loadBankName]
  );

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const data = await loadCheckout();

      if (!mounted || !data) return;

      const profileId = data?.merchant?.profileId;

      if (profileId) {
        await loadPaymentAccount(profileId);
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [loadCheckout, loadPaymentAccount]);

  useEffect(() => {
    if (!activePaymentFlow) {
      return undefined;
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [activePaymentFlow]);

  useEffect(() => {
    if (!copiedField) return undefined;

    const timer = window.setTimeout(() => {
      setCopiedField("");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [copiedField]);

  const copyText = async (text, field) => {
    if (!text) return;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(String(text));
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = String(text);
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedField(field);
    } catch (err) {
      console.error(
        "[PROCESS PAYMENT] Copy failed:",
        err
      );
    }
  };

  const copyAllPaymentDetails = async () => {
    if (!paymentAccount) return;

    const details = [
      `Bank: ${
        bankName ||
        (paymentAccount.bankCode
          ? `Bank code ${paymentAccount.bankCode}`
          : "Not provided")
      }`,
      `Account name: ${
        paymentAccount.accountName || "Not provided"
      }`,
      `Account number: ${
        paymentAccount.accountNumber || "Not provided"
      }`,
      `Amount: ${formatMoney(
        checkout?.total ?? checkout?.amount,
        checkout?.currency || "NGN"
      )}`,
      `Reference: ${checkout?.reference || checkoutId}`,
    ].join("\n");

    await copyText(details, "all");
  };

  const handleRefresh = async () => {
    const data = await loadCheckout({ silent: true });

    if (!data) return;

    const profileId = data?.merchant?.profileId;

    if (
      profileId &&
      (!paymentAccount ||
        profileId !== merchantProfileId)
    ) {
      await loadPaymentAccount(profileId);
    }
  };

  const handleCancel = () => {
    setShowCancelConfirm(false);

    const profileId =
      checkout?.merchant?.profileId ||
      "";

    if (profileId) {
      navigate(`/pay/${encodeURIComponent(profileId)}`);
      return;
    }

    navigate(-1);
  };

  const handleRetryAccount = async () => {
    if (!merchantProfileId) return;
    await loadPaymentAccount(merchantProfileId);
  };

  if (loadingCheckout) {
    return (
      <div className="process-page">
        <style>{styles}</style>

        <div className="process-shell process-loading-shell">
          <div className="loading-mark">
            <div className="loading-spinner" />
          </div>

          <h1>Preparing your payment</h1>

          <p>
            Securely loading your checkout and payment
            instructions.
          </p>
        </div>
      </div>
    );
  }

  if (error && !checkout) {
    return (
      <div className="process-page">
        <style>{styles}</style>

        <div className="process-shell">
          <div className="topbar">
            <button
              type="button"
              className="icon-button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <Icon name="arrowLeft" size={20} />
            </button>

            <div className="brand">
              <span className="brand-mark">T</span>
              <span>traceV</span>
            </div>

            <div className="topbar-spacer" />
          </div>

          <div className="state-card error-state">
            <div className="state-icon error-icon">
              <Icon name="info" size={24} />
            </div>

            <h1>Unable to load payment</h1>

            <p>{error}</p>

            <button
              type="button"
              className="primary-button"
              onClick={() => loadCheckout()}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const accountNumber =
    paymentAccount?.accountNumber || "";

  const accountName =
    paymentAccount?.accountName || "";

  const amount =
    checkout?.total ??
    checkout?.amount ??
    0;

  const currency =
    checkout?.currency || "NGN";

  const merchantName =
    checkout?.merchant?.name ||
    "TraceV Merchant";

  return (
    <div className="process-page">
      <style>{styles}</style>

      <div className="process-shell">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">T</span>
            <span>traceV</span>
          </div>

          <button
            type="button"
            className="cancel-button"
            onClick={() => setShowCancelConfirm(true)}
            aria-label="Cancel payment"
          >
            <Icon name="x" size={20} />
          </button>
        </header>

        <main className="content">
          <section className="intro">
            <div className="secure-pill">
              <Icon name="shield" size={15} />
              <span>Secure payment</span>
            </div>

            <h1>
              Complete your payment
            </h1>

            <p>
              Transfer the exact amount below to the
              merchant's verified account.
            </p>
          </section>

          <section className="amount-card">
            <div>
              <span className="eyebrow">
                Amount to pay
              </span>

              <div className="amount">
                {formatMoney(amount, currency)}
              </div>
            </div>

            <div className="amount-status">
              {isPaid ? (
                <>
                  <span className="status-dot paid" />
                  Paid
                </>
              ) : isFailed ? (
                <>
                  <span className="status-dot failed" />
                  {paymentStatus === "expired"
                    ? "Expired"
                    : "Payment failed"}
                </>
              ) : (
                <>
                  <span className="status-dot waiting" />
                  Waiting for payment
                </>
              )}
            </div>
          </section>

          <section className="merchant-row">
            <div className="merchant-avatar">
              {merchantName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="merchant-info">
              <span>Paying</span>
              <strong>{merchantName}</strong>
            </div>

            <div className="reference-box">
              <span>Reference</span>
              <strong>
                {checkout?.reference || checkoutId}
              </strong>
            </div>
          </section>

          {isPaid ? (
            <section className="state-card success-state">
              <div className="state-icon success-icon">
                <Icon name="check" size={25} />
              </div>

              <h2>Payment received</h2>

              <p>
                Your payment has been confirmed
                successfully.
              </p>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(-1)}
              >
                Continue
              </button>
            </section>
          ) : isFailed ? (
            <section className="state-card error-state">
              <div className="state-icon error-icon">
                <Icon name="info" size={24} />
              </div>

              <h2>
                {paymentStatus === "expired"
                  ? "Checkout expired"
                  : "Payment could not be completed"}
              </h2>

              <p>
                This checkout is no longer waiting for
                payment.
              </p>

              <button
                type="button"
                className="primary-button"
                onClick={() =>
                  navigate(
                    `/pay/${encodeURIComponent(
                      merchantProfileId
                    )}`
                  )
                }
              >
                Return to payment
              </button>
            </section>
          ) : (
            <>
              <section className="payment-card">
                <div className="section-heading">
                  <div className="section-icon">
                    <Icon
                      name="building"
                      size={21}
                    />
                  </div>

                  <div>
                    <h2>Transfer to this account</h2>
                    <p>
                      Use your bank app to make the
                      transfer.
                    </p>
                  </div>
                </div>

                {loadingAccount ? (
                  <div className="account-loading">
                    <div className="mini-spinner" />
                    <span>
                      Loading merchant account...
                    </span>
                  </div>
                ) : accountError ? (
                  <div className="account-error">
                    <div className="account-error-icon">
                      <Icon
                        name="info"
                        size={18}
                      />
                    </div>

                    <div>
                      <strong>
                        Account details unavailable
                      </strong>

                      <p>{accountError}</p>

                      <button
                        type="button"
                        className="text-button"
                        onClick={handleRetryAccount}
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                ) : paymentAccount ? (
                  <div className="account-details">
                    <div className="bank-row">
                      <div className="bank-logo">
                        <Icon
                          name="building"
                          size={21}
                        />
                      </div>

                      <div>
                        <span>Bank</span>

                        <strong>
                          {bankName ||
                            (paymentAccount.bankCode
                              ? `Bank code ${paymentAccount.bankCode}`
                              : "Bank")}
                        </strong>
                      </div>
                    </div>

                    <div className="detail-divider" />

                    <div className="detail-row">
                      <div>
                        <span>Account name</span>
                        <strong>
                          {accountName || "—"}
                        </strong>
                      </div>
                    </div>

                    <div className="detail-divider" />

                    <div className="account-number-row">
                      <div>
                        <span>Account number</span>

                        <strong className="account-number">
                          {formatAccountNumber(
                            accountNumber
                          )}
                        </strong>
                      </div>

                      <button
                        type="button"
                        className="copy-button"
                        onClick={() =>
                          copyText(
                            accountNumber,
                            "account"
                          )
                        }
                        disabled={!accountNumber}
                      >
                        <Icon
                          name={
                            copiedField === "account"
                              ? "check"
                              : "copy"
                          }
                          size={17}
                        />

                        {copiedField === "account"
                          ? "Copied"
                          : "Copy"}
                      </button>
                    </div>

                    <button
                      type="button"
                      className="copy-all-button"
                      onClick={copyAllPaymentDetails}
                    >
                      <Icon
                        name={
                          copiedField === "all"
                            ? "check"
                            : "copy"
                        }
                        size={17}
                      />

                      {copiedField === "all"
                        ? "Payment details copied"
                        : "Copy all payment details"}
                    </button>
                  </div>
                ) : null}
              </section>

              <section className="instruction-card">
                <div className="instruction-icon">
                  <Icon name="clock" size={20} />
                </div>

                <div>
                  <h3>Waiting for your transfer</h3>

                  <p>
                    After you make the transfer, TraceV
                    will update this checkout when the
                    payment is confirmed. Keep this page
                    open while your payment is being
                    processed.
                  </p>
                </div>
              </section>

              <section className="status-actions">
                <button
                  type="button"
                  className="refresh-button"
                  onClick={handleRefresh}
                  disabled={refreshing}
                >
                  <Icon
                    name="refresh"
                    size={18}
                  />

                  {refreshing
                    ? "Checking..."
                    : "Refresh payment status"}
                </button>

                {lastUpdated && (
                  <span className="last-updated">
                    Last checked{" "}
                    {lastUpdated.toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                )}
              </section>

              <div className="warning-box">
                <Icon name="info" size={18} />

                <p>
                  <strong>Important:</strong> Only send
                  exactly{" "}
                  <strong>
                    {formatMoney(amount, currency)}
                  </strong>{" "}
                  to the account shown above. Do not
                  refresh or close this page until your
                  payment is confirmed.
                </p>
              </div>
            </>
          )}

          <footer className="footer">
            <div className="footer-secure">
              <Icon name="shield" size={16} />
              <span>
                Secured by traceV
              </span>
            </div>

            <span>
              Checkout {checkoutId}
            </span>
          </footer>
        </main>
      </div>

      {showCancelConfirm && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCancelConfirm(false);
            }
          }}
        >
          <div
            className="cancel-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-title"
          >
            <div className="modal-icon">
              <Icon name="x" size={21} />
            </div>

            <h2 id="cancel-title">
              Cancel this payment?
            </h2>

            <p>
              Your checkout will remain unpaid. You can
              return to the merchant's payment page and
              start again.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-secondary"
                onClick={() =>
                  setShowCancelConfirm(false)
                }
              >
                Keep payment
              </button>

              <button
                type="button"
                className="modal-danger"
                onClick={handleCancel}
              >
                Cancel payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = `
  * {
    box-sizing: border-box;
  }

  .process-page {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at 50% -20%,
        rgba(37, 99, 235, 0.08),
        transparent 40%
      ),
      #f7f8fa;
    color: #111827;
    font-family:
      Inter,
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
  }

  .process-shell {
    width: min(100%, 760px);
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 22px 42px;
  }

  .topbar {
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .brand-mark {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border-radius: 9px;
    background: #111827;
    color: white;
    font-size: 16px;
    font-weight: 800;
  }

  .icon-button,
  .cancel-button {
    border: 0;
    background: white;
    color: #374151;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    cursor: pointer;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(17, 24, 39, 0.06);
    transition:
      transform 0.18s ease,
      background 0.18s ease;
  }

  .icon-button:hover,
  .cancel-button:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
  }

  .cancel-button {
    color: #4b5563;
  }

  .topbar-spacer {
    width: 42px;
  }

  .content {
    padding-top: 12px;
  }

  .intro {
    text-align: center;
    padding: 16px 0 28px;
  }

  .secure-pill {
    width: fit-content;
    margin: 0 auto 15px;
    padding: 7px 11px;
    display: flex;
    align-items: center;
    gap: 6px;
    border-radius: 999px;
    background: #eef6ff;
    color: #1769aa;
    font-size: 12px;
    font-weight: 700;
  }

  .intro h1 {
    margin: 0;
    font-size: clamp(30px, 5vw, 40px);
    line-height: 1.08;
    letter-spacing: -0.055em;
  }

  .intro p {
    max-width: 530px;
    margin: 13px auto 0;
    color: #6b7280;
    font-size: 15px;
    line-height: 1.6;
  }

  .amount-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 24px;
    border-radius: 20px;
    background: #111827;
    color: white;
    box-shadow:
      0 18px 40px rgba(17, 24, 39, 0.13);
  }

  .eyebrow {
    display: block;
    margin-bottom: 6px;
    color: #9ca3af;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .amount {
    font-size: clamp(29px, 5vw, 40px);
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.05em;
  }

  .amount-status {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 11px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.09);
    color: #e5e7eb;
    white-space: nowrap;
    font-size: 12px;
    font-weight: 700;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #fbbf24;
  }

  .status-dot.paid {
    background: #34d399;
  }

  .status-dot.failed {
    background: #fb7185;
  }

  .status-dot.waiting {
    background: #fbbf24;
  }

  .merchant-row {
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 19px 4px 22px;
  }

  .merchant-avatar {
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: #e5e7eb;
    color: #111827;
    font-size: 17px;
    font-weight: 800;
  }

  .merchant-info {
    min-width: 0;
    flex: 1;
  }

  .merchant-info span,
  .reference-box span {
    display: block;
    margin-bottom: 3px;
    color: #9ca3af;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .merchant-info strong {
    display: block;
    overflow: hidden;
    color: #1f2937;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .reference-box {
    text-align: right;
  }

  .reference-box strong {
    display: block;
    max-width: 210px;
    overflow: hidden;
    color: #6b7280;
    font-size: 11px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .payment-card,
  .instruction-card,
  .warning-box {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    box-shadow:
      0 8px 30px rgba(17, 24, 39, 0.045);
  }

  .payment-card {
    padding: 23px;
  }

  .section-heading {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 21px;
  }

  .section-icon {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: #eef2ff;
    color: #4f46e5;
  }

  .section-heading h2 {
    margin: 1px 0 4px;
    font-size: 17px;
    letter-spacing: -0.02em;
  }

  .section-heading p {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.45;
  }

  .account-details {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
  }

  .bank-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background: #fafafa;
  }

  .bank-logo {
    width: 42px;
    height: 42px;
    display: grid;
    place-items: center;
    border-radius: 12px;
    background: #111827;
    color: white;
  }

  .bank-row span,
  .detail-row span,
  .account-number-row span {
    display: block;
    margin-bottom: 5px;
    color: #9ca3af;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .bank-row strong,
  .detail-row strong {
    color: #1f2937;
    font-size: 14px;
    font-weight: 750;
  }

  .detail-divider {
    height: 1px;
    background: #edf0f2;
  }

  .detail-row {
    padding: 17px 16px;
  }

  .account-number-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 17px 16px;
  }

  .account-number {
    color: #111827 !important;
    font-size: 21px !important;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }

  .copy-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 82px;
    padding: 9px 12px;
    border: 1px solid #dfe3e8;
    border-radius: 10px;
    background: white;
    color: #374151;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: 0.18s ease;
  }

  .copy-button:hover:not(:disabled) {
    background: #f9fafb;
    border-color: #cfd5dc;
  }

  .copy-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .copy-all-button {
    width: 100%;
    margin-top: 1px;
    padding: 13px;
    border: 0;
    border-top: 1px solid #edf0f2;
    background: #fafafa;
    color: #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: background 0.18s ease;
  }

  .copy-all-button:hover {
    background: #f3f4f6;
  }

  .account-loading {
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #6b7280;
    font-size: 13px;
  }

  .mini-spinner,
  .loading-spinner {
    border-radius: 50%;
    border: 3px solid #e5e7eb;
    border-top-color: #111827;
    animation: spin 0.8s linear infinite;
  }

  .mini-spinner {
    width: 19px;
    height: 19px;
  }

  .loading-spinner {
    width: 32px;
    height: 32px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .account-error {
    display: flex;
    gap: 12px;
    padding: 16px;
    border-radius: 14px;
    background: #fff7f7;
    border: 1px solid #fee2e2;
  }

  .account-error-icon {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    background: #fee2e2;
    color: #dc2626;
  }

  .account-error strong {
    display: block;
    margin-bottom: 4px;
    color: #991b1b;
    font-size: 13px;
  }

  .account-error p {
    margin: 0 0 8px;
    color: #7f1d1d;
    font-size: 12px;
    line-height: 1.45;
  }

  .text-button {
    padding: 0;
    border: 0;
    background: transparent;
    color: #b91c1c;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .instruction-card {
    display: flex;
    gap: 13px;
    margin-top: 14px;
    padding: 17px;
  }

  .instruction-icon {
    width: 38px;
    height: 38px;
    flex: 0 0 38px;
    display: grid;
    place-items: center;
    border-radius: 11px;
    background: #fff7ed;
    color: #ea580c;
  }

  .instruction-card h3 {
    margin: 1px 0 5px;
    color: #1f2937;
    font-size: 14px;
  }

  .instruction-card p {
    margin: 0;
    color: #6b7280;
    font-size: 12px;
    line-height: 1.55;
  }

  .status-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding: 18px 0 3px;
  }

  .refresh-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 42px;
    padding: 0 16px;
    border: 1px solid #dfe3e8;
    border-radius: 11px;
    background: white;
    color: #374151;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
    transition: 0.18s ease;
  }

  .refresh-button:hover:not(:disabled) {
    background: #f9fafb;
    transform: translateY(-1px);
  }

  .refresh-button:disabled {
    cursor: wait;
    opacity: 0.65;
  }

  .last-updated {
    color: #9ca3af;
    font-size: 11px;
  }

  .warning-box {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-top: 17px;
    padding: 14px 15px;
    background: #fffbeb;
    border-color: #fde68a;
    color: #92400e;
  }

  .warning-box p {
    margin: 0;
    font-size: 11px;
    line-height: 1.55;
  }

  .warning-box strong {
    font-weight: 800;
  }

  .state-card {
    padding: 35px 25px;
    text-align: center;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 20px;
    box-shadow:
      0 8px 30px rgba(17, 24, 39, 0.045);
  }

  .state-icon {
    width: 55px;
    height: 55px;
    margin: 0 auto 15px;
    display: grid;
    place-items: center;
    border-radius: 17px;
  }

  .success-icon {
    background: #ecfdf5;
    color: #059669;
  }

  .error-icon {
    background: #fef2f2;
    color: #dc2626;
  }

  .state-card h1,
  .state-card h2 {
    margin: 0 0 8px;
    color: #111827;
    letter-spacing: -0.03em;
  }

  .state-card h1 {
    font-size: 24px;
  }

  .state-card h2 {
    font-size: 20px;
  }

  .state-card p {
    max-width: 430px;
    margin: 0 auto 21px;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.55;
  }

  .primary-button,
  .secondary-button {
    min-height: 46px;
    padding: 0 22px;
    border-radius: 11px;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  }

  .primary-button {
    border: 0;
    background: #111827;
    color: white;
  }

  .secondary-button {
    border: 1px solid #dfe3e8;
    background: white;
    color: #374151;
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 28px 2px 0;
    color: #9ca3af;
    font-size: 10px;
  }

  .footer-secure {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .process-loading-shell {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .loading-mark {
    width: 68px;
    height: 68px;
    margin-bottom: 20px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    background: white;
    box-shadow:
      0 12px 35px rgba(17, 24, 39, 0.08);
  }

  .process-loading-shell h1 {
    margin: 0 0 8px;
    font-size: 21px;
    letter-spacing: -0.03em;
  }

  .process-loading-shell p {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
  }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: rgba(17, 24, 39, 0.52);
    backdrop-filter: blur(5px);
  }

  .cancel-modal {
    width: min(100%, 420px);
    padding: 25px;
    border-radius: 20px;
    background: white;
    box-shadow:
      0 30px 80px rgba(0, 0, 0, 0.2);
  }

  .modal-icon {
    width: 43px;
    height: 43px;
    margin-bottom: 17px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: #fef2f2;
    color: #dc2626;
  }

  .cancel-modal h2 {
    margin: 0 0 8px;
    color: #111827;
    font-size: 20px;
    letter-spacing: -0.03em;
  }

  .cancel-modal p {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
    line-height: 1.6;
  }

  .modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 23px;
  }

  .modal-secondary,
  .modal-danger {
    min-height: 45px;
    border-radius: 11px;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }

  .modal-secondary {
    border: 1px solid #dfe3e8;
    background: white;
    color: #374151;
  }

  .modal-danger {
    border: 0;
    background: #dc2626;
    color: white;
  }

  @media (max-width: 600px) {
    .process-shell {
      padding: 0 15px 30px;
    }

    .topbar {
      height: 68px;
    }

    .content {
      padding-top: 5px;
    }

    .intro {
      padding: 12px 0 22px;
    }

    .intro h1 {
      font-size: 30px;
    }

    .amount-card {
      align-items: flex-start;
      flex-direction: column;
      padding: 20px;
    }

    .amount-status {
      align-self: flex-start;
    }

    .merchant-row {
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .reference-box {
      width: 100%;
      padding-left: 57px;
      text-align: left;
    }

    .reference-box strong {
      max-width: 100%;
    }

    .payment-card {
      padding: 18px;
    }

    .account-number-row {
      align-items: flex-start;
      flex-direction: column;
    }

    .copy-button {
      width: 100%;
    }

    .account-number {
      font-size: 19px !important;
    }

    .footer {
      align-items: flex-start;
      flex-direction: column;
    }

    .modal-actions {
      grid-template-columns: 1fr;
    }
  }
`;