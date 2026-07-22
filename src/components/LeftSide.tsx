import React from "react";
import AnimatedCollapse from "./common/AnimatedCollapse";

interface LeftSideProps {
  initialData: {
    steps: Array<{
      id: string;
      title: string;
      icon?: string;
      products: Array<{
        id: string;
        title: string;
        description: string;
        image: string;
        discountBadge?: string;
        variants?: Array<{
          id: string;
          name: string;
          price: number | string;
          compareAtPrice?: number | string;
          image?: string;
        }>;
      }>;
    }>;
  };
  activeAccordion: string;
  setActiveAccordion: (id: string) => void;
  getSelectedCountForStep: (stepId: string) => number;
  config: {
    selectedVariants: Record<string, string>;
    quantities: Record<string, Record<string, number>>;
  };
  setActiveVariant: (productId: string, variantId: string) => void;
  updateQuantity: (
    productId: string,
    variantId: string,
    quantity: number,
  ) => void;
  formatPrice: (price: number | string | undefined) => string;
}

export default function LeftSide({
  initialData,
  activeAccordion,
  setActiveAccordion,
  getSelectedCountForStep,
  config,
  setActiveVariant,
  updateQuantity,
  formatPrice,
}: LeftSideProps) {
  return (
    <div className="w-full lg:col-span-7 2xl:w-full space-y-4 mb-5">
      {initialData.steps.map((step, idx) => {
        const isOpen = activeAccordion === step.id;
        const selectedCount = getSelectedCountForStep(step.id);
        const stepProducts = step.products;

        return (
          <div key={step.id} className="w-full">
            <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase pb-1.5 px-1">
              STEP {idx + 1} OF {initialData.steps.length}
            </div>

            <section
              className={`border-t border-b border-slate-200 transition-all ${
                isOpen ? "bg-[#EDF4FF]" : "bg-white"
              }`}
            >
              {/* Accordion Header */}
              <button
                type="button"
                onClick={() => setActiveAccordion(isOpen ? "" : step.id)}
                className={`w-full flex items-center justify-between py-5 px-1 text-left transition-colors ${
                  isOpen ? "hover:bg-[#E3EFFF]" : "hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {step.icon && (
                    <div className="w-8 h-8 rounded-md flex items-center justify-center">
                      <img
                        src={step.icon}
                        alt={`Step ${idx + 1}`}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-slate-900 m-0">
                    {step.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  {selectedCount > 0 && (
                    <span className="text-sm font-semibold text-indigo-700">
                      {selectedCount} selected
                    </span>
                  )}
                  <svg
                    className={`w-3.5 h-3.5 text-indigo-700 transform transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>

              {/* Accordion Content Body */}
              {/* {isOpen && ( */}
              <AnimatedCollapse isOpen={isOpen}>
                <div className="px-1 pb-6 pt-2 space-y-6">
                  <div className="flex flex-wrap gap-4 pt-1 justify-center">
                    {stepProducts.map((prod) => {
                      const variants =
                        prod.variants && prod.variants.length > 0
                          ? prod.variants
                          : [
                              {
                                id: "standard",
                                name: "Standard",
                                price:
                                  prod.id === "wyze-duo-cam-doorbell"
                                    ? 69.98
                                    : 0,
                              },
                            ];

                      const activeVariantId =
                        config.selectedVariants[prod.id] || variants[0].id;

                      const activeVariant =
                        variants.find((v) => v.id === activeVariantId) ||
                        variants[0];

                      const currentQty =
                        config.quantities[prod.id]?.[activeVariant.id] || 0;

                      const isSelectedState = currentQty > 0;
                      const displayImage = activeVariant.image || prod.image;

                      return (
                        <div
                          key={prod.id}
                          className={`w-full flex-1 min-w-0 max-[1535px]:flex-row max-[1535px]:min-w-[322.5px] max-w-[480px] p-4 rounded-xl border flex flex-col justify-between transition-all relative ${
                            isSelectedState
                              ? "border-indigo-600 ring-2 ring-indigo-600/10 bg-indigo-50/5"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          {prod.discountBadge && (
                            <div className="absolute top-3 left-3 z-10">
                              <span className="px-2.5 py-0.5 text-[11px] font-bold bg-indigo-600 text-white rounded-md uppercase tracking-wider shadow-sm">
                                {prod.discountBadge}
                              </span>
                            </div>
                          )}

                          <div className="w-full h-36 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden mb-3 pt-4">
                            <img
                              src={displayImage}
                              alt={prod.title}
                              className="object-contain h-28 max-[1535px]:w-50 w-28 transition-transform hover:scale-105"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-base mb-1">
                              {prod.title}
                            </h3>
                            <p className="text-xs text-slate-500 leading-relaxed mb-3">
                              {prod.description}{" "}
                              <a
                                href="#learn-more"
                                onClick={(e) => e.preventDefault()}
                                className="text-indigo-600 font-semibold hover:underline inline-flex items-center"
                              >
                                Learn More
                              </a>
                            </p>

                            {prod.variants && prod.variants.length > 1 && (
                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {prod.variants.map((v) => {
                                  const variantImage = v.image || prod.image;
                                  return (
                                    <button
                                      key={v.id}
                                      type="button"
                                      onClick={() =>
                                        setActiveVariant(prod.id, v.id)
                                      }
                                      className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-all flex items-center space-x-2 ${
                                        activeVariantId === v.id
                                          ? "border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold shadow-sm"
                                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                                      }`}
                                    >
                                      <img
                                        src={variantImage}
                                        alt={v.name}
                                        className="w-5 h-5 object-contain"
                                      />
                                      <span>{v.name}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                              <div className="flex items-center space-x-2.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      prod.id,
                                      activeVariant.id,
                                      currentQty - 1,
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-30 font-semibold text-sm"
                                  disabled={currentQty === 0}
                                >
                                  —
                                </button>
                                <span className="text-sm font-semibold text-slate-800 min-w-4 text-center">
                                  {currentQty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      prod.id,
                                      activeVariant.id,
                                      currentQty + 1,
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors font-semibold text-sm"
                                >
                                  +
                                </button>
                              </div>
                              <div className="flex items-center space-x-1.5">
                                {activeVariant.compareAtPrice && (
                                  <span className="text-sm text-red-500 line-through font-normal">
                                    {formatPrice(activeVariant.compareAtPrice)}
                                  </span>
                                )}
                                <span className="text-base font-normal text-slate-700">
                                  {formatPrice(activeVariant.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {idx < initialData.steps.length - 1 && (
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveAccordion(initialData.steps[idx + 1].id)
                        }
                        style={{
                          border: "1px solid #4E2FD2",
                          fontFamily: "Gilroy-SemiBold, sans-serif",
                          fontWeight: 400,
                          fontSize: "18px",
                          lineHeight: "24px",
                          letterSpacing: "0%",
                        }}
                        className="gap-[10px] rounded-[7px] py-[5px] px-[24px] text-[#4E2FD2] flex items-center justify-center transition-opacity hover:opacity-95 shadow-sm"
                      >
                        <span className="w-[218px] h-[24px] flex items-center justify-center">
                          Next: {initialData.steps[idx + 1].title}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </AnimatedCollapse>
              {/* )} */}
            </section>
          </div>
        );
      })}
    </div>
  );
}
