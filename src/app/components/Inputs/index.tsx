import { Input } from "../Input";

export const Inputs = () => {
  return (
    <div className="flex gap-2">
      <Input index={0} />
      <Input index={1} />
      <Input index={2} />
      <Input index={3} />
    </div>
  );
};
