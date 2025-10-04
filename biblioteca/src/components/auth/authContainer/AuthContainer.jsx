import { Card, CardBody, Row } from "react-bootstrap"

const AuthContainer = ({children}) => {
  return (
    <Card  className="mt-5 mx-3 p-3 px-5 shadow">
        <CardBody>
            <Row  className="mb-2">
                <h2>Bienvenidos a Books Champion</h2>
            </Row>
            {children}
        </CardBody>
    </Card>
  )
}

export default AuthContainer