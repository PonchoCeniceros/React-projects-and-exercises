import React from 'react';
const RouterContext = React.createContext('/');

class BrowserRouter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { href: '/' };
    }
    render() {
        const navigate = (to) => {
            this.setState({ href: to });
        };

        return (
            <RouterContext.Provider value={{ href: this.state.href, navigate }}>
                {this.props.children}
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
                />
            </RouterContext.Provider>
        );
    }
}
 
class Route extends React.Component {
    render() {
        if (this.context.href === this.props.path) {
            const C = this.props.component;
            return <C />
        }
        return null;
    }
}
Route.contextType = RouterContext;

class Link extends React.Component {
    render() {
        const onClick = () => {
            this.context.navigate(this.props.to);
        };
        
        return (
            <a className={this.props.className || ''} onClick={onClick}>
                {this.props.children}
            </a>
        );   
    }
}
Link.contextType = RouterContext;

export { Link, BrowserRouter, Route };