import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    bindActionCreators
} from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as toastr from 'toastr';
import { getMultipleCitiesCurrentWeather, updateSelectedLocations } from '../actions/weatherAction';

class ForecastList extends Component {
    constructor() {
        super();
        this.state = {
            selected: []
        };
    }

    getData = () => {
        this.props.weatherAction.getMultipleCitiesCurrentWeather();
    };

    componentWillMount() {
        this.getData();
    }

    handleSelectAllClick = event => {
        if (event.target.checked) {
            let ids = this.props.result.map(n => n.id);
            this.setState({ selected: ids });
            return;
        }
        this.setState({ selected: [] });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    onShowMapViewClick = () => {
        let selected = this.state.selected;
        let selectedList = [];
        if (selected.length > 0) {
            let item;
            selected.forEach(e => {
                item = this.props.result.filter(l => l.id === e)[0];
                selectedList.push(item);
            });

            this.props.weatherAction.updateSelectedLocations(selectedList);
            this.props.history.replace('/map/1');
        }
        else {
            toastr.error('Please select at least one location');
        }
    };

    render() {

        let rowCount = this.props.result ? this.props.result.length : 0;

        let tableBody =
            this.props.result ? this.props.result.map(row => (
                <TableRow key={row.id} role="checkbox" onClick={event => this.handleClick(event, row.id)}>
                    <TableCell padding="checkbox">
                        <Checkbox checked={this.isSelected(row.id)} />
                    </TableCell>
                    <TableCell>
                        {row.name}
                    </TableCell>
                    <TableCell>{row.main.temp} F</TableCell>
                    <TableCell>{row.main.temp_min} F - {row.main.temp_max} F</TableCell>
                    <TableCell padding={'default'}>{row.wind.speed} mph</TableCell>
                </TableRow>
            )) : null;

        return (
            <div>
                <Container className='mt-20'>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Table padding={'none'} className="table table-bordered table-hover">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={this.state.selected.length > 0 && this.state.selected.length < rowCount}
                                                checked={this.state.selected.length === rowCount}
                                                onChange={this.handleSelectAllClick}
                                            />
                                        </TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>Current temperature</TableCell>
                                        <TableCell>Temperature Range</TableCell>
                                        <TableCell padding={'default'}>Wind speed</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableBody}
                                </TableBody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Button variant="primary" onClick={this.onShowMapViewClick}>Map View</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        result: state.weatherReducer.result
    }
}

function mapDispatchToProps(dispatch) {
    return {
        weatherAction: bindActionCreators({ getMultipleCitiesCurrentWeather, updateSelectedLocations }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForecastList);