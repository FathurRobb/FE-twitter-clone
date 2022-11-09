import { Alert } from "react-bootstrap";

const AlertAction = ({variant,message,onClose}) => {
    return (
        <Alert variant={variant} onClose={onClose} dismissible>{message}</Alert>
    )   
}

export default AlertAction;