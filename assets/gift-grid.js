// Gift Grid Section JS
document.querySelectorAll(".gift-card__plus").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".gift-card")
      .querySelector(".gift-popup")
      .classList.add("active");
  });
});

document.querySelectorAll(".gift-popup__close").forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".gift-popup")
      .classList.remove("active");
  });
});

// Close popup when clicking outside the content area
document.querySelectorAll(".gift-popup").forEach(popup => {
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("active");
    }
  });
});

// Variant selection handling
document.querySelectorAll(".gift-popup").forEach(popup => {
  const options = popup.querySelectorAll(".gift-option");
  if (options.length === 0) return;

  const variantsJsonElement = popup.querySelector(".product-variants-json");
  if (!variantsJsonElement) return;

  const variants = JSON.parse(variantsJsonElement.textContent);
  const variantIdInput = popup.querySelector(".product-variant-id");
  const priceDisplay = popup.querySelector(".gift-popup__price");
  const addButton = popup.querySelector(".gift-popup__add");
  const addButtonSpan = addButton ? addButton.querySelector("span") : null;

  function updateVariant() {
    // Sort options by position attribute to match the order in liquid
    const selectedOptions = Array.from(options)
      .sort((a, b) => Number(a.dataset.optionPosition) - Number(b.dataset.optionPosition))
      .map(select => select.value);

    // Find matching variant
    const matchedVariant = variants.find(variant => {
      return variant.options.every((optionVal, index) => optionVal === selectedOptions[index]);
    });

    if (matchedVariant) {
      // Update hidden variant ID
      if (variantIdInput) {
        variantIdInput.value = matchedVariant.id;
        variantIdInput.dispatchEvent(new Event("change", { bubbles: true }));
      }

      // Update price display
      if (priceDisplay) {
        priceDisplay.textContent = matchedVariant.price;
      }

      // Update add to cart button state
      if (addButton) {
        if (matchedVariant.available) {
          addButton.removeAttribute("disabled");
          if (addButtonSpan) {
            addButtonSpan.textContent = "Add to Cart";
          }
        } else {
          addButton.setAttribute("disabled", "disabled");
          if (addButtonSpan) {
            addButtonSpan.textContent = "Sold Out";
          }
        }
      }
    } else {
      // No match found
      if (addButton) {
        addButton.setAttribute("disabled", "disabled");
        if (addButtonSpan) {
          addButtonSpan.textContent = "Unavailable";
        }
      }
    }
  }

  // Bind change events
  options.forEach(select => {
    select.addEventListener("change", updateVariant);
  });
});
