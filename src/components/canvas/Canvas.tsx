import { useEffect, useState } from "react";
import { LeafletFabricLayer } from "./leaflet-extensions.config";
import * as Leaflet from "leaflet";
import { fabric } from "fabric";
import { useSelector, useDispatch } from "react-redux";
import { getGamePlayers } from "../../redux/game/selectors";
import { getCanvasPlayersObjects } from "../../helpers/getCanvasPlayersObjects";

export default function Canvas({ map }: { map: Leaflet.Map }): null {
    const [fabricLayer, setFabricLayer] = useState(null);
    const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(
        null
    );
    const playersData = useSelector(getGamePlayers);
    const dispatch = useDispatch();

    useEffect(() => {
        const fabricLayer = new LeafletFabricLayer();

        const fabricLayerDidMount = () => {
            const fabricCanvas = new fabric.Canvas(fabricLayer._canvas);
            fabricLayer.setFabricCanvas(fabricCanvas);
            fabricCanvas.requestRenderAll();
            setFabricCanvas(fabricCanvas);
        };

        fabricLayer.delegate({
            onLayerDidMount: fabricLayerDidMount,
        });
        fabricLayer.addTo(map);

        setFabricLayer(fabricLayer);
    }, [map]);

    useEffect(() => {
        if (!(playersData && fabricCanvas && fabricLayer)) return;

        const canvasPlayersData = {
            canvas: fabricCanvas,
            map,
            players: playersData,
            dispatch,
        };

        const fabricLayerDidMove = () =>
            getCanvasPlayersObjects(canvasPlayersData);

        getCanvasPlayersObjects(canvasPlayersData);

        fabricLayer?.delegate({
            onLayerDidMove: fabricLayerDidMove,
        });
    }, [playersData, fabricCanvas, fabricLayer]);

    return null;
}
