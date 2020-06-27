import React, { Component } from 'react';
import { Form, FormGroup, CustomInput } from 'reactstrap';

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filterIsOpenAddDisplayClass: false,
            magnitudeFilter: -1,
            timeFilter: null,
        }

        this.toggleFilter = this.toggleFilter.bind(this);
        this.magnitudeChangeHandler = this.magnitudeChangeHandler.bind(this);

    }


    toggleFilter() {
        this.setState({
            filterIsOpenAddDisplayClass: !this.state.filterIsOpenAddDisplayClass
        });
    }


    magnitudeChangeHandler(event) {
        // console.log("Filter Touch:", this.state.magnitudeFilter);
        this.setState({
            magnitudeFilter: event.target.value
        });
    }


    componentDidUpdate(prevProps, prevState) {   // This life cycle method is used to pass state data into parent component (App.js)
        if (this.state.magnitudeFilter !== prevState.magnitudeFilter) {
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
                    Filter
                </div>
                <div className={filter_sec_class_list.join(' ')}>
                    <Form>
                        <FormGroup>
                            <CustomInput type="radio" id="magGreaterThan0" name="mag" value={-1} label="All" checked={parseInt(this.state.magnitudeFilter, 10) === -1} onChange={this.magnitudeChangeHandler} />
                            <CustomInput type="radio" id="magGreaterThan3" name="mag" value={3.5} label="Maginitude > 3.5" checked={parseFloat(this.state.magnitudeFilter) === 3.5} onChange={this.magnitudeChangeHandler} />
                            <CustomInput type="radio" id="magGreaterThan6" name="mag" value={6} label="Maginitude > 6" checked={parseInt(this.state.magnitudeFilter, 10) === 6} onChange={this.magnitudeChangeHandler} />
                        </FormGroup>
                        <hr />
                    </Form>
                    <Form>
                        <FormGroup>
                            {/* <Label className="filter__header" for="exampleCheckbox">Filter</Label> */}
                            <CustomInput type="radio" id="last2days" name="customRadio" defaultChecked label="Last 30 Hours (≈ 2 days)" disabled />
                            {/* <CustomInput type="radio" id="last10days" name="customRadio" label="Last 10 days" disabled />
                            <CustomInput type="radio" id="last30days" name="customRadio" label="Last 30 days" disabled /> */}
                            <hr />
                            <p className="filter__sec__notice">*defaults to 'last 30 hours (≈ 2 days)' <br />*defaults to 'All' magnitude <br />📍 Earthquakes with &gt;6 magnitude</p>
                        </FormGroup>
                    </Form>
                </div>
            </>
        )
    }
}

export default Filter;