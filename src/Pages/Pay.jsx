import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const API_URL = "https://tracev-backend.onrender.com";
const MINIMUM_PAYMENT = 100;

/* =========================================================
   INLINE ICONS
   ========================================================= */

function Icon({
  children,
  size = 20,
  strokeWidth = 1.8,
  className = "",
  viewBox = "0 0 24 24",
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
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

const Banknote = (props) => (
  <Icon {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </Icon>
);

const Check = (props) => (
  <Icon {...props}>
    <path d="m5 12 4 4L19 6" />
  </Icon>
);

const Folder = (props) => (
  <Icon {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
  </Icon>
);

const FolderOpen = (props) => (
  <Icon {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v1H5a2 2 0 0 0-2 2Z" />
    <path d="M3 12h18l-2 7H5a2 2 0 0 1-2-2Z" />
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

const Minus = (props) => (
  <Icon {...props}>
    <path d="M5 12h14" />
  </Icon>
);

const Plus = (props) => (
  <Icon {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

const Receipt = (props) => (
  <Icon {...props}>
    <path d="M4 3v18l3-2 3 2 2-2 2 2 3-2 3 2V3l-3 2-3-2-2 2-3-2-3 2Z" />
    <path d="M8 9h8M8 13h8M8 17h4" />
  </Icon>
);

const Search = (props) => (
  <Icon {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </Icon>
);

const ShoppingBag = (props) => (
  <Icon {...props}>
    <path d="M6 8h12l1 13H5L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);

const WalletCards = (props) => (
  <Icon {...props}>
    <rect width="18" height="14" x="3" y="5" rx="2" />
    <path d="M3 9h18" />
    <path d="M16 14h2" />
  </Icon>
);

const X = (props) => (
  <Icon {...props}>
    <path d="m6 6 12 12" />
    <path d="m18 6-12 12" />
  </Icon>
);

/* =========================================================
   GET PUBLIC PAGE ID
   ========================================================= */

function getPublicPageId() {
  if (typeof window === "undefined") {
    return "";
  }

  const segments = window.location.pathname
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);

  if (segments.length === 0) {
    return "";
  }

  const lastSegment = segments[segments.length - 1];

  try {
    return decodeURIComponent(lastSegment);
  } catch {
    return lastSegment;
  }
}

/* =========================================================
   MONEY
   ========================================================= */

function formatMoney(amount) {
  return Number(amount || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* =========================================================
   NORMALIZE ITEM
   ========================================================= */

function normalizeItem(item, walletIndex, itemIndex) {
  return {
    ...item,
    id:
      item?.id ||
      item?._id ||
      item?.itemId ||
      `item-${walletIndex}-${itemIndex}`,

    name: item?.name || item?.title || "Payment Item",

    description: item?.description || "",

    price: Number(
      item?.price ??
        item?.amount ??
        item?.unitPrice ??
        item?.unit_price ??
        0
    ),
  };
}

/* =========================================================
   NORMALIZE WALLET
   ========================================================= */

function normalizeWallet(wallet, walletIndex) {
  const rawItems = Array.isArray(wallet?.items)
    ? wallet.items
    : Array.isArray(wallet?.paymentItems)
    ? wallet.paymentItems
    : [];

  return {
    ...wallet,

    id:
      wallet?.id ||
      wallet?._id ||
      wallet?.walletId ||
      `wallet-${walletIndex}`,

    name:
      wallet?.name ||
      wallet?.title ||
      "Payment Wallet",

    description: wallet?.description || "",

    paymentId:
      wallet?.paymentId ||
      wallet?.payment_id ||
      wallet?.slug ||
      wallet?.id ||
      "",

    items: rawItems.map((item, itemIndex) =>
      normalizeItem(item, walletIndex, itemIndex)
    ),
  };
}

/* =========================================================
   PAY PAGE
   ========================================================= */

export default function Pay() {
  /* =======================================================
     PUBLIC PAGE ID
     ======================================================= */

  const id = useMemo(() => getPublicPageId(), []);

  /* =======================================================
     PAGE DATA
     ======================================================= */

  const [merchant, setMerchant] = useState(null);
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* =======================================================
     ACTIVE WALLET
     ======================================================= */

  const [activeWallet, setActiveWallet] = useState(null);
  const [walletOpening, setWalletOpening] = useState(false);

  /* =======================================================
     SEARCH
     ======================================================= */

  const [walletSearch, setWalletSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");

  /* =======================================================
     CART
     ======================================================= */

  const [cart, setCart] = useState({});

  /* =======================================================
     CHECKOUT
     ======================================================= */

  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
  });

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  /* =======================================================
     LOAD PUBLIC PAYMENT PAGE
     ======================================================= */

  useEffect(() => {
    let mounted = true;

    const loadPublicPage = async () => {
      if (!id) {
        setLoadError("Invalid payment page.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setLoadError("");

        const response = await axios.get(
          `${API_URL}/api/wallet/items?userId=${encodeURIComponent(id)}`,
          {
            headers: {
              Accept: "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!mounted) return;

        const payload =
          response.data?.data ??
          response.data ??
          {};

        const merchantData =
          payload?.merchant ||
          payload?.profile ||
          null;

        let rawWallets = [];

        if (Array.isArray(payload)) {
          rawWallets = payload;
        } else if (Array.isArray(payload?.wallets)) {
          rawWallets = payload.wallets;
        } else if (Array.isArray(response.data?.wallets)) {
          rawWallets = response.data.wallets;
        } else if (Array.isArray(payload?.items)) {
          rawWallets = [
            {
              id: "default-wallet",
              name: "Payment Wallet",
              description: "Available payment items",
              items: payload.items,
            },
          ];
        } else if (Array.isArray(response.data?.items)) {
          rawWallets = [
            {
              id: "default-wallet",
              name: "Payment Wallet",
              description: "Available payment items",
              items: response.data.items,
            },
          ];
        }

        const normalizedWallets = rawWallets.map(
          (wallet, walletIndex) =>
            normalizeWallet(wallet, walletIndex)
        );

        setMerchant(merchantData);
        setWallets(normalizedWallets);
      } catch (error) {
        console.error(
          "Public payment page failed:",
          error
        );

        if (!mounted) return;

        setLoadError(
          error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load this payment page."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPublicPage();

    return () => {
      mounted = false;
    };
  }, [id]);

  /* =======================================================
     ALL ITEMS
     ======================================================= */

  const allItems = useMemo(() => {
    return wallets.flatMap(
      (wallet) => wallet.items || []
    );
  }, [wallets]);

  /* =======================================================
     FILTER WALLETS
     ======================================================= */

  const filteredWallets = useMemo(() => {
    const query = walletSearch.trim().toLowerCase();

    if (!query) return wallets;

    return wallets.filter((wallet) => {
      const walletName = String(
        wallet.name || ""
      ).toLowerCase();

      const walletDescription = String(
        wallet.description || ""
      ).toLowerCase();

      const itemMatch = (wallet.items || []).some(
        (item) => {
          const itemName = String(
            item.name || ""
          ).toLowerCase();

          const itemDescription = String(
            item.description || ""
          ).toLowerCase();

          return (
            itemName.includes(query) ||
            itemDescription.includes(query)
          );
        }
      );

      return (
        walletName.includes(query) ||
        walletDescription.includes(query) ||
        itemMatch
      );
    });
  }, [wallets, walletSearch]);

  /* =======================================================
     FILTER ACTIVE WALLET ITEMS
     ======================================================= */

  const filteredActiveWalletItems = useMemo(() => {
    const items = activeWallet?.items || [];

    const query = itemSearch.trim().toLowerCase();

    if (!query) return items;

    return items.filter((item) => {
      const name = String(
        item.name || ""
      ).toLowerCase();

      const description = String(
        item.description || ""
      ).toLowerCase();

      return (
        name.includes(query) ||
        description.includes(query)
      );
    });
  }, [activeWallet, itemSearch]);

  /* =======================================================
     OPEN WALLET
     ======================================================= */

  const openWallet = (wallet) => {
    setPaymentError("");
    setShowPaymentForm(false);
    setItemSearch("");
    setWalletOpening(true);

    setTimeout(() => {
      setActiveWallet(wallet);
      setWalletOpening(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 140);
  };

  /* =======================================================
     CLOSE WALLET
     ======================================================= */

  const closeWallet = () => {
    if (paymentLoading) return;

    setPaymentError("");
    setShowPaymentForm(false);
    setItemSearch("");
    setWalletOpening(true);

    setTimeout(() => {
      setActiveWallet(null);
      setWalletOpening(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 140);
  };

  /* =======================================================
     TOGGLE ITEM
     ======================================================= */

  const toggleItem = (itemId) => {
    setCart((previous) => ({
      ...previous,

      [itemId]: {
        checked: !previous[itemId]?.checked,
        quantity:
          Number(
            previous[itemId]?.quantity || 1
          ) || 1,
      },
    }));

    setPaymentError("");
  };

  /* =======================================================
     INCREASE
     ======================================================= */

  const increaseQuantity = (itemId) => {
    setCart((previous) => ({
      ...previous,

      [itemId]: {
        checked:
          previous[itemId]?.checked ?? true,

        quantity:
          Number(
            previous[itemId]?.quantity || 1
          ) + 1,
      },
    }));

    setPaymentError("");
  };

  /* =======================================================
     DECREASE
     ======================================================= */

  const decreaseQuantity = (itemId) => {
    setCart((previous) => ({
      ...previous,

      [itemId]: {
        checked:
          previous[itemId]?.checked ?? true,

        quantity: Math.max(
          1,
          Number(
            previous[itemId]?.quantity || 1
          ) - 1
        ),
      },
    }));

    setPaymentError("");
  };

  /* =======================================================
     MANUAL QUANTITY
     ======================================================= */

  const handleQuantityChange = (
    itemId,
    value
  ) => {
    if (value === "") {
      setCart((previous) => ({
        ...previous,

        [itemId]: {
          checked:
            previous[itemId]?.checked ?? true,
          quantity: "",
        },
      }));

      return;
    }

    if (!/^\d+$/.test(value)) return;

    setCart((previous) => ({
      ...previous,

      [itemId]: {
        checked:
          previous[itemId]?.checked ?? true,
        quantity: value,
      },
    }));

    setPaymentError("");
  };

  /* =======================================================
     QUANTITY BLUR
     ======================================================= */

  const handleQuantityBlur = (itemId) => {
    setCart((previous) => {
      const current = previous[itemId];

      if (!current) {
        return previous;
      }

      const parsed = parseInt(
        current.quantity,
        10
      );

      return {
        ...previous,

        [itemId]: {
          ...current,

          quantity:
            Number.isFinite(parsed) &&
            parsed >= 1
              ? parsed
              : 1,
        },
      };
    });
  };

  /* =======================================================
     SELECTED ITEMS
     ======================================================= */

  const selectedItems = useMemo(() => {
    return allItems
      .filter(
        (item) => cart[item.id]?.checked
      )
      .map((item) => {
        const quantity =
          Number(
            cart[item.id]?.quantity
          ) || 1;

        const unitPrice =
          Number(item.price) || 0;

        return {
          ...item,
          quantity,
          unitPrice,
          total: unitPrice * quantity,
        };
      });
  }, [allItems, cart]);

  /* =======================================================
     TOTALS
     ======================================================= */

  const selectedCount =
    selectedItems.length;

  const totalQuantity =
    selectedItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  const subtotal =
    selectedItems.reduce(
      (total, item) =>
        total + item.total,
      0
    );

  /* =======================================================
     ACTIVE WALLET SELECTED COUNT
     ======================================================= */

  const activeWalletSelectedCount =
    (activeWallet?.items || []).filter(
      (item) =>
        cart[item.id]?.checked
    ).length;

  /* =======================================================
     CUSTOMER CHANGE
     ======================================================= */

  const handleCustomerChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (paymentError) {
      setPaymentError("");
    }
  };

  /* =======================================================
     CONTINUE TO CUSTOMER FORM
     ======================================================= */

  const handleContinueToPayment = () => {
    if (selectedItems.length === 0) {
      setPaymentError(
        "Please select at least one payment item."
      );
      return;
    }

    if (subtotal < MINIMUM_PAYMENT) {
      setPaymentError(
        `The minimum payment is ₦${MINIMUM_PAYMENT.toLocaleString()}.`
      );
      return;
    }

    setPaymentError("");
    setShowPaymentForm(true);

    setTimeout(() => {
      document
        .getElementById(
          "customer-payment-form"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 120);
  };

  /* =======================================================
     CREATE TRACEV CHECKOUT

     IMPORTANT:
     This does NOT initialize Paystack.

     The backend is authoritative for:
     - item prices
     - subtotal
     - TraceV service fee
     - customer total

     The customer is redirected to:
     /checkout/:checkoutId

     Payment method is selected there.
     ======================================================= */

  const handleCreateCheckout = async (
    event
  ) => {
    event.preventDefault();

    setPaymentError("");

    if (!customer.name.trim()) {
      setPaymentError(
        "Please enter your full name."
      );
      return;
    }

    if (!customer.phone.trim()) {
      setPaymentError(
        "Please enter your phone number."
      );
      return;
    }

    if (selectedItems.length === 0) {
      setPaymentError(
        "Please select at least one payment item."
      );
      return;
    }

    if (subtotal < MINIMUM_PAYMENT) {
      setPaymentError(
        `The minimum payment is ₦${MINIMUM_PAYMENT.toLocaleString()}.`
      );
      return;
    }

    setPaymentLoading(true);

    try {
      const cartItems =
        selectedItems.map((item) => ({
          itemId: item.id,
          quantity: item.quantity,
        }));

      /*
       * Only send the information needed
       * to create the checkout.
       *
       * The backend calculates:
       * - subtotal
       * - TraceV service fee
       * - final total
       */
      const response =
        await axios.post(
          `${API_URL}/api/payment/initialize`,
          {
            profileId: id,
            buyerName:
              customer.name.trim(),
            buyerPhone:
              customer.phone.trim(),
            cartItems,
            currency: "NGN",
          },
          {
            headers: {
              Accept:
                "application/json",
              "Content-Type":
                "application/json",
            },
          }
        );

      console.log(
        "[TRACEV CHECKOUT CREATED]",
        response.data
      );

      const checkout =
        response.data?.data ||
        response.data ||
        {};

      const checkoutId =
        checkout.checkoutId ||
        checkout.transactionId ||
        checkout.id;

      if (!checkoutId) {
        throw new Error(
          "Checkout ID was not returned by the server."
        );
      }

      /*
       * No payment has happened yet.
       *
       * Move the customer to the TraceV
       * checkout review page.
       */
      window.location.href =
        `/checkout/${encodeURIComponent(
          checkoutId
        )}`;
    } catch (error) {
      console.error(
        "Checkout creation failed:",
        error
      );

      const backendMessage =
        error?.response?.data
          ?.message ||
        error?.response?.data?.error ||
        error?.response?.data
          ?.details ||
        error?.message;

      setPaymentError(
        backendMessage ||
          "Unable to create your checkout. Please try again."
      );

      setPaymentLoading(false);
    }
  };

  /* =======================================================
     MERCHANT DISPLAY
     ======================================================= */

  const merchantName = [
    merchant?.firstName,
    merchant?.lastName,
  ]
    .filter(Boolean)
    .join(" ")
    .trim() ||
    merchant?.businessName ||
    merchant?.name ||
    "traceV Payment";

  const merchantInitial =
    merchant?.firstName
      ?.charAt(0)
      ?.toUpperCase() ||
    merchant?.businessName
      ?.charAt(0)
      ?.toUpperCase() ||
    merchant?.name
      ?.charAt(0)
      ?.toUpperCase() ||
    "T";

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-5">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-indigo-600" />
          </div>

          <h1 className="mt-5 text-base font-bold text-slate-900">
            Opening payment page
          </h1>

          <p className="mt-1.5 text-xs leading-5 text-slate-500">
            Please wait while we load the
            available payment options.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
     ======================================================= */

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <X size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Payment page unavailable
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {loadError}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-5 w-full rounded-xl bg-[#1a1054] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#2e1d8c]"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     EMPTY PAGE
     ======================================================= */

  if (wallets.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f7fb] flex items-center justify-center px-5">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <WalletCards size={23} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Payment page is empty
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {merchantName} has not added
            any payment wallets yet.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN
     ======================================================= */

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f7fb] font-sans text-slate-900 antialiased">

      {/* =====================================================
          HEADER
          ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a1054] text-sm font-bold text-white sm:h-10 sm:w-10">
              {merchantInitial}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-slate-900">
                {merchantName}
              </h1>

              <p className="hidden text-[10px] text-slate-400 sm:block">
                Secure payment portal
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600 sm:flex">
              <LockKeyhole size={12} />
              Secure checkout
            </div>

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 sm:hidden">
              <LockKeyhole size={14} />
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
          ====================================================== */}

      <main className="mx-auto max-w-6xl px-3.5 py-5 sm:px-6 sm:py-8">

        {/* ===================================================
            WALLET LIST
            ==================================================== */}

        {!activeWallet && (
          <div
            className={`transition-all duration-200 ${
              walletOpening
                ? "translate-x-5 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div className="mb-5 sm:mb-7">
              <div className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                Payment page
              </div>

              <div className="mt-2 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
                    What would you like
                    to pay for?
                  </h2>

                  <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                    Choose a payment wallet
                    to view the available
                    items.
                  </p>
                </div>

                <div className="hidden shrink-0 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:flex">
                  <Folder size={14} />
                  {wallets.length} wallet
                  {wallets.length !== 1
                    ? "s"
                    : ""}
                </div>
              </div>
            </div>

            {/* WALLET SEARCH */}

            <div className="mb-5 sm:mb-6">
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={walletSearch}
                  onChange={(event) =>
                    setWalletSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search wallets or payment items..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-10 text-xs text-slate-800 outline-none shadow-sm transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 sm:h-12 sm:rounded-2xl sm:text-sm"
                />

                {walletSearch && (
                  <button
                    type="button"
                    onClick={() =>
                      setWalletSearch("")
                    }
                    className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {walletSearch && (
                <p className="mt-1.5 px-1 text-[10px] text-slate-400">
                  {filteredWallets.length}{" "}
                  matching wallet
                  {filteredWallets.length !== 1
                    ? "s"
                    : ""}
                </p>
              )}
            </div>

            {/* WALLET GRID */}

            {filteredWallets.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                  <Search size={20} />
                </div>

                <h3 className="mt-3 font-bold text-slate-800">
                  Nothing found
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Try searching for another
                  wallet or item.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setWalletSearch("")
                  }
                  className="mt-4 text-xs font-bold text-indigo-600"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {filteredWallets.map(
                  (wallet) => {
                    const itemCount =
                      wallet.items?.length ||
                      0;

                    const selectedInside =
                      wallet.items?.filter(
                        (item) =>
                          cart[item.id]
                            ?.checked
                      ).length || 0;

                    return (
                      <button
                        key={wallet.id}
                        type="button"
                        onClick={() =>
                          openWallet(wallet)
                        }
                        className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg sm:rounded-3xl sm:p-6"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
                            <FolderOpen
                              size={23}
                              strokeWidth={1.8}
                            />
                          </div>

                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-colors group-hover:text-indigo-600">
                            <ArrowRight
                              size={15}
                            />
                          </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                          <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
                            {wallet.name}
                          </h3>

                          <p className="mt-1 line-clamp-2 min-h-[34px] text-xs leading-5 text-slate-400 sm:min-h-[40px] sm:text-sm">
                            {wallet.description ||
                              "Open this wallet to view its payment items."}
                          </p>
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 sm:mt-6 sm:pt-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">
                              {itemCount} item
                              {itemCount !==
                              1
                                ? "s"
                                : ""}
                            </span>

                            {selectedInside >
                              0 && (
                              <span className="rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600">
                                {
                                  selectedInside
                                }{" "}
                                selected
                              </span>
                            )}
                          </div>

                          <span className="text-[11px] font-bold text-indigo-600 sm:text-xs">
                            Open
                          </span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>
        )}

        {/* ===================================================
            ACTIVE WALLET
            ==================================================== */}

        {activeWallet && (
          <div
            className={`transition-all duration-200 ${
              walletOpening
                ? "-translate-x-5 opacity-0"
                : "translate-x-0 opacity-100"
            }`}
          >
            {/* BACK */}

            <button
              type="button"
              onClick={closeWallet}
              disabled={paymentLoading}
              className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              <ArrowLeft size={15} />
              All wallets
            </button>

            {/* WALLET HEADER */}

            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-6 sm:rounded-3xl sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100 sm:h-16 sm:w-16 sm:rounded-2xl">
                    <FolderOpen size={23} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-indigo-600 sm:text-[10px]">
                      Payment wallet
                    </p>

                    <h2 className="mt-0.5 truncate text-lg font-black text-slate-900 sm:text-2xl">
                      {activeWallet.name}
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400 sm:text-sm">
                      {activeWallet.items
                        ?.length || 0}{" "}
                      payment item
                      {(activeWallet.items
                        ?.length || 0) !==
                      1
                        ? "s"
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-500 sm:text-xs">
                  {
                    activeWalletSelectedCount
                  }{" "}
                  selected
                </div>
              </div>

              {activeWallet.description && (
                <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  {
                    activeWallet.description
                  }
                </p>
              )}
            </div>

            {/* ITEMS + SUMMARY */}

            <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">

              {/* ITEMS */}

              <section>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
                  <div className="border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                          Payment items
                        </h3>

                        <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                          Select what you
                          want to pay for.
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        Available
                      </div>
                    </div>

                    {activeWallet.items
                      ?.length > 0 && (
                      <div className="relative mt-3 sm:mt-5">
                        <Search
                          size={14}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                          type="search"
                          value={itemSearch}
                          onChange={(
                            event
                          ) =>
                            setItemSearch(
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="Search items..."
                          className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-9 text-[11px] outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 sm:h-11 sm:rounded-xl sm:text-sm"
                        />

                        {itemSearch && (
                          <button
                            type="button"
                            onClick={() =>
                              setItemSearch(
                                ""
                              )
                            }
                            className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-white"
                            aria-label="Clear item search"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {activeWallet.items
                    ?.length === 0 ? (
                    <div className="px-5 py-14 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                        <Folder size={22} />
                      </div>

                      <h3 className="mt-3 font-bold text-slate-800">
                        This wallet is
                        empty
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        No payment items
                        have been added
                        yet.
                      </p>
                    </div>
                  ) : filteredActiveWalletItems.length ===
                    0 ? (
                    <div className="px-5 py-12 text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                        <Search size={20} />
                      </div>

                      <h3 className="mt-3 font-bold text-slate-800">
                        No items found
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          setItemSearch(
                            ""
                          )
                        }
                        className="mt-3 text-xs font-bold text-indigo-600"
                      >
                        Clear search
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {filteredActiveWalletItems.map(
                        (item) => {
                          const checked =
                            cart[item.id]
                              ?.checked ||
                            false;

                          const quantity =
                            cart[item.id]
                              ?.quantity ??
                            1;

                          return (
                            <div
                              key={item.id}
                              className={`p-3.5 transition-colors sm:p-5 ${
                                checked
                                  ? "bg-indigo-50/40"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="flex gap-2.5 sm:gap-4">
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleItem(
                                      item.id
                                    )
                                  }
                                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition sm:h-6 sm:w-6 sm:rounded-lg ${
                                    checked
                                      ? "border-indigo-600 bg-indigo-600 text-white"
                                      : "border-slate-300 bg-white text-transparent hover:border-indigo-300"
                                  }`}
                                  aria-label={
                                    checked
                                      ? `Remove ${item.name}`
                                      : `Select ${item.name}`
                                  }
                                >
                                  <Check
                                    size={12}
                                    strokeWidth={
                                      3
                                    }
                                  />
                                </button>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <h4 className="text-sm font-bold leading-5 text-slate-800 sm:text-base">
                                        {
                                          item.name
                                        }
                                      </h4>

                                      {item.description && (
                                        <p className="mt-0.5 text-[10px] leading-4 text-slate-400 sm:text-xs sm:leading-5">
                                          {
                                            item.description
                                          }
                                        </p>
                                      )}
                                    </div>

                                    <div className="shrink-0 text-sm font-black text-indigo-600 sm:text-base">
                                      ₦{" "}
                                      {formatMoney(
                                        item.price
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                                      Quantity
                                    </span>

                                    <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 shadow-sm">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          decreaseQuantity(
                                            item.id
                                          )
                                        }
                                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 sm:h-8 sm:w-8"
                                        aria-label={`Decrease ${item.name}`}
                                      >
                                        <Minus
                                          size={
                                            13
                                          }
                                        />
                                      </button>

                                      <input
                                        type="number"
                                        min="1"
                                        inputMode="numeric"
                                        value={
                                          quantity
                                        }
                                        onChange={(
                                          event
                                        ) =>
                                          handleQuantityChange(
                                            item.id,
                                            event
                                              .target
                                              .value
                                          )
                                        }
                                        onBlur={() =>
                                          handleQuantityBlur(
                                            item.id
                                          )
                                        }
                                        className="w-9 bg-transparent text-center text-xs font-bold text-slate-800 outline-none sm:w-11 sm:text-sm"
                                        aria-label={`Quantity for ${item.name}`}
                                      />

                                      <button
                                        type="button"
                                        onClick={() =>
                                          increaseQuantity(
                                            item.id
                                          )
                                        }
                                        className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 sm:h-8 sm:w-8"
                                        aria-label={`Increase ${item.name}`}
                                      >
                                        <Plus
                                          size={
                                            13
                                          }
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* SUMMARY */}

              <aside className="lg:sticky lg:top-20">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
                  <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <Receipt size={16} />
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                          Checkout
                        </p>

                        <h3 className="text-sm font-bold text-slate-900">
                          Payment summary
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    {selectedCount ===
                    0 ? (
                      <div className="py-6 text-center sm:py-8">
                        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-300">
                          <ShoppingBag
                            size={18}
                          />
                        </div>

                        <p className="mt-2.5 text-sm font-semibold text-slate-600">
                          Nothing selected
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Select an item
                          to continue.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {selectedItems.map(
                          (item) => (
                            <div
                              key={item.id}
                              className="flex items-start justify-between gap-3"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-slate-700 sm:text-sm">
                                  {
                                    item.name
                                  }
                                </p>

                                <p className="mt-0.5 text-[9px] text-slate-400 sm:text-[10px]">
                                  {
                                    item.quantity
                                  }{" "}
                                  × ₦{" "}
                                  {formatMoney(
                                    item.unitPrice
                                  )}
                                </p>
                              </div>

                              <span className="shrink-0 text-xs font-bold text-slate-800 sm:text-sm">
                                ₦{" "}
                                {formatMoney(
                                  item.total
                                )}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {selectedCount > 0 && (
                      <div className="mt-5 border-t border-slate-100 pt-4">

                        {/* SUBTOTAL */}

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500 sm:text-xs">
                            Subtotal
                          </span>

                          <span className="text-xs font-semibold text-slate-800 sm:text-sm">
                            ₦{" "}
                            {formatMoney(
                              subtotal
                            )}
                          </span>
                        </div>

                        {/* TRACEV FEE */}

                        <div className="mt-2 flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] text-slate-400 sm:text-[11px]">
                              TraceV service
                              fee
                            </p>

                            <p className="mt-0.5 text-[9px] text-slate-400">
                              Calculated securely
                              at checkout
                            </p>
                          </div>

                          <span className="shrink-0 text-[10px] font-medium text-slate-500 sm:text-xs">
                            Confirmed next
                          </span>
                        </div>

                        {/* TOTAL */}

                        <div className="mt-3 flex items-end justify-between border-t border-slate-100 pt-3">
                          <div>
                            <p className="text-[9px] text-slate-400">
                              {totalQuantity}{" "}
                              item
                              {totalQuantity !==
                              1
                                ? "s"
                                : ""}
                            </p>

                            <p className="text-xs font-bold text-slate-700">
                              Total to pay
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-[9px] text-slate-400">
                              Confirmed at
                              checkout
                            </p>

                            <p className="text-base font-black text-slate-900 sm:text-lg">
                              Calculated
                              securely
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-2.5">
                          <p className="text-[10px] font-semibold leading-4 text-indigo-700">
                            TraceV service fee:
                            1% + ₦300, capped
                            at ₦2,000.
                          </p>

                          <p className="mt-1 text-[9px] leading-4 text-indigo-500">
                            Your exact total will
                            be confirmed on the
                            secure checkout page.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedCount > 0 &&
                      subtotal <
                        MINIMUM_PAYMENT && (
                        <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2.5">
                          <p className="text-[10px] font-semibold leading-4 text-amber-700">
                            Minimum payment: ₦
                            {MINIMUM_PAYMENT.toLocaleString()}.
                          </p>
                        </div>
                      )}

                    {paymentError && (
                      <div className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-[10px] font-semibold leading-4 text-red-600 sm:text-xs">
                        {paymentError}
                      </div>
                    )}

                    {!showPaymentForm && (
                      <button
                        type="button"
                        disabled={
                          selectedCount ===
                            0 ||
                          subtotal <
                            MINIMUM_PAYMENT
                        }
                        onClick={
                          handleContinueToPayment
                        }
                        className={`mt-4 w-full rounded-xl py-3 text-xs font-bold transition sm:text-sm ${
                          selectedCount >
                            0 &&
                          subtotal >=
                            MINIMUM_PAYMENT
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700"
                            : "cursor-not-allowed bg-slate-100 text-slate-400"
                        }`}
                      >
                        {selectedCount ===
                        0
                          ? "Select an item"
                          : subtotal <
                            MINIMUM_PAYMENT
                          ? `Minimum ₦${MINIMUM_PAYMENT}`
                          : "Continue to checkout"}
                      </button>
                    )}

                    {/* CUSTOMER FORM */}

                    {showPaymentForm && (
                      <form
                        id="customer-payment-form"
                        onSubmit={
                          handleCreateCheckout
                        }
                        className="mt-5 border-t border-slate-100 pt-5"
                      >
                        <div className="mb-4">
                          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                            Your details
                          </p>

                          <h4 className="mt-1 text-sm font-bold text-slate-900">
                            Continue to secure
                            checkout
                          </h4>

                          <p className="mt-1 text-[10px] leading-4 text-slate-400">
                            Enter your details
                            before choosing
                            your payment method.
                          </p>
                        </div>

                        {/* NAME */}

                        <div className="mb-3">
                          <label
                            htmlFor="customer-name"
                            className="mb-1 block text-[10px] font-bold text-slate-600"
                          >
                            Full name
                          </label>

                          <input
                            id="customer-name"
                            type="text"
                            name="name"
                            value={
                              customer.name
                            }
                            onChange={
                              handleCustomerChange
                            }
                            placeholder="Enter your full name"
                            autoComplete="name"
                            disabled={
                              paymentLoading
                            }
                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 disabled:bg-slate-50 sm:h-11 sm:rounded-xl sm:text-sm"
                          />
                        </div>

                        {/* PHONE */}

                        <div className="mb-3">
                          <label
                            htmlFor="customer-phone"
                            className="mb-1 block text-[10px] font-bold text-slate-600"
                          >
                            Phone number
                          </label>

                          <input
                            id="customer-phone"
                            type="tel"
                            name="phone"
                            value={
                              customer.phone
                            }
                            onChange={
                              handleCustomerChange
                            }
                            placeholder="Enter your phone number"
                            autoComplete="tel"
                            disabled={
                              paymentLoading
                            }
                            className="h-10 w-full rounded-lg border border-slate-200 px-3 text-xs outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 disabled:bg-slate-50 sm:h-11 sm:rounded-xl sm:text-sm"
                          />
                        </div>

                        {/* CHECKOUT SUMMARY */}

                        <div className="mb-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-slate-500">
                              Items
                            </span>

                            <span className="text-xs font-semibold text-slate-700">
                              ₦{" "}
                              {formatMoney(
                                subtotal
                              )}
                            </span>
                          </div>

                          <div className="mt-1.5 flex items-start justify-between gap-3">
                            <span className="text-[9px] text-slate-400">
                              TraceV service
                              fee
                            </span>

                            <span className="text-[10px] font-medium text-slate-500">
                              Calculated securely
                            </span>
                          </div>

                          <p className="mt-1 text-[8px] text-slate-400">
                            1% + ₦300 · capped
                            at ₦2,000
                          </p>

                          <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
                            <span className="text-[10px] font-bold text-slate-700">
                              Total
                            </span>

                            <span className="text-xs font-black text-slate-900">
                              Confirmed next
                            </span>
                          </div>
                        </div>

                        {/* CREATE CHECKOUT */}

                        <button
                          type="submit"
                          disabled={
                            paymentLoading ||
                            subtotal <
                              MINIMUM_PAYMENT
                          }
                          className={`w-full rounded-xl py-3 text-xs font-bold transition sm:text-sm ${
                            paymentLoading ||
                            subtotal <
                              MINIMUM_PAYMENT
                              ? "cursor-not-allowed bg-slate-300 text-slate-500"
                              : "bg-indigo-600 text-white shadow-md shadow-indigo-100 hover:bg-indigo-700"
                          }`}
                        >
                          {paymentLoading ? (
                            <span className="flex items-center justify-center gap-2">
                              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                              Creating secure
                              checkout...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-2">
                              <Banknote
                                size={15}
                              />

                              Continue to
                              checkout

                              <ArrowRight
                                size={15}
                              />
                            </span>
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={
                            paymentLoading
                          }
                          onClick={() => {
                            setShowPaymentForm(
                              false
                            );
                            setPaymentError("");
                          }}
                          className="mt-1.5 w-full py-2 text-[10px] font-semibold text-slate-400 transition hover:text-slate-700 sm:text-xs"
                        >
                          ← Back to summary
                        </button>

                        <div className="mt-2 flex items-center justify-center gap-1 text-[9px] text-slate-400">
                          <LockKeyhole
                            size={9}
                          />
                          Secure checkout
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </aside>
            </div>

            {/* =================================================
                MOBILE QUICK CHECKOUT BAR
                ================================================== */}

            {selectedCount > 0 &&
              !showPaymentForm && (
                <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:hidden">
                  <div className="mx-auto flex max-w-6xl items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        {totalQuantity}{" "}
                        item
                        {totalQuantity !==
                        1
                          ? "s"
                          : ""}
                      </p>

                      <p className="truncate text-xs font-black text-slate-900">
                        ₦{" "}
                        {formatMoney(
                          subtotal
                        )}{" "}
                        + service fee
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={
                        subtotal <
                        MINIMUM_PAYMENT
                      }
                      onClick={
                        handleContinueToPayment
                      }
                      className={`flex shrink-0 items-center gap-1.5 rounded-xl px-5 py-3 text-xs font-bold ${
                        subtotal >=
                        MINIMUM_PAYMENT
                          ? "bg-indigo-600 text-white"
                          : "cursor-not-allowed bg-slate-100 text-slate-400"
                      }`}
                    >
                      Continue
                      <ArrowRight
                        size={15}
                      />
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}
      </main>

      {/* =====================================================
          FOOTER
          ====================================================== */}

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6">
        <div className="border-t border-slate-200 pt-5">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
              <LockKeyhole size={11} />
              Secure payment experience
            </div>

            <p className="text-[10px] font-semibold text-slate-400">
              Powered by traceV
            </p>
          </div>

          <p className="mt-4 text-center text-[9px] leading-5 text-slate-400">
            Never share your password, PIN,
            biometric information, or one-time
            authentication codes with anyone.
          </p>
        </div>
      </footer>
    </div>
  );
}