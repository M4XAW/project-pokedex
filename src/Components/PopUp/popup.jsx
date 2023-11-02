import React from 'react'
import './popup.scss'

export default function Popup(props) {

    return (
        <div className="back">
            <div className="popUp">
                <h2>Êtes-vous sûr de vouloir supprimer ce Pokémon ?</h2>
                <div className="choice">
                    <button className='cancel' onClick={props.closePopup}>Annuler</button>
                    <button className='confirm' onClick={props.confirmPopup}>Confirmer</button>
                </div>
            </div>
        </div>
    )
}
