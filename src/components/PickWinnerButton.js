export default function PickWinnerButton({ pickWinnerLoading, onPickWinner }) {
  return (
    <div className="container mx-auto px-4 py-8 w-full flex justify-center">
      <button
        onClick={onPickWinner}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={pickWinnerLoading}
      >
        {pickWinnerLoading ? "Picking Winner..." : "Pick Winner"}
      </button>
    </div>
  );
}
