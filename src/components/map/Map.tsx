import * as Leaflet from "leaflet";
import { useEffect, useState } from "react";
import "./styles.css";
import Canvas from "../canvas/Canvas";
import { MAPBOX_TOKEN } from "../../constants";

export const LEAFLET_OPTIONS = {
    zoomControl: true,
    loadingControl: true,
    attributionControl: false,
    accessToken: MAPBOX_TOKEN,
};

export default function Map() {
    const [map, setMap] = useState<Leaflet.Map | null>(null);

    useEffect(() => {
        setMap(() => {
            const leafletMap = Leaflet.map("mapid", LEAFLET_OPTIONS).setView(
                [55.6739075, 12.5692004],
                17
            );

            Leaflet.tileLayer(
                "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                {
                    tileSize: 512,
                    zoomOffset: -1,
                    id: "mapbox/satellite-v9",
                    accessToken: MAPBOX_TOKEN,
                }
            ).addTo(leafletMap);

            return leafletMap;
        });
    }, []);

    return (
        <div id="mapid" className="map">
            {map && <Canvas map={map} />}
        </div>
    );
}
