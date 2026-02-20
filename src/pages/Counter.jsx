// Counter.jsx — Counter component with Increment, Decrement (min 0), and Reset

import { useState } from 'react';

function Counter() {
    const [value, setValue] = useState(0);

    const increment = () => setValue((prev) => prev + 1);
    const decrement = () => setValue((prev) => (prev > 0 ? prev - 1 : 0)); // min 0
    const reset = () => setValue(0);

    // Color: red when 0, green when > 0
    const valueColor = value === 0 ? '#e74c3c' : '#27ae60';

    return (
        <div className="page">
            <div className="counter-box">
                <span className="label-mono">Calibration Instrument / Mode_A</span>
                <h1>Counter</h1>

                <div className="glass-card counter-instrument">
                    <div
                        className="counter-value"
                        style={{ color: value === 0 ? 'var(--text-white)' : 'var(--accent)' }}
                    >
                        {value.toString().padStart(2, '0')}
                    </div>

                    <div className="gauge-bar">
                        <div
                            className="gauge-fill"
                            style={{ width: `${Math.min(value * 10, 100)}%` }}
                        ></div>
                    </div>

                    <div className="counter-btns">
                        <button className="circle-btn btn-dec" onClick={decrement} title="Decrement">
                            −
                        </button>
                        <button className="circle-btn btn-res" onClick={reset} title="Reset">
                            ↺
                        </button>
                        <button className="circle-btn btn-inc" onClick={increment} title="Increment">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Counter;
