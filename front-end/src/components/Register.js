import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.registerSubmit(this.state);
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <input
                        onChange={this.handleInputChange}
                        placeholder="username"
                        value={this.state.username}
                        name="username"
                    />
                    <input
                        onChange={this.handleInputChange}
                        placeholder="password"
                        value={this.state.password}
                        name="password"
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    };
};

export default Register;