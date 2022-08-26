import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value?: string;
  setter?: ({ name, value }: { name: string; value: string }) => void;
  type?: string;
}

export function InputField({
  name,
  value,
  setter,
  label,
  type = "text",
}: InputFieldProps) {
  return (
    <div className="form-group">
      <label className="text-capitalize" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="form-control"
        id={name}
        aria-describedby={name + "Help"}
        placeholder={"Enter " + label}
        value={value}
        onChange={(event) => {
          if (!setter) return;
          setter({ name, value: event.target.value });
        }}
      />
    </div>
  );
}
