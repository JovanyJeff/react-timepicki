import React from "react";
import "./ReactTimePicki.css";

class ReactTimePicki extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPicker : false,
			currentDate:  new Date(),
			meridian: "AM",
			time: {
				hr: this,
				//min: this.state.currentDate.getMinutes()
			},
			value : this.props.value ? this.props.value : '' 
		};
		this.timePickiClickHandler = this.timePickiClickHandler.bind(this);
		this.setValueClickHandler = this.setValueClickHandler.bind(this);
	}

	timePickiClickHandler() {
		const  showPicker = this.state.showPicker;
		if(showPicker) {
			return;
		}
		else {

		}
		const currentDate = new Date();
		let currentHours = currentDate.getHours();
		let meridian = "AM";
		if(this.props.timeFormat && this.props.timeFormat === "12") {
			meridian = (Math.floor(currentHours / 12) === 1) ? "PM" : "AM";
			currentHours = currentHours % 12;
			currentHours = ( currentHours === 0 ) ? 12 : currentHours;
		}
		this.setState({
			showPicker : true,
			currentHours: currentHours,
			currentMinutes: currentDate.getMinutes(),
			meridian: meridian
		});
	}

	valueChangeHours(e) {
		let currentHours = e.target.value.replace(/[^0-9.]/g, '');
		let meridian = "AM";
		if( this.props.timeFormat === "12" && 12 < currentHours ) {
			meridian = (Math.floor(currentHours / 12) === 1) ? "PM" : "AM";
			currentHours = 12;
		}
		else if( this.props.timeFormat === "24" && 23 < currentHours ) {
			currentHours = 23;
		}
		else {
			//("0"+currentHours).split(-2)
		}
		this.setState({ currentHours, meridian});
	}

	valueChangeMinutes(e) {
		let currentMinutes = e.target.value.replace(/[^0-9.]/g, '');
		if( 59 < currentMinutes ) {
			currentMinutes = 59;
		}
		this.setState({ currentMinutes});
	}

	setValueClickHandler() {
		let setTime = "";
		if( this.props.timeFormat === "12" ) {
			setTime = ("0"+this.state.currentHours).slice(-2) + " : " + ("0"+this.state.currentMinutes).slice(-2) + " : " + this.state.meridian;
		}
		else {
			setTime = ("0"+this.state.currentHours).slice(-2) + " : " + ("0"+this.state.currentMinutes).slice(-2) ;
		}
		this.setState({ value: setTime, showPicker: false});
	}

	resetValueClickHandler() {
		this.setState({ value: ""});
	}

	closeClickHandler() {
		this.setState({ showPicker: false});
	}

	arrowClickHandler(field, direction, e) {
		if( field === 'hour' && direction === "up" ){
			if( (this.props.timeFormat === "24" && this.state.currentHours < 24)  || (this.props.timeFormat === "12" && this.state.currentHours < 12) ) {
				this.setState({ currentHours : this.state.currentHours+1 });
			}
			else if( this.props.timeFormat === "24" && 23 < this.state.currentHours ) {
				this.setState({ currentHours : 0 });
			}
			else if (this.props.timeFormat === "12" && 12 <= this.state.currentHours ) {
				this.setState({ currentHours : 1 });
			}
			
		}
		else if( field === 'hour' && direction === "down" ) {
			if( this.state.currentHours !== 0 && ( ( this.props.timeFormat === "12" && this.state.currentHours !== 1 ) || this.props.timeFormat === "24" ) ) {
				this.setState({ currentHours : this.state.currentHours-1 });
			}
			else if( this.props.timeFormat === "24" && this.state.currentHours === 0 ) {
				this.setState({ currentHours : 23 });
			}
			else if( this.props.timeFormat === "12" && this.state.currentHours === 0 ) {
				this.setState({ currentHours : 12 });
			}
			else {
				this.setState({ currentHours : 12 });
			}
		}
		else if( field === 'min' && direction === "up" ) {
			if(this.state.currentMinutes < 59) {
				this.setState({ currentMinutes : this.state.currentMinutes+1 });	
			}
			else {
				this.setState({ currentMinutes : 0 });
			}
		}
		else if( field === 'min' && direction === "down" ){
			if(this.state.currentMinutes !== 0) {
				this.setState({ currentMinutes : this.state.currentMinutes-1 });
			}
			else {
				this.setState({ currentMinutes : 59 });
			}
		}
		else if( field === 'meri' && (direction === "down" || direction === "up") ){
			const meridian = this.state.meridian === 'AM' ? 'PM' : 'AM';
			 this.setState({ meridian});
		}
	}

	renderTimepicki() {
		if(this.state.showPicker) {
			return(
				<div className={"timepicki-container"}>
					<div className={"timepicki-input-wrap"}>
						<span className={"timepicki-arrow up-arrow"} onClick={this.arrowClickHandler.bind(this, "hour", "up")}></span>
						<span>
							<input className={"timepicki-input"} type="text" maxLength="2" onChange={this.valueChangeHours.bind(this)} value={this.state.currentHours} name=""/>
						</span>
						<span className={"timepicki-arrow down-arrow"} onClick={this.arrowClickHandler.bind(this, "hour", "down")}></span>
					</div>
					<div className={"timepicki-input-wrap"}>
						<span className={"timepicki-arrow up-arrow"} onClick={this.arrowClickHandler.bind(this, "min", "up")}></span>
						<span>
							<input className={"timepicki-input"} type="text" maxLength="2" onChange={this.valueChangeMinutes.bind(this)} value={this.state.currentMinutes} name=""/>
						</span>
						<span className={"timepicki-arrow down-arrow"} onClick={this.arrowClickHandler.bind(this, "min", "down")}></span>
					</div>
					{this.renderMeridian()}
					<div className={"timepicki-button-container"}>
						<button className={"timepicki-button timepicki-done-button"} onClick={this.setValueClickHandler.bind(this)}>Done</button>
						<button className={"timepicki-button timepicki-reset-button"} onClick={this.resetValueClickHandler.bind(this)}>Reset</button>
						<button className={"timepicki-button timepicki-cancel-button"} onClick={this.closeClickHandler.bind(this)}>Cancel</button>
					</div>
				</div>
			);
		}
		else {
			return null;
		}
	}

	renderMeridian() {
		if(this.props.timeFormat === "12" ) {
			return (<div className={"timepicki-input-wrap"}>
				<span className={"timepicki-arrow up-arrow"} onClick={this.arrowClickHandler.bind(this, "meri", "up")}></span>
				<span>
					<input className={"timepicki-input"} type="text" maxLength="2" name="" value={this.state.meridian} readOnly />
				</span>
				<span className={"timepicki-arrow down-arrow"} onClick={this.arrowClickHandler.bind(this, "meri", "down")}></span>
			</div>);				
		}
		else return null;
	}

	render() {
		return (
			<div className={"input-wrapper"}>
				<input type="text" onClick={this.timePickiClickHandler} value={this.state.value} placeholder={this.props.placeholder} onChange={ e => this.props.onChange && this.props.onChange(e.target.value)} />
				{this.renderTimepicki()}
			</div>
		);
	}
}

export default ReactTimePicki;