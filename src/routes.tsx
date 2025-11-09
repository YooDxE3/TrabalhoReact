import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./pages/Home"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import { Clientes } from "./pages/Clientes"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"
import GerenciarClientes from "./pages/Clientes/Gerenciar"
import Login from "./pages/Login"


export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/categorias/:id"
                    element={<Categorias />}
                />
                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />
                <Route
                    path="/usuarios/:id"
                    element={<GerenciarUsuarios />}
                />

                <Route
                    path="/clientes"
                    element={<Clientes />}
                />
                <Route
                    path="/clientes/:id"
                    element={<GerenciarClientes />}
                />
                
                <Route
                    path="*"
                    element={<h1>404</h1>}
                />
            </Routes>
        </BrowserRouter>
    )
}