import { useState, useEffect } from "react";

type EvaluationFormFieldsProps = {
  store: any;
  showFormFields: boolean;
};
export default function EvaluationFormFields({ store, showFormFields }: EvaluationFormFieldsProps) {
  const [formFieldInputs, setFormFieldInputs] = useState(store.evaluation?.evaluation_type);

  const handleFormFieldChange = (e: any, id: string, fieldName: string) => {
    const newFormFields = formFieldInputs.map((field: any) => {
      if (field.id === id) {
        field[fieldName] = e.target.value;
      }
      return field;
    });
    setFormFieldInputs(newFormFields);
  };

  useEffect(() => {
    setFormFieldInputs(store.evaluation?.evaluation_field);
  }, [store.evaluation?.evaluation_field]);
  return (
    <>
      {showFormFields ? (
        <div className="flex flex-col w-full">
          {store.evaluation.evaluation_field.map((field: any, idx: number) => {
            return (
              <div key={idx} className="pb-6">
                <h5 className="text-[#979797] text-sm mb-1">Heading</h5>
                <input
                  type="text"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                  placeholder="Project Overview"
                  value={field.heading || ""}
                  onChange={(e) => handleFormFieldChange(e, field.id, "heading")}
                  onBlur={(e) => store.setFormFieldHeading(e.target.value, field.id)}
                />
                <h5 className="text-[#979797] text-sm mb-1 mt-2">Subheading (optional)</h5>
                <input
                  type="text"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                  placeholder="Using 280 characters or less, describe your project."
                  value={field.subheading || ""}
                  onChange={(e) => handleFormFieldChange(e, field.id, "subheading")}
                  onBlur={(e) => store.setFormFieldSubheading(e.target.value, field.id)}
                />
                <h5 className="text-[#979797] text-sm mb-1">Placeholder</h5>
                <input
                  type="text"
                  className="appearance-none w-full px-4 py-2 rounded-lg border border-gray focus:outline-none"
                  placeholder="My project is..."
                  value={field.placeholder || ""}
                  onChange={(e) => handleFormFieldChange(e, field.id, "placeholder")}
                  onBlur={(e) => store.setFormFieldPlaceholder(e.target.value, field.id)}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <ul className="list-disc ml-5">
          {store.evaluation.evaluation_field.map((field: any) => {
            return (
              <div className="flex flex-col py-1" key={field.id}>
                <li className="text-blue font-bold">
                  <div className="inline-block text-offblack font-semibold">
                    Heading: <span className="font-normal">{field.heading}</span>
                  </div>
                </li>
                <div className="inline-block text-offblack font-semibold">
                  Subheading: <span className="font-normal">{field.subheading}</span>
                </div>
                <div className="inline-block text-offblack font-semibold">
                  Placeholder: <span className="font-normal">{field.placeholder}</span>
                </div>
                <div className="inline-block text-offblack font-semibold">
                  Character count: <span className="font-normal">{field.char_count}</span>
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}
