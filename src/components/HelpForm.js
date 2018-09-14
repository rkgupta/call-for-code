import React from 'react';
import { Container, Row, Col, Input, Button, Card, CardBody, Select, SelectInput, SelectOptions, SelectOption } from 'mdbreact';
import { ROLE_VOLUNTEER, ROLE_SEEKER } from './Constants';
import axios from 'axios';

class HelpForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchInProgress: false,
            name: null,
            role: null,
            age: null,
            gender: 'M',
            phone: null,
            organization: null,
            help: {
                food: false,
                clothing: false,
                medicine: false,
                evacuation: false
            }
        }
    }

    onSubmit = () => {
        this.setState({ searchInProgress: true });
        axios.post('/api/help', {
            ...this.state
        }).then((response) => {
            this.setState({ searchInProgress: false });
            // Navigate to search result page or not found page
            const res = response.data;
            if (res.data.records.length === 0) {
                this.props.history.push({ pathname: '/error' });
            } else {
                this.props.history.push({
                    pathname: '/helpmap',
                    state: {
                        marker: {...this.state}
                    }
                });
            }

        })
            .catch(error => {
                this.setState({ searchInProgress: false });
                this.props.history.push({ pathname: '/error' });
            });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value});
    }

    handleHelpRadioChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ help: { ...this.state.help, [name]: value } });

    }

    componentDidMount() {
        console.log(this.props.location.search);
        let param = this.props.location.search;
        let isSeeker = param.indexOf('seeker') > -1;
        this.setState({ role: (isSeeker) ? ROLE_SEEKER : ROLE_VOLUNTEER });
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-center">
                    <Col md="6">
                        <Card>
                            <CardBody>
                                {
                                    this.state.role === ROLE_SEEKER &&

                                    <form>
                                        <p className="h5 text-center mb-4">Enter your Details</p>
                                        <div className="grey-text">
                                            <Input name="name" label="Your name" icon="user" group type="text" validate error="wrong" success="right" value={this.state.name} onChange={this.handleInputChange}/>
                                            <Input name="age" label="Your age" icon="user" group type="text" validate error="wrong" success="right" value={this.state.age} onChange={this.handleInputChange}/>
                                            <label>Gender</label>
                                            <select name="gender" value={this.state.gender} onChange={this.handleInputChange} className="mdb-select md-form help-select">
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                                <option value="O">Other</option>
                                            </select>


                                            <Input name="phone" label="Your phone no" icon="phone" group type="text" validate error="wrong" success="right" value={this.state.phone} onChange={this.handleInputChange}/>
                                            <p>What help do you need</p>
                                            <div>
                                                <p><label>
                                                    Food
                                                    <input
                                                        name="food"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.food}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Clothing
                                                    <input
                                                        name="clothing"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.clothing}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Medicine
                                                    <input
                                                        name="medicine"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.medicine}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Evacuation
                                                    <input
                                                        name="evacuation"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.evacuation}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Button color="danger" on-click={this.onSubmit}>Submit</Button>
                                        </div>
                                    </form>
                                }
                                {
                                    this.state.role === ROLE_VOLUNTEER &&
                                    <form>
                                        <p className="h5 text-center mb-4">Enter your Details</p>
                                        <div className="grey-text">
                                            <Input name="name" label="Your name" icon="user" group type="text" validate error="wrong" success="right" value={this.state.name} onChange={this.handleInputChange}/>
                                            <Input name="age" label="Your age" icon="user" group type="text" validate error="wrong" success="right" value={this.state.age} onChange={this.handleInputChange}/>
                                            <Input name="organization" label="Your organization" icon="user" group type="text" validate error="wrong" success="right" value={this.state.organization} onChange={this.handleInputChange}/>
                                            <Input name="phone" label="Your phone no" icon="phone" group type="text" validate error="wrong" success="right" value={this.state.phone} onChange={this.handleInputChange}/>
                                            <p>What help do you need</p>
                                            <div>
                                                <p><label>
                                                    Food
                                                    <input
                                                        name="food"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.food}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Clothing
                                                    <input
                                                        name="clothing"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.clothing}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Medicine
                                                    <input
                                                        name="medicine"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.medicine}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                                <p><label>
                                                    Evacuation
                                                    <input
                                                        name="evacuation"
                                                        type="checkbox"
                                                        className="help-checkbox"
                                                        checked={this.state.help.evacuation}
                                                        onChange={this.handleHelpRadioChange} />
                                                </label></p>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <Button color="default" onClick={this.onSubmit}>Submit</Button>
                                        </div>
                                    </form>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default HelpForm;