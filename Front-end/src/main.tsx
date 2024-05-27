import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ClientesPage from "@/pages/clientes"
import FiltroPage from "@/pages/Filtro"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import ClienteIdPage from '@/pages/ClienteId/index.tsx'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
   
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<App />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/clienteId/:id" element={<ClienteIdPage />} />
        <Route path="/filtro" element={<FiltroPage />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
