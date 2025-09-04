import { use, useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount,setAmount]= useState(''); // changed from 0 to empty string
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  // getting key values from apis objects
  const options = Object.keys(currencyInfo);

  const commonPairs = [
    { from: 'usd', to: 'eur', label: 'USD → EUR' },
    { from: 'usd', to: 'gbp', label: 'USD → GBP' },
    { from: 'eur', to: 'usd', label: 'EUR → USD' },
    { from: 'usd', to: 'inr', label: 'USD → INR' },
    { from: 'eur', to: 'inr', label: 'EUR → INR' },
];

  const swap = () =>{
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  const convert = () => {
    setConvertedAmount(amount ? amount * currencyInfo[to] : 0); // handle empty amount
  }

  const handleQuickSelect = (fromCurrency, toCurrency) => {
    setFrom(fromCurrency);
    setTo(toCurrency);
};

  return (
    <div
        className="w-full min-h-screen bg-cover bg-no-repeat relative"
        style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2017/03/28/12/21/autumn-2182008_1280.jpg')`,
        }}
    >
        <div className="w-full min-h-screen flex flex-col justify-evenly md:flex-row md:justify-center">
            {/* About Section - Left Side */}
            <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
                <div className="w-full max-w-md bg-white/20 backdrop-blur-sm p-6 md:p-8 rounded-lg">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Currency Converter</h1>
                    <p className="text-white/90 text-lg mb-4">
                        A simple and efficient way to convert currencies in real-time. 
                        Support for multiple international currencies with up-to-date exchange rates.
                    </p>
                    <ul className="text-white/80 list-disc list-inside">
                        <li>Real-time conversion rates</li>
                        <li>Support for major global currencies</li>
                        <li>Easy to use interface</li>
                        <li>Instant calculations</li>
                    </ul>
                </div>
            </div>

            {/* Converter Section - Right Side */}
            <div className="w-full md:w-1/2 p-4 md:p-8 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="mb-4 flex flex-wrap gap-2 justify-center">
                        {commonPairs.map((pair) => (
                            <button
                                key={`${pair.from}-${pair.to}`}
                                onClick={() => handleQuickSelect(pair.from, pair.to)}
                                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md text-white text-sm hover:bg-white/30 transition-colors"
                            >
                                {pair.label}
                            </button>
                        ))}
                    </div>
                    <div className="w-full border border-gray-60 rounded-lg p-6 backdrop-blur-sm bg-white/20">
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                convert();
                            }}
                        >
                            <div className="w-full mb-1">
                                <InputBox
                                    label="From"
                                    amount={amount}
                                    currencyOptions={options}
                                    onCurrencyChange={(currency) => setFrom(currency)}
                                    selectCurrency={from}
                                    onAmountChange={(amount) => setAmount(amount || '')}
                                />
                            </div>
                            <div className="relative w-full h-0.5">
                                <button
                                    type="button"
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                    onClick={swap}
                                >
                                    swap
                                </button>
                            </div>
                            <div className="w-full mt-1 mb-4">
                                <InputBox
                                    label="To"
                                    amount={convertedAmount}
                                    currencyOptions={options}
                                    onCurrencyChange={(curr) => setTo(curr)}
                                    selectCurrency={to} 
                                    amountDisabled
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                                Convert ({from.toUpperCase()} to {to.toUpperCase()})
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Creator Contact Section */}
        <div className="fixed bottom-0 md:bottom-4 md:right-4 w-full md:w-auto flex justify-center p-4 md:p-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center gap-3 text-white">
                <span className="flex items-center gap-2">
                    <span className="text-sm">Made with</span>
                    {/* React icon (replaces the word "React") */}
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        <g stroke="currentColor">
                            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(45 12 12)" />
                            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" transform="rotate(-45 12 12)" />
                            <ellipse cx="12" cy="12" rx="6.5" ry="2.5" />
                        </g>
                    </svg>
                    <span className="text-sm">by Aryan</span>
                </span>

                <div className="flex gap-3 items-center">
                    <a
                        href="https://github.com/AryanAthreya"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-white hover:text-blue-400"
                        aria-label="Aryan's GitHub"
                    >
                        {/* GitHub icon (same size) */}
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M12 .5C5.73.5.99 5.24.99 11.5c0 4.64 3.01 8.57 7.19 9.96.53.1.72-.23.72-.51 0-.25-.01-.91-.02-1.79-2.92.64-3.54-1.41-3.54-1.41-.48-1.21-1.17-1.53-1.17-1.53-.96-.66.07-.65.07-.65 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.09-.69.37-1.15.67-1.42-2.33-.27-4.78-1.17-4.78-5.2 0-1.15.41-2.09 1.09-2.83-.11-.27-.47-1.36.1-2.83 0 0 .89-.29 2.92 1.08a10.14 10.14 0 012.66-.36c.9 0 1.8.12 2.66.36 2.03-1.37 2.92-1.08 2.92-1.08.57 1.47.21 2.56.1 2.83.68.74 1.09 1.68 1.09 2.83 0 4.04-2.46 4.92-4.8 5.18.38.33.72.98.72 1.98 0 1.43-.01 2.58-.01 2.93 0 .28.19.62.73.51C20 20.07 23 16.14 23 11.5 23 5.24 18.27.5 12 .5z"/>
                        </svg>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/aryan-athreya-968865270/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center text-white hover:text-blue-400"
                        aria-label="Aryan's LinkedIn"
                    >
                        {/* LinkedIn icon (same size) */}
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                            <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM8.5 8h3.84v2.16h.05c.54-1 1.86-2.16 3.82-2.16 4.09 0 4.84 2.69 4.84 6.18V24h-4V15.5c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24h-4V8z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App
// note:The useState() Hook in React is used to manage state in functional components. It allows you to create and update state variables, enabling your component to remember and respond to changes in data over time