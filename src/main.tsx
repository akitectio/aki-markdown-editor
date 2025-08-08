import React from 'react'
import ReactDOM from 'react-dom/client'
import ExampleApp from './examples/ExampleApp'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ExampleApp />
    </React.StrictMode>,
)
