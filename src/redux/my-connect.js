import {StoreContext} from './my-provider';
import React from 'react';

const MyConnect = (mapStateToProps,mapDispatchToProps)  => Component => {
    class Connected extends React.Component{
        constructor(props){
            super(props);
            this.state={};
        }
        onStateOrPropsChange(props){
            const {store} = this.context;
            const newStateProps = mapStateToProps(store.getState(),props);
            const newDispatchProps = mapDispatchToProps(store.dispatch,props);
            this.setState({
                ...newStateProps,
                ...newDispatchProps
            });   
        }

        componentDidMount(){
            const {store} = this.context;
            this.onStateOrPropsChange(this.props);
            this.unsubscribe = store.subscribe(()=>{
                this.onStateOrPropsChange(this.props);
            });
        }

        componentWillUnmount(){
            this.unsubscribe && this.unsubscribe();
        }
        render(){
            return (
                <Component {...this.props} {...this.state}></Component>
            )
        }
    }
    Connected.contextType = StoreContext;
    return Connected;
    
}
export default MyConnect;



