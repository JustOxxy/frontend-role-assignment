import * as Leaflet from "leaflet";
import { Player } from "../redux/game/types";

export const getPlayerCoordinates = (map: Leaflet.Map, player: Player) => {
  return map.latLngToContainerPoint([
    player.position.latitude,
    player.position.longitude,
  ]);
};
