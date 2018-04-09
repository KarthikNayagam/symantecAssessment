import React from 'react';
import ReactDOM from 'react-dom';
import './Layout.css';
import $  from 'jquery';
class Schedule extends React.Component{
	constructor(props){
	super(props);
	this.addMeridian=this.addMeridian.bind(this);
	this.setSchedule=this.setSchedule.bind(this);
	this.splitSchedule=this.splitSchedule.bind(this);
	}
	render(){	
		return true;
	}
	//Will be called once the component is mounted to the DOM
	componentDidMount() {
    let slotArray=this.props.timeSlotProp;
		let dataArray=this.props.jsonDataProp.schedule;
		dataArray.map((data)=>{ 
			let currentTime=data.time.split(":");
			var minutesFlag=false;
			let getData= this.addMeridian(currentTime,data,minutesFlag);
			let index=slotArray.indexOf(getData.time);
			this.setSchedule(getData,index);
		})
	}
	//Add meridian to each schedule and compare to the slotArray
	addMeridian(currentTime,data,minutesFlag){
		if(currentTime[1]!='00'){
				minutesFlag=true;
			}
			if(currentTime[0] >=12){
				currentTime[0] = currentTime[0] % 12;
				if(currentTime[0]==0){
					data.time=data.time+" ";
				}
				else{
					data.time=currentTime[0]+":"+currentTime[1]+" ";
				}
				if(!minutesFlag){
				data.time=data.time+"PM";
				}
			}
			else{
				if(!minutesFlag){
				data.time =data.time+" "+"AM";
				}
			}
			data.time=data.time.trim();
			return data;
	}
	//sets schedule based on the time and duration
	setSchedule(getData,index){
		let innerNode=document.getElementById(index);
		console.log(innerNode);
		let siblingNode=innerNode.nextSibling;
		var childNode=siblingNode.children[0];
		childNode.classList.add("scheduled");
		childNode.innerText=getData.description;
		childNode.style.height= '30px';
		let leftOutDuration;
		if(getData.duration>30){
			leftOutDuration=getData.duration - 30 ;
			leftOutDuration=30+leftOutDuration;
			childNode.style.height=leftOutDuration+'px';
		}
		this.splitSchedule(getData,index);
	}
	// splits schedule if it is an overlapping scenario
	splitSchedule(getData,index){	
		let innerNode=document.getElementById(index);
		if($(innerNode).parent().prev().find('.scheduled').length !=0){
			debugger;
			let previousScheduledParent=$(innerNode).parent().prev().find('.scheduled');
			let splitWidth=previousScheduledParent.width()/2;
			let currentNode=$(innerNode).parent().find('.scheduled');
			if(!previousScheduledParent.hasClass("mr-lt")){
				currentNode.css("width",splitWidth);
				currentNode.addClass("mr-lt");
				previousScheduledParent.css("width",splitWidth);
			}
			else{
				let splitWidth=$('.scheduled').width()/2;
				currentNode.css("width",splitWidth);
			}
		}
	}
}

export default Schedule;