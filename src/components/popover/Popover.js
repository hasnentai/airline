import React, { useState } from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "./Popover.scss";
const PopoverComponent = (props) => {
    // const [popoverOpen, setPopoverOpen] = useState(false);

    // const toggle = () => setPopoverOpen(!popoverOpen);

    return (
        <div className="custom-pop">
            <div className="form-validation-field-1formError parentFormlogin-view formError">
    <div className="formErrorContent">{props.children}</div>
                <div className="formErrorArrow"><div className="line10"></div><div className="line9"></div><div className="line8"></div><div className="line7"></div><div className="line6"></div><div className="line5"></div><div className="line4"></div><div className="line3"></div><div className="line2"></div><div className="line1"></div></div>
            </div>
        </div>
    );
}

export default PopoverComponent;