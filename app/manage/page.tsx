import FormToolkList from "./components/form-tool-list";

export default async function Manager() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Quản lý Task</h1>
      <div>
        <FormToolkList />
      </div>
    </div>
  );
}
