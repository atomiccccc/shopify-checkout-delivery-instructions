import React, { useState } from "react";
import {
  reactExtension,
  TextField,
  BlockStack,
  useApplyMetafieldsChange,
  useMetafield,
  Checkbox,
} from "@shopify/ui-extensions-react/checkout";

// [START custom-field.ext-index]
// Set the entry point for the extension
export default reactExtension("purchase.checkout.shipping-option-list.render-after", () => <App />);
// [END custom-field.ext-index]

function App() {
  // [START custom-field.instruction-ui]
  // Set up the checkbox state
  const [checked, setChecked] = useState(false);
  // [END custom-field.instruction-ui]

  // [START custom-field.define-metafield]
  // Define the metafield namespace and key
  const metafieldNamespace = "digitalgem";
  const metafieldKey = "delivery-instructions";
  // [END custom-field.define-metafield]

  // [START custom-field.use-metafield]
  // Get a reference to the metafield
  const deliveryInstructions = useMetafield({
    namespace: metafieldNamespace,
    key: metafieldKey,
  });
  // [END custom-field.use-metafield]
  // [START custom-field.update-metafield]
  // Set a function to handle updating a metafield
  const applyMetafieldsChange = useApplyMetafieldsChange();
  // [END custom-field.update-metafield]

  // Set a function to handle the Checkbox component's onChange event
  const handleChange = () => {
    setChecked(!checked);
  };
  // [START custom-field.instruction-ui]
  // Render the extension components
  return (
    <BlockStack>
      <Checkbox checked={checked} onChange={handleChange}>
        Provide delivery instructions
      </Checkbox>
      {checked && (
        <TextField
          label="Delivery instructions"
          multiline={3}
          // [START custom-field.update-metafield]
          onChange={(value) => {
            // Apply the change to the metafield
            applyMetafieldsChange({
              type: "updateMetafield",
              namespace: metafieldNamespace,
              key: metafieldKey,
              valueType: "string",
              value,
            });
          }}
          // [END custom-field.update-metafield]
          value={deliveryInstructions?.value}
        />
      )}
    </BlockStack>
  );
  // [END custom-field.instruction-ui]
}
