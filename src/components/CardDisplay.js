import "./CardDisplay.css"

function CardDisplay({ cardNumber, expirationDate }) {
    return (
        <div className="card-display" >

            <div className="card-number">**** **** **** {cardNumber}</div>
            <div className="expiration-date">Exp: {expirationDate}</div>

        </div>
    );
}
export default CardDisplay;