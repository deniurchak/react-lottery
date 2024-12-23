export default function ContractDetails({
  contractOwner,
  enterPrice,
  userBalance,
  balance,
  players,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Contract Details
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Manager:</span>
          <span className="text-gray-800 dark:text-gray-200 font-mono">
            {contractOwner}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Enter price:</span>
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {enterPrice} ETH
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            Your balance:
          </span>
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {Number(userBalance).toFixed(2)} ETH
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">
            Lottery balance:
          </span>
          <span className="text-green-600 dark:text-green-400 font-semibold">
            {balance} ETH
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 dark:text-gray-400">Players:</span>
          <span className="text-blue-600 dark:text-blue-400 font-semibold">
            {players.length}
          </span>
        </div>
      </div>
    </div>
  );
}
