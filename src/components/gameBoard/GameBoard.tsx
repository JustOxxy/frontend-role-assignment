import Map from "../map/Map";
import Button from "../button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getShowLocations } from "../../redux/game/selectors";
import { setShowLocationsAction } from "../../redux/game/reducer";

export const GameBoard: React.FC = () => {
    const dispatch = useDispatch();
    const showLocations = useSelector(getShowLocations);

    const handleShowLocationsButtonClick = () => {
        dispatch(setShowLocationsAction());
    };

    const buttonColor = showLocations ? "red" : "blue";
    const buttonText = showLocations ? "Hide Locations" : "Show Locations";

    return (
        <>
            <Map />
            <Button
                onClick={handleShowLocationsButtonClick}
                text={buttonText}
                color={buttonColor}
            />
        </>
    );
};
