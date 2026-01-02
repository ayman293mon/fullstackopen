const Notifications = ({text}) => {
    if (!text) return null;
    const styleDiv = {
        padding: '10px',
        border: '1px solid red',
        margin: '20px',
        backgroundColor: '#ffcccc',
        color: 'red', 
        fontSize: '26px',
    }
    return (
        <div>
            {text && <div className="notification" style={styleDiv}>{text}</div>}
        </div>
    )
}
export default Notifications;