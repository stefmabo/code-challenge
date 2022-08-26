import { useState } from "react";
import { InputField, Button } from "shared/components";

interface AddMovieFormProps {
  onSubmit: (
    data: Record<"imageUrl" | "title" | "subtitle" | "description", string>
  ) => void;
  onCancel: () => void;
}

const defaultState = {
  imageUrl: "",
  title: "",
  subtitle: "",
  description: "",
};
export function AddMovieForm({ onSubmit, onCancel }: AddMovieFormProps) {
  const [state, setState] = useState(defaultState);

  const handleSetter = ({ name, value }: { name: string; value: string }) => {
    setState({ ...state, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(state);
    setState(defaultState);
  };

  return (
    <form className="p-4 ">
      <InputField
        label="Url"
        name="imageUrl"
        setter={handleSetter}
        value={state.imageUrl}
      />
      <InputField
        label="Title"
        name="title"
        setter={handleSetter}
        value={state.title}
      />
      <InputField
        label="Subtitle"
        name="subtitle"
        setter={handleSetter}
        value={state.subtitle}
      />
      <InputField
        label="Description"
        name="description"
        setter={handleSetter}
        value={state.description}
      />
      <div className="text-center">
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}
