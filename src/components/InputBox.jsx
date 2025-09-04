import React,{useId} from 'react';
// understanding this component: it is a Input box that is taking label selection and class name from the user 
// this is a component we made.

//  USING "useId" react hook

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions=[],
    selectCurrency="usd",
    amountDisabled=false,    // fixed spelling from amountDissabled
    currencyDisabled=false,  // fixed spelling from currencyDissabled
    className = "",
}) {

    // implementing useid hook: this get us unique values only.
    const amountInputId= useId()
   

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <input
                // now the input field is binded with the label
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e)=>onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)} // removed Number()
                    disabled={currencyDisabled}
                >
                    {/* note remember using key if want to loop without slowing down you app || curr :: currency variable*/}
                        {currencyOptions.map((curr)=>(
                            <option key={curr} value={curr}>
                            {curr}
                        </option>
                        ))}
                
                </select>
            </div>
        </div>
    );
}

export default InputBox;
// exporting this way is ok , but the better approach is to firm import it into a nabering inedx file and only then exporting it , beacuse if we don't do so it can cause mess i production grade operations.
