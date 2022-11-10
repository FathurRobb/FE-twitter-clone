import { Button } from "react-bootstrap";

const ButtonAction = ({variant,text,onClick,className,children}) => {
    return (
        <Button variant={variant} className={className} onClick={onClick} type="submit">{children}{text}</Button>
    )   
}

export default ButtonAction;