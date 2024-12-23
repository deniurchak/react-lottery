export default function LotteryEntryForm({
  error,
  ethToEnter,
  setEthToEnter,
  enterLoading,
  onEnter,
}) {
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Enter the Lottery
      </h2>
      {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
      <div className="flex gap-4">
        <input
          type="number"
          value={ethToEnter}
          onChange={(e) => setEthToEnter(e.target.value)}
          step="0.01"
          min="0.01"
          placeholder="ETH amount"
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={enterLoading}
        />
        <button
          onClick={onEnter}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={enterLoading}
        >
          {enterLoading ? "Entering..." : "Enter Lottery"}
        </button>
      </div>
    </div>
  );
}
