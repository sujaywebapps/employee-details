/* eslint-disable react/self-closing-comp */
import React, { useRef, useEffect, useState } from "react";
import styled, { StyleSheetManager } from "styled-components";
// import './index.css';

const Container = styled("div")`
  &.wrp {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: transparent;
    border-radius: 0.3em;
    transition: 300ms ease-in-out opacity;
  }
  .rotate-animation {
    animation: pulse 1.1s ease infinite;
  }
  /* .wrp([overlay]) {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.3em;
  } */

  &.wrp svg {
    width: 100%;
    height: 100%;
  }

  &.wrp {
    transition: 300ms ease-in-out transform;
    transform-origin: center center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    width: 3em;
    height: 3em;
  }

  .error-state {
    width: 5em;
    height: 5em;
    margin-left: -1em;
    margin-top: -1em;
    pointer-events: none;
    opacity: 0;
    transition: 300ms 200ms cubic-bezier(0.42, 0, 0.32, 2.42) transform,
      300ms 200ms ease-in-out opacity;
    transform: scale(0.8);
  }
  .error-state path,
  .error-state circle {
    fill: #ccc;
  }

  @keyframes pulse {
    0% {
      transform: rotate(0deg);
      transform-origin: center center;
    }
    100% {
      transform: rotate(360deg);
      transform-origin: center center;
    }
  }

  &.wrp-relative {
    position: relative;
    top: -1em;
    left: 0.5em;
    margin: 0em 0em;
    background-color: transparent;
  }
  @media only screen and (max-width: 768px) {
    &.wrp-relative {
      top: 0;
    }
  }
`;

const Loading = (props) => {
  // eslint-disable-next-line react/prop-types
  const { placement, style } = props;
  const targetNode = useRef(null);
  const [hasMounted, setHasMounted] = useState();
  useEffect(() => {
    setHasMounted(true);
  }, hasMounted);
  return (
    <>
      <div style={{ display: "none", zIndex: "-1" }} ref={targetNode}></div>
      {hasMounted && (
        <StyleSheetManager target={targetNode.current}>
          <Container
            id="wrp"
            className={placement === "relative" ? "wrp-relative wrp" : "wrp"}
            style={style}
          >
            <svg
              id="svg"
              className="pulse rotate-animation"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="#000000"
                opacity="0.2"
                strokeWidth="4"
                fill="transparent"
              />
              <circle cx="50" cy="50" r="20" opacity="0.1" fill="#000000" />
              <path
                fill="#FFAE01"
                transform="translate(50,50)"
                d="M1.7145055188062944e-15,-28A28,28,0,0,1,28,0L23,0A23,23,0,0,0,1.4083438190194562e-15,-23Z"
              />
            </svg>

            <svg viewBox="-10 -10 120 125" className="error-state" id="error">
              <path d="M50,21.682C34.359,21.684,21.683,34.36,21.682,50C21.683,65.641,34.359,78.317,50,78.318   C65.641,78.317,78.317,65.641,78.318,50C78.317,34.36,65.641,21.684,50,21.682z M50,73.968C36.764,73.944,26.056,63.236,26.032,50   C26.056,36.764,36.764,26.056,50,26.032C63.236,26.056,73.944,36.764,73.968,50C73.944,63.236,63.236,73.944,50,73.968z" />
              <path d="M50.202,58.153c1.201,0,2.175-0.974,2.175-2.175V36.162c0-1.201-0.974-2.175-2.175-2.175c-1.201,0-2.175,0.974-2.175,2.175   v19.816C48.027,57.179,49.001,58.153,50.202,58.153z" />
              <circle cx="50.202" cy="64.196" r="2.256" />
            </svg>
          </Container>
        </StyleSheetManager>
      )}
    </>
  );
};

export default Loading;
