import React from 'react';
import './styles/Modal.css';
function Modal(props)
{
    return(
        <div className="Modal">
            <div className="Modal_container">
                <div className="Modal_close-button">
                    <a href="#" onClick={props.closeModal}>X</a>
                </div>
                {props.children}
            </div>
        </div>
    );
}
export default Modal;