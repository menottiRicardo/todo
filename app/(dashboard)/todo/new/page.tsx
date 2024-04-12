import DueDateDropdown from './due-date-dropdown';

export default function DropdownMenuDemo() {
  return (
    <form>
      <input
        placeholder="Task name"
        className="text-xl font-medium w-full bg-transparent outline-none border-none"
      />
      <input
        placeholder="Description"
        className="w-full font-light bg-transparent outline-none border-none"
      />
      <div className="flex gap-4 mt-4">
        <DueDateDropdown />
        <DueDateDropdown />
      </div>
    </form>
  );
}
