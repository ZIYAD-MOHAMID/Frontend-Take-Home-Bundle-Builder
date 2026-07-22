import { useState } from "react";

const STORAGE_KEY = "security_system_config";

export interface SystemConfig {
  activeStep?: string;
  selectedVariants: Record<string, string>;
  quantities: Record<string, Record<string, number>>;
  [key: string]: any;
}

export interface LineItem {
  productId: string;
  variantId: string;
  title: string;
  variantName: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  image: string;
  stepId: string;
}

export function useSystemConfig(initialData: any) {
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved configuration", e);
      }
    }
    return initialData.initialState;
  });

  const [activeAccordion, setActiveAccordion] = useState<string>(
    config.activeStep || initialData.steps[0]?.id || "cameras",
  );

  const updateQuantity = (
    productId: string,
    variantId: string,
    quantity: number,
  ) => {
    setConfig((prev) => {
      const currentProdQuantities = prev.quantities[productId] || {};
      return {
        ...prev,
        quantities: {
          ...prev.quantities,
          [productId]: {
            ...currentProdQuantities,
            [variantId]: Math.max(0, quantity),
          },
        },
      };
    });
  };

  const setActiveVariant = (productId: string, variantId: string) => {
    setConfig((prev) => ({
      ...prev,
      selectedVariants: {
        ...prev.selectedVariants,
        [productId]: variantId,
      },
    }));
  };

  const [modalType, setModalType] = useState(null); // 'checkout' | 'save' | null
  // Handler for saving the system configuration
  const saveSystemForLater = () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...config, activeStep: activeAccordion }),
    );
  };

  const getSelectedCountForStep = (stepId: string) => {
    const targetStep = initialData.steps.find((s: any) => s.id === stepId);
    const stepProducts = targetStep ? targetStep.products : [];
    let count = 0;
    stepProducts.forEach((prod: any) => {
      const varQuantities = config.quantities[prod.id] || {};
      const totalProdQty = Object.values(varQuantities).reduce(
        (a: unknown, b: unknown) => Number(a) + Number(b),
        0,
      );
      if (Number(totalProdQty) > 0) count++;
    });
    return count;
  };

  const parsePrice = (value: number | string | undefined): number => {
    if (value === undefined) return 0;
    if (typeof value === "number") return value;
    const cleaned = value.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const formatPrice = (value: number | string | undefined): string => {
    if (value === undefined) return "$0.00";
    if (typeof value === "number") {
      return value === 0 ? "FREE" : `$${value.toFixed(2)}`;
    }

    const trimmed = value.trim();
    if (trimmed.toLowerCase() === "free") return "FREE";

    const cleaned = trimmed.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);

    if (isNaN(parsed) || parsed === 0) {
      return trimmed.toLowerCase().includes("free") ? "FREE" : "$0.00";
    }

    const suffix = trimmed.replace(/^[0-9$.]+/, "");
    return `$${parsed.toFixed(2)}${suffix}`;
  };

  const lineItems: LineItem[] = [];

  initialData.steps.forEach((step: any) => {
    step.products.forEach((prod: any) => {
      const varQuantities = config.quantities[prod.id] || {};
      const variants =
        prod.variants && prod.variants.length > 0
          ? prod.variants
          : [
              {
                id: "standard",
                name: "Standard",
                price: prod.id === "wyze-duo-cam-doorbell" ? 69.98 : 0,
              },
            ];

      variants.forEach((v: any) => {
        const qty = varQuantities[v.id] || 0;
        if (qty > 0) {
          lineItems.push({
            productId: prod.id,
            variantId: v.id,
            title: prod.title,
            variantName: v.name !== "Standard" ? v.name : "",
            price: parsePrice(v.price),
            compareAtPrice:
              v.compareAtPrice === undefined
                ? undefined
                : parsePrice(v.compareAtPrice),
            quantity: qty,
            image: v.image || prod.image,
            stepId: step.id,
          });
        }
      });
    });
  });

  const subtotal = lineItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const compareSubtotal = lineItems.reduce(
    (acc, item) => acc + (item.compareAtPrice || item.price) * item.quantity,
    0,
  );
  const savings = compareSubtotal - subtotal;

  return {
    config,
    activeAccordion,
    setActiveAccordion,
    updateQuantity,
    setActiveVariant,
    saveSystemForLater,
    getSelectedCountForStep,
    parsePrice,
    formatPrice,
    modalType,
    setModalType,
    lineItems,
    subtotal,
    compareSubtotal,
    savings,
  };
}
