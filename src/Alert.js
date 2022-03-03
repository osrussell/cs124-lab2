import './Alert.css';

function Alert(props) {
    return <div className={"backdrop"}>
        <div className={"modal"}>
            {props.children}
            <div className="alert-buttons">
                <input className={"alert-yes"} type={"button"}
                        onClick={() => {
                            props.onClose();
                            props.onOk();
                        }}>
                    Delete Selected
                </input>
                <input className={"alert-no"} type={"button"}
                        onClick={props.onClose}>
                    No
                </input>
            </div>
        </div>
    </div>
}

export default Alert;