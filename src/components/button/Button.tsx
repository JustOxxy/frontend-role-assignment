import "./styles.css";

interface ButtonProps {
    text: string;
    color?: string;
    onClick?: () => void;
}

export default function Button({ text, color, onClick }: ButtonProps) {
    return (
        <button onClick={onClick} style={{ backgroundColor: color }}>
            {text}
        </button>
    );
}
