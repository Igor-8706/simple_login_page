import React,{  useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const focus = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(ref,()=>{
        return {
            focus: focus
        }
    })

    return (
        <div
            className={`${props.styles.control} ${props.state.isValid === false ? props.styles.invalid : ""
                }`}
        >
            <label htmlFor={props.label}>{props.label}</label>
            <input
                ref={inputRef}
                type={props.label}
                id={props.label}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
})

export default Input;