import './App.css';
import { useReducer } from 'react';

function App() {

  const initState = {
    previous: '',
    operation: '',
    current: ''
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'digit':
        if (!state.operation) {
          return { ...state, previous: state.previous + action.payload }
        }
        if (state.current && !state.previous) {
          return {...state, previous: action.payload, current: ''}
        }
        return { ...state, current: state.current + action.payload }

      case 'operation':
        if (state.previous) {
          return { ...state, operation: action.payload }
        }
        else if (state.current) {
          return {previous: state.current, operation: action.payload, current: ''}
        }
        return { previous: '0', operation: action.payload, current: '' }

      case 'evaluate':
        return { previous: '', operation: '', current: eval(`${state.previous} ${state.operation} ${state.current}`) }

      case 'DEL':
        if (state.current) {
          return { ...state, current: '' }
        }
        else if (state.operation) {
          return { ...state, operation: '' }
        }
        return { ...state, previous: '' }

      case 'AC':
        return initState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{state.previous} {state.operation}</div>
        <div className='current-operand'>{state.current}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: 'AC' })}>AC</button>
      <button onClick={() => dispatch({ type: 'DEL' })}>DEL</button>
      <button onClick={() => dispatch({ type: 'operation', payload: '÷' })}>÷</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '1' })}>1</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '2' })}>2</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '3' })}>3</button>
      <button onClick={() => dispatch({ type: 'operation', payload: '*' })}>*</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '4' })}>4</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '5' })}>5</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '6' })}>6</button>
      <button onClick={() => dispatch({ type: 'operation', payload: '+' })}>+</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '7' })}>7</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '8' })}>8</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '9' })}>9</button>
      <button onClick={() => dispatch({ type: 'operation', payload: '-' })}>-</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '.' })}>.</button>
      <button onClick={() => dispatch({ type: 'digit', payload: '0' })}>0</button>
      <button className='span-two' onClick={() => dispatch({ type: 'evaluate' })}>=</button>
    </div>
  );
}

export default App;
