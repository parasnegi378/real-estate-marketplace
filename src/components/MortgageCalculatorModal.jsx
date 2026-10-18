import React, { useState } from 'react';
import { useProperties } from '../context/PropertyContext';
import { 
  X, 
  Calculator, 
  Sparkles, 
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function MortgageCalculatorModal() {
  const { isCalculatorModalOpen, setIsCalculatorModalOpen, openSiteVisit } = useProperties();

  const [flatPrice, setFlatPrice] = useState(4500000); // ₹45 Lakhs
  const [downPaymentPct, setDownPaymentPct] = useState(10); // 10% down payment (90% Loan!)
  const [loanTenureYears, setLoanTenureYears] = useState(20); // 20 years
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% SBI/HDFC

  if (!isCalculatorModalOpen) return null;

  // EMI Math
  const downPaymentAmount = Math.round((flatPrice * downPaymentPct) / 100);
  const loanAmount = Math.max(0, flatPrice - downPaymentAmount);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTenureYears * 12;

  const monthlyEmi = loanAmount > 0 && monthlyRate > 0
    ? Math.round(
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      )
    : 0;

  const totalRepayment = monthlyEmi * totalMonths;
  const totalInterestPaid = Math.max(0, totalRepayment - loanAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-900 tracking-tight">
                  90% Bank Loan EMI Calculator (गृह ऋण कैलकुलेटर)
                </h2>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  90% Loan Approved
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Indraprastha Yojana, Ghaziabad (Near Dehradun Expressway) • SBI, PNB, HDFC
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCalculatorModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Top Monthly EMI Result Box */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-extrabold uppercase mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                90% Loan Available (Pay Only 10% Down)
              </div>
              <p className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ₹{monthlyEmi.toLocaleString('en-IN')}
                <span className="text-base text-slate-400 font-medium">/month</span>
              </p>
              <p className="text-xs text-slate-300 mt-2">
                For ₹{(flatPrice / 100000).toFixed(1)} Lakhs flat • Just ₹{(downPaymentAmount / 100000).toFixed(1)} Lakhs Down Payment!
              </p>
            </div>

            <div className="w-full md:w-auto bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 text-xs space-y-2">
              <div className="flex justify-between gap-6">
                <span className="text-slate-300">90% Loan Amount:</span>
                <span className="font-bold text-emerald-400">₹{loanAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-slate-300">10% Down Payment:</span>
                <span className="font-bold text-amber-400">₹{downPaymentAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-slate-300">Total Interest Payable:</span>
                <span className="font-bold">₹{totalInterestPaid.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Flat Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Flat Price</label>
                <span className="text-xs font-black text-amber-700">
                  ₹{(flatPrice / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="2000000"
                max="9000000"
                step="100000"
                value={flatPrice}
                onChange={(e) => setFlatPrice(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹20 Lakhs (Min)</span>
                <span>₹55 Lakhs</span>
                <span>₹90 Lakhs (Max)</span>
              </div>
            </div>

            {/* Down Payment % Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Down Payment ({downPaymentPct}%) • <span className="text-emerald-700 font-bold">{100 - downPaymentPct}% Loan</span>
                </label>
                <span className="text-xs font-black text-amber-700">
                  ₹{(downPaymentAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="5"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span className="text-emerald-700 font-bold">10% (90% Loan Approved)</span>
                <span>20%</span>
                <span>40%</span>
              </div>
            </div>

            {/* Loan Tenure */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Loan Tenure (Years)</label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 15, 20, 25].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setLoanTenureYears(yr)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      loanTenureYears === yr
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm font-black'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {yr} Yrs
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700">Home Loan Interest Rate</label>
                <span className="text-xs font-black text-amber-700">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="10.5"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>8.0% (Special SBI Rate)</span>
                <span>8.5% (Standard)</span>
                <span>10.5%</span>
              </div>
            </div>

          </div>

          {/* Bank Tie-ups Note */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-xs text-emerald-950 space-y-1.5">
            <p className="font-extrabold flex items-center gap-1.5 text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              90% Loan Guarantee by Mahakal Property:
            </p>
            <p className="text-[11px] leading-relaxed">
              State Bank of India (SBI) • Punjab National Bank (PNB) • HDFC Bank • ICICI Bank. Our office handles the end-to-end file preparation, valuation, and bank sanctioning for you.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={() => {
                setIsCalculatorModalOpen(false);
                openSiteVisit(null);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Book Site Visit & Apply for 90% Loan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCalculatorModalOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
