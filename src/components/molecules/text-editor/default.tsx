import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller, useFormContext } from "react-hook-form";
import { TextLabel } from "../../atoms/typographies/label";

interface TextEditorProps {
  name: string;
  label?: string;
  placeholder?: string;
  errors?: string;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({
  name,
  label,
  placeholder,
  errors,
  className,
}) => {
  const { control } = useFormContext();

  return (
    <div className={className}>
      <TextLabel>{label}</TextLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div
            className={`${
              errors ? "border border-red-600 rounded" : ""
            }`}
          >
            <Editor
              id={name}
              apiKey="14x9ym3ocut28sizmxwsnyrtmivagbcljsio9abkb4z6nsy7" // Replace with your TinyMCE API key
              value={field.value || ""}
              init={{
                height: 300,
                menubar: false,
                plugins: "link lists table image code preview",
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table | code preview",
                placeholder: placeholder || "",
              }}
              onEditorChange={field.onChange}
            />
          </div>
        )}
      />
      {errors && <p className="mt-2 text-sm text-red-600">{errors}</p>}
    </div>
  );
};

export default TextEditor;
