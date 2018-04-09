import React from 'react';
import ReactDOM from 'react-dom';
import './Layout.css';
import customData from './data.json';
import Schedule from './Schedule';

let timeSlot=["9:00 AM",'9:30','10:00 AM','10 30','11:00 AM','11:30','12:00 PM','12:30','1:00 PM','1:30','2:00 PM','2:30','3:00 PM','3:30','4:00 PM','4:30','5:00 PM','5:30','6:00 PM','6:30','7:00 PM','7:30','8:00 PM','8:30','9:00 PM']
console.log(customData);
class Layout extends React.Component{
	
	render(){
		return(
			<div>
			{timeSlot.map((eachSlot,i)=> <div class="container"><span id={i} class="time">{eachSlot}</span><div class="parent-container"><div></div></div></div>)}
			<Schedule timeSlotProp={timeSlot} jsonDataProp={customData}/>
			</div>
		)
	}
}
export default Layout;