
import { SelectInput } from "react-admin";

export const LanguageSelectInput = () => {
  const LanguageSelectOptions = [
    { id: "en", name: "İngilizce" },
    { id: "tr", name: "Türkçe" },

  ];
  return (
    <SelectInput
      label="Diller"
      choices={LanguageSelectOptions}
      source="action"
      name="lang_id"
      required
      fullWidth
    />
  );
};
