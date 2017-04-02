import React from 'react';
import ReactDOM from 'react-dom';
import MotionMenu from './MotionMenuDemo';

function renderMotionMenu (divId, mainButtonProps, childButtonProps, color, bgcolor) {
	ReactDOM.render(
	    <MotionMenu 
		    childButtonIcons={childButtonProps.icons}
            childButtonLinks={childButtonProps.links}
            childButtonDiam={childButtonProps.diam}
		    mainButtonIcon={mainButtonProps.icon}
            mainButtonDiam={mainButtonProps.diam}
            mainButton_X={mainButtonProps.pos_x}
            mainButton_Y={mainButtonProps.pos_y}
            color={color} background_color={bgcolor}
            />,
	    document.querySelector(divId)
	);
    return;
}
window.renderMotionMenu = renderMotionMenu;
