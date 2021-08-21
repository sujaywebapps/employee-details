import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { PropTypes } from "prop-types";
import Loading from "../Loading";

const WrpAccordian = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${window.innerWidth > 768 ? "row" : "column"};
  background-color: transparent;

  .acc-item-desc.active {
    width: 100%;
    min-height: 35rem;
    height: 100%;
  }
  .acc-item.active {
    border-right: 3px solid #e20074;
  }
`;

const AccordianItem = styled.div`
  padding: 1rem;
  background-color: white;
  border-right: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: ${window.innerWidth > 768 ? "column" : "row"};
  justify-content: space-between;
`;

const AccordianItemDesc = styled.div`
  width: ${window.innerWidth > 768 ? "0" : "100%"};
  position: relative;
  overflow: hidden;
  min-height: ${window.innerWidth > 768 ? "35rem" : "0rem"};
  height: ${window.innerWidth > 768 ? "100%" : "0"};
  transition: all 300ms ease-in;
`;

function CascadeLayout(props) {
  const { accordianList, defaultSelection } = props;
  const [reloader, setReloader] = useState("accDesc0");
  const [displayContent, setDisplayContent] = useState(false);
  const accordianWrpRef = useRef(null);

  const handleClick = (e) => {
    setDisplayContent(false);
    const allDescColl =
      accordianWrpRef.current.getElementsByClassName("acc-item-desc");
    const allItemColl =
      accordianWrpRef.current.getElementsByClassName("acc-item");
    const allItem = Array.from(allItemColl);
    const allDesc = Array.from(allDescColl);
    allDesc.forEach((element, i) => {
      allItem[i].classList.remove("active");
      element.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    accordianWrpRef.current
      .querySelector(`#${e.currentTarget.dataset.accdescid}`)
      .classList.add("active");
    setReloader(e.currentTarget.dataset.accdescid);
    setTimeout(() => {
      setDisplayContent(true); // count is 0 here
    }, 1000);
  };

  const removeActives = useCallback(() => {
    const allDescColl =
      accordianWrpRef.current.getElementsByClassName("acc-item-desc");
    const allItemColl =
      accordianWrpRef.current.getElementsByClassName("acc-item");
    const allItem = Array.from(allItemColl);
    const allDesc = Array.from(allDescColl);
    allDesc.forEach((element, i) => {
      allItem[i].classList.remove("active");
      element.classList.remove("active");
    });
    if (allDesc.length) {
      allItem[defaultSelection].classList.add("active");
      allDesc[defaultSelection].classList.add("active");
    }
  }, [defaultSelection]);

  useEffect(() => {
    setDisplayContent(false);

    removeActives();
    setTimeout(() => {
      setDisplayContent(true); // count is 0 here
    }, 1000);
    setReloader(`accDesc${defaultSelection}`);
  }, [defaultSelection, removeActives]);

  return (
    <WrpAccordian ref={accordianWrpRef}>
      {accordianList.map((accItem, i) => (
        <>
          {reloader && ""}
          <AccordianItem
            className={`acc-item ${i === defaultSelection ? "active" : ""}`}
            data-accDescId={`accDesc${i}`}
            onClick={handleClick}
          >
            {accItem.label}
          </AccordianItem>
          <AccordianItemDesc
            className={`acc-item-desc ${
              i === defaultSelection ? "active" : ""
            }`}
            id={`accDesc${i}`}
          >
            {displayContent ? accItem.value : <Loading />}
          </AccordianItemDesc>
        </>
      ))}
    </WrpAccordian>
  );
}

CascadeLayout.propTypes = {
  accordianList: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultSelection: PropTypes.number,
};
CascadeLayout.defaultProps = {
  defaultSelection: 0,
};

export default CascadeLayout;
