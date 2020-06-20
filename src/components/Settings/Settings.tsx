import React from "react";
//import css from './Settings.module.css'
import EditProfContainer from "../ProfileContent/EditProf/EditProfContainer";

const Settings = React.memo<{}>(() => {
    return (
        <div>
            <h1>Настройки</h1>
            <EditProfContainer />
        </div>
    );
});

export default Settings;