'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Motion, StaggeredMotion, spring } from 'react-motion';
import range from 'lodash.range';

// Components 

//Constants 

// Diameter of the main button in pixels
const MAIN_BUTTON_DIAM = 90;
const CHILD_BUTTON_DIAM = 48;
// The number of child buttons that fly out from the main button
// PACO const NUM_CHILDREN = 4;
// Hard code the position values of the mainButton
//const M_X = 200;
//const M_Y = 200;

//should be between 0 and 0.5 (its maximum value is difference between scale in finalChildButtonStyles a
// nd initialChildButtonStyles)
const OFFSET = 0.05;

//const SPRING_CONFIG = { stiffness: 400, damping: 28 };
const SPRING_CONFIG = { stiffness: 150, damping: 8 };

// How far away from the main button does the child buttons go
const FLY_OUT_RADIUS = 130;
const SEPARATION_ANGLE = 40; //degrees

// Names of icons for each button retreived from fontAwesome, we'll add a little extra just in case 
// the NUM_CHILDREN is changed to a bigger value


// Utility functions

function toRadians(degrees) {
    return degrees * (Math.PI / 180)
}

function finalChildDeltaPositions(index, base_angle, child_button_diam) {
    let angle = base_angle + (index * SEPARATION_ANGLE);
    return {
        deltaX: FLY_OUT_RADIUS * Math.cos(toRadians(angle)) - (child_button_diam / 2),
        deltaY: FLY_OUT_RADIUS * Math.sin(toRadians(angle)) + (child_button_diam / 2)
    };
}


class MotionMenuDemo extends React.Component {
    constructor(props) {
        super(props);
        this.background_color = props.background_color;
        this.color = props.color;

        this.childButtonDiam = props.childButtonDiam;
        this.mainButtonDiam = props.mainButtonDiam;

        this.childButtonLinks = props.childButtonLinks;
        this.childButtonIcons = props.childButtonIcons;

        this.mainButton_X = props.mainButton_X;
	    this.mainButton_Y = props.mainButton_Y;
	    this.mainButtonIcon = props.mainButtonIcon;

    	this.num_children = props.childButtonIcons.length;
    	this.fan_angle = (this.num_children - 1) * SEPARATION_ANGLE, //degrees
    	this.base_angle = ((180 - this.fan_angle) / 2); // degrees

        this.state = {
            isOpen: false,
            childButtons: []
        };

        // Bind this to the functions
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.closeMenu);
        let childButtons = [];

        this.setState({ childButtons: childButtons.slice(0) });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.closeMenu);
    }

    mainButtonStyles() {
        return {
            width: this.mainButtonDiam,
            height: this.mainButtonDiam,
            top: this.mainButton_Y - (this.mainButtonDiam / 2),
            left: this.mainButton_X - (this.mainButtonDiam / 2),
            backgroundColor: this.background_color,
            color: this.color,
        };
    }

    initialChildButtonStyles() {
        return {
            color: this.background_color,
            width: this.childButtonDiam,
            height: this.childButtonDiam,
            top: spring(this.mainButton_Y - (this.childButtonDiam / 2), SPRING_CONFIG),
            left: spring(this.mainButton_X - (this.childButtonDiam / 2), SPRING_CONFIG),
            rotate: spring(-180, SPRING_CONFIG),
            scale: spring(0.5, SPRING_CONFIG)
        };
    }

    initialChildButtonStylesInit() {
        return {
            color: this.background_color,
            width: this.childButtonDiam,
            height: this.childButtonDiam,
            top: this.mainButton_Y - (this.childButtonDiam / 2),
            left: this.mainButton_X - (this.childButtonDiam / 2),
            rotate: -180,
            scale: 0.5
        };
    }

    finalChildButtonStylesInit(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex, this.base_angle, this.childButtonDiam);
        return {
            color: this.background_color,
            width: this.childButtonDiam,
            height: this.childButtonDiam,
            top: this.mainButton_Y - deltaY,
            left: this.mainButton_X + deltaX,
            rotate: 0,
            scale: 1
        };
    }

    finalChildButtonStyles(childIndex) {
        let { deltaX, deltaY } = finalChildDeltaPositions(childIndex, this.base_angle, this.childButtonDiam);
        return {
            color: this.background_color,
            width: this.childButtonDiam,
            height: this.childButtonDiam,
            top: spring(this.mainButton_Y - deltaY, SPRING_CONFIG),
            left: spring(this.mainButton_X + deltaX, SPRING_CONFIG),
            rotate: spring(0, SPRING_CONFIG),
            scale: spring(1, SPRING_CONFIG)
        };
    }

    toggleMenu(e) {
        e.stopPropagation();
        let { isOpen } = this.state;
        this.setState({
            isOpen: !isOpen
        });
    }

    closeMenu() {
        this.setState({ isOpen: false });
    }

    renderChildButtons() {
        const { isOpen } = this.state;
        const targetButtonStylesInitObject = range(this.num_children).map(i => {
            return isOpen ? this.finalChildButtonStylesInit(i) : this.initialChildButtonStylesInit();
        });

        //StaggeredMotion now takes an Array of object
        const targetButtonStylesInit = Object.keys(targetButtonStylesInitObject).map(key => targetButtonStylesInitObject[key]);

        const targetButtonStyles = range(this.num_children).map(i => {
            return isOpen ? this.finalChildButtonStyles(i) : this.initialChildButtonStyles();
        });

        const scaleMin = this.initialChildButtonStyles().scale.val;
        const scaleMax = this.finalChildButtonStyles(0).scale.val;

        //This function returns target styles for each child button in current animation frame
        //according to actual styles in previous animation frame.
        //Each button could have one of two target styles
        // - defined in initialChildButtonStyles (for collapsed buttons)
        // - defined in finalChildButtonStyles (for expanded buttons)
        // To decide which target style should be applied function uses css 'scale' property
        // for previous button in previous animation frame.
        // When 'scale' for previous button passes some 'border' which is a simple combination one of
        // two 'scale' values and some OFFSET the target style for next button should be changed.
        //
        // For example let's set the OFFSET for 0.3 - it this case border's value for closed buttons will be 0.8.
        //
        // All buttons are closed
        //                INITIAL-BUTTON-SCALE-(0.5)-----------BORDER-(0.8)------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------------------|--------------------------------|
        // BUTTON NO 1    o------------------------------------------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        // When user clicks on menu button no 1 changes its target style according to finalChildButtonStyles method
        // and starts growing up. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was in previous animation frame
        // BUTTON NO 1    -----------------------------------o-------|---------------------------------
        // BUTTON NO 2    o------------------------------------------|---------------------------------
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed.
        // BUTTON NO 1    -------------------------------------------|-o-------------------------------
        // BUTTON NO 2    -----o-------------------------------------|---------------------------------
        //
        //
        // All buttons are expanded - in this case border value is 0.7 (OFFSET = 0.3)
        //                INITIAL-BUTTON-SCALE-(0.5)---BORDER-(0.7)--------------FINAL-BUTTON-SCALE-(1)
        //                |------------------------------|--------------------------------------------|
        // BUTTON NO 1    -------------------------------|--------------------------------------------O
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        // When user clicks on menu button no 1 changes its target style according to initialChildButtonStyles method
        // and starts shrinking down. In this frame this button doesn't pass the border so target style for button no 2
        // stays as it was defined in finalChildButtonStyles method
        // BUTTON NO 1    -------------------------------|------------------------------------O--------
        // BUTTON NO 2    -------------------------------|--------------------------------------------O
        //
        //
        //
        // (...few frames later)
        // In previous frame button no 1 passes the border so target style for button no 2 could be changed
        // and this button starts to animate to its default state.
        // BUTTON NO 1    -----------------------------o-|---------------------------------------------
        // BUTTON NO 2    -------------------------------|------------------------------------O--------
        let calculateStylesForNextFrame = prevFrameStyles => {
            prevFrameStyles = isOpen ? prevFrameStyles : prevFrameStyles.reverse();

            let nextFrameTargetStyles = prevFrameStyles.map((buttonStyleInPreviousFrame, i) => {
                //animation always starts from first button
                if (i === 0) {
                    return targetButtonStyles[i];
                }

                const prevButtonScale = prevFrameStyles[i - 1].scale;
                const shouldApplyTargetStyle = () => {
                    if (isOpen) {
                        return prevButtonScale >= scaleMin + OFFSET;
                    } else {
                        return prevButtonScale <= scaleMax - OFFSET;
                    }
                };

                return shouldApplyTargetStyle() ? targetButtonStyles[i] : buttonStyleInPreviousFrame;
            });

            return isOpen ? nextFrameTargetStyles : nextFrameTargetStyles.reverse();
        };

        return (
            <StaggeredMotion
                defaultStyles={targetButtonStylesInit}
                styles={calculateStylesForNextFrame}>
				{interpolatedStyles =>
                    <div>
						{interpolatedStyles.map(({height, left, rotate, scale, top, width}, index) =>
                                <div
                                    className="child-button"
                                    key={index}
                                    style={{
                                        left,
                                        height,
                                        top,
                                        transform: `rotate(${rotate}deg) scale(${scale})`,
                                        width
                                    }}
                                >
                                    <a href={this.childButtonLinks[index]}>
                                        <i className={this.childButtonIcons[index].startsWith('fa ')?this.childButtonIcons[index]:'material-icons'}>
                                        {this.childButtonIcons[index].startsWith('fa ')?'':this.childButtonIcons[index]}
                                        </i>
                                    </a>
                                </div>
                        )}
                    </div>
                    }
            </StaggeredMotion>
        );
    }

    render() {
        let buttonClass = this.mainButtonIcon.startsWith('fa ')?this.mainButtonIcon:'material-icons md-'+this.mainButtonDiam;
        let buttonInner = this.mainButtonIcon.startsWith('fa ')?'':this.mainButtonIcon;
        let { isOpen } = this.state;
        let mainButtonRotation =
            isOpen ? { rotate: spring(0, { stiffness: 500, damping: 30 }) } : { rotate: spring(-135, { stiffness: 500, damping: 30 }) };
        return (
            <div>
				{this.renderChildButtons()}
                <Motion style={mainButtonRotation}>
					{({rotate}) =>
                        <div
                            className="main-button"
                            style={this.mainButtonStyles()}
                            onClick={this.toggleMenu}>
							{/*Using fa-close instead of fa-plus because fa-plus doesn't center properly*/}
                            <i className={buttonClass}>{buttonInner}</i>
                        </div>
                        }
                </Motion>
            </div>
        );
    }
};

module.exports = MotionMenuDemo;
