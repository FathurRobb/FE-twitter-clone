import Sidebar from "../Components/Sidebar";
import { Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import CardPostEdit from "../Components/CardPostEdit";

const MyPost = () => {
    const navigate = useNavigate()

    const toHomePage = (e) => {
        e.preventDefault()
        navigate('/')
    }

    return (
        <Sidebar>
            <Container style={{cursor: 'pointer'}} className='px-0'>
                <div className="px-3">
                    <header className="d-flex align-items-center px-3">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={toHomePage} />
                        <h4 className="mx-4">My Post</h4>                    
                    </header>
                    <section>
                        <CardPostEdit />
                        <CardPostEdit />
                        <CardPostEdit />
                    </section>
                </div>
            </Container>
        </Sidebar>
    );
}
 
export default MyPost;