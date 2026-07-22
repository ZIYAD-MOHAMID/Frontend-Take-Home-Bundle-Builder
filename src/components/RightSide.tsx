import React, { useState } from "react";
import AnimatedModal from "./common/AnimatedModal";

interface RightSideProps {
  lineItems: Array<{
    stepId: string;
    productId: string;
    variantId: string;
    title: string;
    variantName?: string;
    image: string;
    quantity: number;
    price: number;
  }>;
  initialData: {
    steps: Array<{
      id: string;
      title: string;
      products: Array<{
        id: string;
        variants: Array<{
          id: string;
          compareAtPrice?: string | number;
          price: string | number;
        }>;
      }>;
    }>;
  };
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  parsePrice: (price: string | number | undefined) => number;
  formatPrice: (price: number) => string;
  subtotal: number;
  compareSubtotal: number;
  savings: number;
  saveSystemForLater: () => void;
}

export default function RightSide({
  lineItems,
  initialData,
  updateQuantity,
  parsePrice,
  formatPrice,
  subtotal,
  compareSubtotal,
  savings,
  saveSystemForLater,
}: RightSideProps) {
  const [modalType, setModalType] = useState<"checkout" | "save" | null>(null);

  const handleSaveClick = () => {
    saveSystemForLater();
    setModalType("save");
  };

  return (
    <div className="w-full lg:col-span-5 2xl:w-full lg:sticky lg:top-6">
      <div className="bg-[#E3EFFF] rounded-t-[10px] border border-slate-200 p-6 sticky top-8 shadow-sm space-y-6 2xl:grid 2xl:grid-cols-2 2xl:gap-6 2xl:space-y-0 max-[500px]:p-2">
        <div>
          <div className="text-[#1F1F1F] font-semibold font-[Gilroy-SemiBold] text-[28px] leading-[100%] tracking-[0.6px] align-middle">
            Your security system
          </div>
          <div className="text-[#1F1F1FBF] font-medium font-[Gilroy-Medium] text-[16px] leading-[130%] tracking-[0.6px] align-middle mb-3">
            Review your personalized protection system designed to keep what
            matters most safe.
          </div>

          <div className="space-y-4 max-h-[38vh] overflow-y-auto pr-1 border-t border-b border-[#CED6DE] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400">
            {lineItems.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">
                Your system is currently empty.
              </p>
            ) : (
              (() => {
                const groupedItems = lineItems.reduce(
                  (acc, item) => {
                    if (!acc[item.stepId]) acc[item.stepId] = [];
                    acc[item.stepId].push(item);
                    return acc;
                  },
                  {} as Record<string, typeof lineItems>,
                );

                return Object.entries(groupedItems).map(([stepId, items]) => {
                  const stepObj = initialData.steps.find(
                    (s) => s.id === stepId,
                  );
                  const stepTitle = stepObj ? stepObj.title.toUpperCase() : "";

                  return (
                    <div key={stepId} className="space-y-2">
                      {stepTitle && (
                        <div className="text-[#A8B2BD] font-normal font-[Gilroy-Regular] text-[12px] leading-[16px] tracking-[0.03em] uppercase align-middle">
                          {stepTitle}
                        </div>
                      )}
                      {items.map((item) => {
                        const activeVariant = initialData.steps
                          .find((s) => s.id === item.stepId)
                          ?.products.find((p) => p.id === item.productId)
                          ?.variants.find((v) => v.id === item.variantId);

                        const comparePriceVal = activeVariant?.compareAtPrice
                          ? parsePrice(activeVariant.compareAtPrice)
                          : 0;
                        const hasCompare =
                          comparePriceVal > 0 &&
                          comparePriceVal > parsePrice(activeVariant?.price);

                        return (
                          <div
                            key={`${item.productId}-${item.variantId}`}
                            className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-slate-50 rounded-lg shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="object-contain h-10 w-10"
                                />
                              </div>
                              <h4 className="text-[#0B0D10] font-normal font-[Gilroy-Medium] text-[18px] leading-[16px] tracking-[0.005em] align-middle">
                                {item.title}{" "}
                                {item.variantName && `(${item.variantName})`}
                              </h4>
                            </div>

                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.variantId,
                                      item.quantity - 1,
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 font-semibold text-sm"
                                  disabled={item.quantity === 0}
                                >
                                  —
                                </button>
                                <span className="text-sm font-semibold text-slate-800 min-w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item.productId,
                                      item.variantId,
                                      item.quantity + 1,
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-semibold text-sm"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right min-w-16 max-[500px]:flex max-[500px]:flex-col max-[500px]:items-end max-[500px]:gap-1">
                                {hasCompare && (
                                  <span className="text-[#6F7882] font-normal font-[Gilroy-Medium] text-[16px] leading-[16px] tracking-[0.005em] text-right align-middle line-through mr-5 max-[500px]:mr-0">
                                    {activeVariant?.compareAtPrice &&
                                    typeof activeVariant.compareAtPrice ===
                                      "string" &&
                                    activeVariant.compareAtPrice.includes("/mo")
                                      ? `${formatPrice(comparePriceVal * item.quantity)}/mo`
                                      : formatPrice(
                                          comparePriceVal * item.quantity,
                                        )}
                                  </span>
                                )}
                                <span className="text-[#4E2FD2] font-normal font-[Gilroy-SemiBold] text-[16px] leading-[16px] tracking-[0.005em] text-right align-middle">
                                  {activeVariant?.price &&
                                  typeof activeVariant.price === "string" &&
                                  activeVariant.price.includes("/mo")
                                    ? `${formatPrice(parsePrice(activeVariant.price) * item.quantity)}/mo`
                                    : formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                });
              })()
            )}
          </div>

          <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-lg shrink-0 flex items-center justify-center overflow-hidden border border-slate-100">
                <img
                  src={"/assets/Fast Shipping_icon.png"}
                  alt={"Shipping"}
                  className="object-contain h-10 w-10"
                />
              </div>
              <h4 className="text-[#0B0D10] font-normal font-[Gilroy-Medium] text-[18px] leading-[16px] tracking-[0.005em] align-middle">
                Shipping
              </h4>
            </div>
            <div>
              <span className="text-[#6F7882] font-normal font-[Gilroy-Medium] text-[16px] leading-[16px] tracking-[0.005em] text-right align-middle line-through mx-5">
                $5.99
              </span>
              <span className="text-[#4E2FD2] font-normal font-[Gilroy-SemiBold] text-[16px] leading-[16px] tracking-[0.005em] text-right align-middle">
                FREE
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3 text-sm">
          <div className="max-[1300px]:flex max-[1300px]:justify-evenly max-[1300px]:flex-row">
            <div className="flex justify-between gap-5 text-slate-600">
              <div className="flex-shrink-0">
                <img
                  src="/assets/SatisfactionBadge.png"
                  alt="Satisfaction Guarantee"
                  className="object-contain w-[131px] h-[131px]"
                />
              </div>
              <div className="flex flex-col gap-4 justify-end w-full max-[1300px]:hidden">
                <span className="w-[330px] h-[20px] text-[#1F1F1F] font-[Gilroy-Regular] text-[18px] leading-[110%] tracking-[0.6px] align-middle font-bold">
                  30-day hassle-free returns
                </span>
                <span className="w-[330px] h-[80px] text-[#1F1F1F] font-light font-[Gilroy-SemiBold] text-[18px] leading-[110%] tracking-[0.6px] align-middle opacity-100">
                  If you're not totally in love with the product, we will refund
                  you 100%.
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-base font-bold text-slate-900 max-[1300px]:flex max-[1300px]:flex-col max-[1300px]:gap-4 max-[1300px]:justify-center">
              <span className="w-[145px] h-[27px] bg-[#4E2FD2] text-white font-[Gilroy-Medium] text-[16px] leading-[100%] tracking-[-5%] p-[8px] rounded-[3px] flex items-center justify-center gap-[10px]">
                as low as $19.19/mo
              </span>
              <div className="text-right">
                {compareSubtotal > subtotal && (
                  <span className="w-[73px] h-[20px] text-[#6F7882] font-[Gilroy-Medium] text-[22px] leading-[20px] tracking-[0.25%] text-center line-through">
                    ${compareSubtotal.toFixed(2)}
                  </span>
                )}
                <span className="w-[90px] h-[32px] text-[#4E2FD2] font-[Gilroy-Bold] text-[28px] leading-[32px] tracking-[-0.13%] text-right align-middle">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <div>
              {savings > 0 && (
                <div className="flex items-center justify-center text-[#00875A] font-[Gilroy-Medium] text-[14px] leading-[16px] tracking-[0.005em] text-center align-middle">
                  Congrats! You’re saving ${savings.toFixed(2)} on your security
                  bundle!
                </div>
              )}
            </div>
            <button
              onClick={() => setModalType("checkout")}
              className="w-full h-12 bg-[#4E2FD2] hover:bg-[#3f25aa] text-white text-center align-middle font-[TT_Norms_Pro] font-[700] text-[17px] leading-[100%] tracking-[0px] transition-colors rounded-[4px]"
            >
              Checkout
            </button>

            <button
              onClick={handleSaveClick}
              className="w-full text-center align-middle text-[#484848] font-[Gilroy-RegularItalic] font-normal italic text-[14px] leading-[120%] tracking-[-0.02px] underline decoration-solid"
            >
              Save my system for later
            </button>
          </div>
        </div>
      </div>
      {/* Styled Pop-up Modal for Checkout */}
      {modalType === "checkout" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center   backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-2xl border border-slate-100 text-center space-y-4">
            <h3 className="font-[TT_Norms_Pro] font-bold text-[20px] text-[#1F1F1F]">
              Confirm Checkout
            </h3>
            <p className="font-[Gilroy-Regular] text-[16px] text-slate-600">
              Proceeding to checkout confirmation. Are you ready to secure your
              order?
            </p>
            <div className="flex gap-3 pt-2">
              <AnimatedModal
                isOpen={modalType === "checkout"}
                onClose={() => setModalType(null)}
                title="Confirm Checkout"
                description="Proceeding to checkout confirmation. Are you ready to secure your order?"
              >
                <button
                  onClick={() => setModalType(null)}
                  className="w-1/2 h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-[TT_Norms_Pro] font-bold text-[15px] rounded-[4px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setModalType(null);
                  }}
                  className="w-1/2 h-11 bg-[#4E2FD2] hover:bg-[#3f25aa] text-white font-[TT_Norms_Pro] font-bold text-[15px] rounded-[4px] transition-colors"
                >
                  Continue
                </button>
              </AnimatedModal>
            </div>
          </div>
        </div>
      )}

      {/* Styled Pop-up Modal for Save System */}
      {modalType === "save" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-2xl border border-slate-100 text-center space-y-4">
            <h3 className="font-[TT_Norms_Pro] font-bold text-[20px] text-[#1F1F1F]">
              System Saved
            </h3>
            <p className="font-[Gilroy-Regular] text-[16px] text-slate-600">
              Your system configuration has been successfully saved! You can
              easily restore it anytime.
            </p>
            <div className="pt-2">
              <AnimatedModal
                isOpen={modalType === "save"}
                onClose={() => setModalType(null)}
                title="System Saved"
                description="Your system configuration has been successfully saved! You can easily restore it anytime."
              >
                <button
                  onClick={() => setModalType(null)}
                  className="w-full h-11 bg-[#4E2FD2] hover:bg-[#3f25aa] text-white font-[TT_Norms_Pro] font-bold text-[15px] rounded-[4px] transition-colors"
                >
                  Got it
                </button>
              </AnimatedModal>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
