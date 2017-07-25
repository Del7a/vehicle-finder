import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditModelForm from '../../components/model/edit-form';
import { bindActionCreators } from 'redux';
import { requestSingleMaker, modelFormChanged,formChanged, requestSingleUpdateMaker,
        createSingleModel } from '../../actions/maker';
import { Link } from 'react-router-dom';



class SingleModel extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formInputChanged = this.formInputChanged.bind(this);
        this.state = { makerName:'', modelName: '' }
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.requestSingleMaker(this.props.match.params.id)
        }
        if(this.props.match.params.makerId) {
            this.props.formChanged(this.props.match.params.makerId)
        }
        
        let makerId = this.props.match.params.makerId
        let curretMaker = this.props.maker.makers.filter(function(el){
            return el._id === makerId
        });

        if(curretMaker.length) {
            debugger
            let modelId = this.props.match.params.modelId;
            let currentModelName = curretMaker[0].models.filter(function(el){
                return el._id === modelId
            })

            if(currentModelName.length) {
                this.setState({ makerName: curretMaker[0].name,
                        modelName: currentModelName[0].name} )
                this.formInputChanged({currentModelName: currentModelName[0].name})
            }
        }
    }

    handleSubmit(ev) {
        ev.preventDefault();
        console.log(this.props.maker)
        if(this.props.match.params.modelId !== '0') {
            this.props.requestSingleUpdateMaker(this.props.maker.currentMaker);
        } else {
            this.props.createSingleModel(this.props.match.params.makerId,
                this.props.maker.currentModelName);
        }
    }

    formInputChanged(newFormState) {
        this.props.modelFormChanged(newFormState);
    }


    render(){
        // const redirAfterLogin = this.props.user.isLoggedIn ? 
        //    <Redirect to={'/home'}/>
        // : '';

        // const ErrorMessage = this.props.maker.currentErrorMessage ? 
 
        //     <div className="alert alert-danger">
        //         <strong>Danger!</strong> {this.props.maker.currentErrorMessage}
        //     </div>
        //     : "";

        // const InfoMessage = this.props.maker.currentInfoMessage ? 

        //     <div className="alert alert-warning">
        //         <strong>Warning!</strong> {this.props.maker.currentInfoMessage}
        //     </div>
        //     : "";
       

        const form = this.props.maker.isFetching ?
            <div> Носи се! </div>
            :
            <EditModelForm
                currentModelName={this.props.maker.currentModelName}
                currentModelId={this.props.match.params.makerId}
                formInputChanged={this.formInputChanged}
                handleSubmit={this.handleSubmit} />

    return(
        <div>
            <h1>Sigle model</h1>
             {/* <h1>{ErrorMessage}</h1> 
             <h1>{InfoMessage}</h1>  */}
            <div>{form}</div>
        </div>
    )}
    
}

function mapStateToProps({maker}) {
    console.log(maker)
    return {maker};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({modelFormChanged, formChanged, requestSingleMaker,
         requestSingleUpdateMaker, createSingleModel}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleModel);