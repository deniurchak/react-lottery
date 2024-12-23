import ThemeToggle from "./ThemeToggle";

export default function Header({ isDark, onToggleTheme }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center flex-1">
        Lottery Contract
      </h1>
      <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
    </div>
  );
}
