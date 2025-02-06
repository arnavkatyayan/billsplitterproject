import React from "react";
import {useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form,Button } from "react-bootstrap";
function BillSplitter() {

    const [bill, setBill] = useState("");
    const tips = ["5%", "10%", "15%", "20%", "25%","30%"];

    const handleBill = (evt)=> {
        setBill(evt.target.value);
    }
    return (
        <div className="main-class">
         <div className="bill-class">
            <Form>
            <Form.Label>Bill</Form.Label>
            <Form.Control type="text" placeholder="Enter the Bill" value={bill} onChange={handleBill}></Form.Control>
            <Form.Label>Select Tip</Form.Label>
            <div className="btn-grps">
            {tips.map((tip)=> 
            <Button>{tip}</Button> 
            
            )}
            
            </div>
            </Form>
            </div>   
        <div className="output-class">
            
        </div>  
        </div>
    )
}
export default BillSplitter;