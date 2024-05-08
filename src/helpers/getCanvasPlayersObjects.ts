import { Dispatch } from "react";
import { TeamName } from "../constants";
import { Player } from "../redux/game/types";
import { getPlayerCoordinates } from "./getPlayerCoordinates";
import { getResolution } from "./getResolution";
import * as Leaflet from "leaflet";
import { UnknownAction } from "redux-saga";
import { deletePlayerAction } from "../redux/game/reducer";
import { fabric } from "fabric";

interface CanvasPlayersObjectsProps {
  canvas: fabric.Canvas;
  map: Leaflet.Map;
  players: Player[];
  dispatch: Dispatch<UnknownAction>;
}

export const getCanvasPlayersObjects = ({
  canvas,
  map,
  players,
  dispatch,
}: CanvasPlayersObjectsProps) => {
  canvas.remove(...canvas.getObjects());

  const resolution = getResolution(map.getCenter(), map.getZoom());
  const strokeWidth = 1.5 / resolution;
  const size = 7 / resolution;

  players.map((player) => {
    const coordinates = getPlayerCoordinates(map, player);
    let obj;

    if (player.teamName === TeamName.Red) {
      obj = new fabric.Rect({
        width: size,
        height: size,
        left: coordinates.x,
        top: coordinates.y,
        fill: "white",
        strokeWidth,
        stroke: "red",
      });
    }

    if (player.teamName === TeamName.Blue) {
      obj = new fabric.Circle({
        fill: "blue",
        left: coordinates.x,
        top: coordinates.y,
        radius: 4 / resolution,
        strokeWidth,
        stroke: "white",
      });
    }

    canvas.add(obj);

    obj.on("mousedown", () => {
      dispatch(deletePlayerAction(player.id));
      setTimeout(() => alert(`Player ${player.name} is out of the game!`), 200);
    });
  });
};
