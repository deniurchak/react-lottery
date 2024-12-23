import { useEffect, useState } from "react";
import "./App.css";
import ContractDetails from "./components/ContractDetails";
import LoadingSpinner from "./components/LoadingSpinner";
import LotteryEntryForm from "./components/LotteryEntryForm";
import PickWinnerButton from "./components/PickWinnerButton";
import lottery from "./lottery";
import web3 from "./web3";
function App() {
  const [state, setState] = useState({
    contractOwner: null,
    players: [],
    balance: 0,
    userBalance: 0,
    enterPrice: 0,
    loading: true,
    enterLoading: false,
    pickWinnerLoading: false,
    ethToEnter: 0.01,
    accounts: null,
    error: null,
    isDark: true
  });

  useEffect(() => {
    if (state.isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.isDark]);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const [owner, players, balance, enterPrice, userBalance] = await Promise.all([
          lottery.methods.manager().call(),
          lottery.methods.getPlayers().call(),
          web3.eth.getBalance(lottery.options.address),
          lottery.methods.enterPrice().call(),
          web3.eth.getBalance(accounts[0])
        ]);

        setState(prev => ({
          ...prev,
          contractOwner: owner,
          players,
          balance: web3.utils.fromWei(balance, "ether"),
          enterPrice: web3.utils.fromWei(enterPrice, "ether"),
          accounts,
          userBalance: web3.utils.fromWei(userBalance, "ether"),
          loading: false
        }));
      } catch (error) {
        console.error("Error loading data:", error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: "Error loading contract data"
        }));
      }
    };

    fetchContractData();
  }, [state.pickWinnerLoading]);

  const handleEnterLottery = async () => {
    setState(prev => ({ ...prev, enterLoading: true }));
    try {
      await lottery.methods.enter().send({
        value: web3.utils.toWei(state.ethToEnter, "ether"),
        from: state.accounts[0],
      });
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: "Error entering lottery: " + error.message 
      }));
    } finally {
      setState(prev => ({ ...prev, enterLoading: false }));
    }
  };

  const handlePickWinner = async () => {
    setState(prev => ({ ...prev, pickWinnerLoading: true }));
    try {
      await lottery.methods.pickWinner().send({ from: state.accounts[0] });
      setState(prev => ({ ...prev, error: null }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: "Error picking winner: " + error.message 
      }));
    } finally {
      setState(prev => ({ ...prev, pickWinnerLoading: false }));
    }
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  const { contractOwner, enterPrice, userBalance, balance, players, error, ethToEnter, enterLoading, pickWinnerLoading, accounts, isDark } = state;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center flex-1">
            Lottery Contract
          </h1>
          <button
            onClick={() => setState(prev => ({ ...prev, isDark: !prev.isDark }))}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
          <ContractDetails
            contractOwner={contractOwner}
            enterPrice={enterPrice}
            userBalance={userBalance}
            balance={balance}
            players={players}
          />
          <LotteryEntryForm
            error={error}
            ethToEnter={ethToEnter}
            setEthToEnter={(value) => setState(prev => ({ ...prev, ethToEnter: value }))}
            enterLoading={enterLoading}
            onEnter={handleEnterLottery}
          />
        </div>
        {accounts && contractOwner === accounts[0] && (
          <PickWinnerButton
            pickWinnerLoading={pickWinnerLoading}
            onPickWinner={handlePickWinner}
          />
        )}
      </header>
    </div>
  );
}

export default App;
