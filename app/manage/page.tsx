import FormTask from "./components/form-task";

export default async function Manager() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Quản lý Task</h1>
      <div>
        <FormTask />
      </div>
    </div>
  );
}
