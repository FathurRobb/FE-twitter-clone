import { Button } from "react-bootstrap";

const ButtonAction = ({variant,text}) => {
    return (
        <Button variant={variant} type="submit">{text}</Button>
    )   
}

export default ButtonAction;