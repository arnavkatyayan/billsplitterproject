import React from "react";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from "react-bootstrap";

function BillSplitter() {
    const [bill, setBill] = useState("");
    const [customTip, setCustomTip] = useState("");
    const [people, setPeople] = useState(0);
    const [isTipBtnDisabled, setIsTipBtnDisabled] = useState(true);
    const [isCustomTip, setIsCustomTip] = useState(false);
    const [tip, setTip] = useState("");
    const [total, setTotal] = useState("");
    const [head, setHead] = useState("");
    const [tipBtnIdx, setTipBtnIdx] = useState(-1);
    const tips = ["5%", "10%", "15%", "20%", "25%", "30%"];

    const handleBill = (evt) => {
        setBill(evt.target.value);
    }

    useEffect(() => {
        if (customTip.trim().length) {
            setIsCustomTip(true);
        }
    }, [customTip]);

    useEffect(() => {
        if (bill.trim().length) {
            setIsTipBtnDisabled(false);
        }
        if(bill.trim().length === 0) {
            setIsTipBtnDisabled(true);
        }
    }, [bill]);

    const handleCustomTip = (evt) => {
        setCustomTip(evt.target.value);
    }

    const handleNoOfPeople = (evt) => {
        setPeople(evt.target.value);
    }

    const handleReset = () => {
        setBill("");
        setCustomTip("");
        setIsTipBtnDisabled(true);
        setTip("");
        setTotal("");
        setHead("");
        setTipBtnIdx(-1);
        setPeople(0);
    }

    const handleTipBtnIndex = (index) => {
        setTipBtnIdx(index);
    }

    const getTip = () => {
        let ans = 0;
        if (tipBtnIdx !== -1 && !isCustomTip) {
            ans = Number(bill) * (parseInt(tips[tipBtnIdx]) / 100);
            setTip(tips[tipBtnIdx]); // Set the tip text
        } else if (tipBtnIdx === -1 && isCustomTip) {
            ans = Number(bill) * (Number(customTip) / 100);
            setTip(`${customTip}%`); // Set custom tip text
        }
        getTotal(ans);
        return ans;
    }

    const getTotal = (tipAmount) => {
        const totalAmt = Number(bill) + tipAmount;
        setTotal(totalAmt); // Set the total
        getHead(totalAmt);
    }

    const getHead = (totalAmt) => {
        if (people === 0) {
            setHead(totalAmt); // If no people, just show the total
        } else {
            const h1 = totalAmt / people;
            setHead(h1); // Set the per-person amount
        }
    }

    const handleSubmit = () => {
        getTip(); // Calculate tip and update total
    }

    return (
        <div className="main-class">
            <div className="bill-class">
                <Form>
                    <Form.Label>Bill</Form.Label>
                    <Form.Control type="text" placeholder="Enter the Bill" value={bill} onChange={handleBill}></Form.Control>
                    <Form.Label>Select Tip</Form.Label>
                    <div className="btn-grps">
                        {tips.map((tip, index) =>
                            <Button key={index} disabled={isTipBtnDisabled} onClick={() => handleTipBtnIndex(index)}>{tip}</Button>
                        )}
                    </div>
                    <Form.Control type="text" placeholder="Enter custom tip" className="column-gap" disabled={isTipBtnDisabled} value={customTip} onChange={handleCustomTip} />
                    <Form.Label className="column-gap">Number Of People</Form.Label>
                    <Form.Control type="text" placeholder="No of people" value={people} onChange={handleNoOfPeople} disabled={isTipBtnDisabled}></Form.Control>
                </Form>
            </div>
            <div className="output-class">
                <Form.Label>Tip: {tip}</Form.Label>
                <Form.Label>Total: {total}</Form.Label>
                <Form.Label>Each Person's Bill: {head}</Form.Label>
                <Button onClick={handleSubmit}>Generate Bill</Button>
                <Button onClick={handleReset}>Reset</Button>
            </div>
        </div>
    )
}

export default BillSplitter;
