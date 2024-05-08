import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const gamePlayers = (state: RootState) => state.game.data;

export const getShowLocations = (state: RootState) => state.game.showLocations;

export const getGamePlayers = createSelector(
    [getShowLocations, gamePlayers],
    (showLocations, players) => (showLocations ? players : [])
);
