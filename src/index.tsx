import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style.css";
import useConstructor from "./useConstructor";
import ExtendLeafletPrototypes from "./components/canvas/leaflet-extensions.config";
import { GameBoard } from "./components/gameBoard/GameBoard";

function App() {
    useConstructor(() => {
        ExtendLeafletPrototypes();
    });

    return (
        <Provider store={store}>
            <GameBoard />
        </Provider>
    );
}

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);
