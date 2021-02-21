import React, { Component } from 'react';
import { Form, FormGroup, CustomInput } from 'reactstrap';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterIsOpenAddDisplayClass: false,
            magnitudeFilter: -1,
            timeFilter: 0,
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.magnitudeChangeHandler = this.magnitudeChangeHandler.bind(this);
        this.timeChangeHandler = this.timeChangeHandler.bind(this);
    }

    toggleFilter() {
        this.setState({
            filterIsOpenAddDisplayClass: !this.state.filterIsOpenAddDisplayClass
        });
    }

    magnitudeChangeHandler(event) {
        this.setState({
            magnitudeFilter: event.target.value
        });
    }

    timeChangeHandler(event) {
        this.setState({
            timeFilter: event.target.value
        });
    }

    componentDidUpdate(prevProps, prevState) {   // This life cycle method is used to pass state data into parent component (App.js)
        if (this.state.magnitudeFilter !== prevState.magnitudeFilter) {
            this.props.fetchFilterData(this.state);
        } else if (this.state.timeFilter !== prevState.timeFilter) {
            this.props.fetchFilterData(this.state);
        }
    }


    render() {

        let filter_sec_class_list = ["filter_sec"];
        if (!this.state.filterIsOpenAddDisplayClass) {
            filter_sec_class_list.push('display_none');
        }

        // console.log("gives mag in string (got to convert it into Int)", this.state.magnitudeFilter);

        return (
            <>
                <div className="toggle__filter" onClick={this.toggleFilter}>
                    Filters
                </div>
                <div className={filter_sec_class_list.join(' ')}>
                    <Form>
                        <FormGroup>
                            <CustomInput type="radio" id="magGreaterThan0" name="mag" value={-1} label="All" checked={parseInt(this.state.magnitudeFilter, 10) === -1} onChange={this.magnitudeChangeHandler} />
                            <CustomInput type="radio" id="magGreaterThan3" name="mag" value={3.5} label="Magnitude &#8805; 3.5" checked={parseFloat(this.state.magnitudeFilter) === 3.5} onChange={this.magnitudeChangeHandler} />
                            <CustomInput type="radio" id="magGreaterThan6" name="mag" value={6} label="Magnitude &#8805; 6" checked={parseInt(this.state.magnitudeFilter, 10) === 6} onChange={this.magnitudeChangeHandler} />
                        </FormGroup>
                        <hr />
                    </Form>
                    <Form>
                        <FormGroup>
                            <CustomInput type="radio" id="last2days" name="timefilter" value={0} label="Last 30 Hours" checked={parseInt(this.state.timeFilter, 10) === 0} onChange={this.timeChangeHandler} />
                            <CustomInput type="radio" id="lasthour" name="timefilter" value={3600000} label="Last Hour" checked={parseInt(this.state.timeFilter, 10) === 3600000} onChange={this.timeChangeHandler} />
                            <hr />
                            <p className="filter__sec__notice">*Defaults to 'Last 30 Hours'. <br />*Defaults to 'All' magnitude. <br />&#128308; Earthquakes with &#8805; 6 magnitude. <br/> &#128992; Earthquakes with &#8805; 4 and &#60; 6 magnitude. <br/> &#128309; Earthquakes with &#60; 4 magnitude.</p>
                        </FormGroup>
                    </Form>
                </div>
            </>
        )
    }
}


export default Filter;