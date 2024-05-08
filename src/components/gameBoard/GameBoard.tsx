import Map from "../map/Map";
import Button from "../button/Button";
import { useSelector } from "react-redux";
import { getShowLocations } from "../../redux/game/selectors";

export const GameBoard: React.FC = () => {
    const showLocations = useSelector(getShowLocations);

    const buttonText = showLocations ? "Hide Locations" : "Show Locations";

    return (
        <>
            <Map />
            <Button text={buttonText} />
        </>
    );
};
