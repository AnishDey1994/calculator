import { useState } from 'react';
import data from './config.json';
import './App.css';

const configString = data;

function App() {
	const [inputString, setInputString] = useState('');
	const [operator, setOperator] = useState(null);
	const [outputString, setOutputString] = useState('');

	const handleInput = (value, name) => {
		if (value === 'AC') {													//for clear all
			setInputString('');
			setOutputString('');
		} else {
			if (outputString !== '') {											//if output already exists || not first input
				if (isNaN(value) && value !== '=') {
					setInputString(outputString + value);
				} else if (!isNaN(value)) {
					setInputString(value);
				}
				setOutputString('');
			} else {															//first input || after reset
				if (value === '=') {
					setOutputString(handleCalculation());
				} else {
					if (!isNaN(value)) {
						setInputString(inputString + value);
					}
					if (isNaN(value) && inputString !== '') {
						let operatorObj = { name: name, sign: value };
						setInputString(inputString + value);
						setOperator(operator => ({
							...operator,
							...operatorObj
						}));
					}
				}
			}
		}

	}

	const handleCalculation = () => {
		let strArray = inputString.split(operator.sign);
		switch (operator.name) {
			case 'add':
				return +strArray[0] + +strArray[1];
			case 'sub':
				return strArray[0] - strArray[1];
			case 'mul':
				return strArray[0] * strArray[1];
			case 'div':
				return strArray[0] / strArray[1];
			case 'power':
				let res = strArray[0];
				for (let i = 1; i < strArray[1]; i++) {
					res = res * strArray[0]
				}
				return res;
			default:
				return inputString;
		}
	}
	return (
		<div className="App">
			<div className='calculatorWrapper'>
				<div className='calculatorScreen'>
					<p className='input'>{inputString && inputString}</p>
					<p className='output'>{outputString && outputString}</p>
				</div>
				<div className='calculatorController'>
					{
						configString.calElementArray && configString.calElementArray.length > 0 ?
							configString.calElementArray.map((operation, k) => (
								<button
									key={k}
									className='inputButton'
									onClick={() => handleInput(operation.sign, operation.name)}
								>
									{operation.sign}
								</button>
							)) : null
					}
				</div>
			</div>
		</div>
	);
}

export default App;