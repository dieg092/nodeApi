import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConditionsContent from '../containers/ConditionsContent';

class ModalConditions extends Component {
  onCloseModal() {
    this.props.closeModal('modal-conditions');
  }

  render() {
    return (
      <div id="conditions">
        <div id="modal-conditions" className="modal container-body">
          <i  onClick={this.onCloseModal.bind(this)} className="material-icons left grey-text text-darken-3 pointer close-icon">clear</i>
          <p className="margin-bottom-0 font-35-custom margin-top-0 center modal-title margin-bottom-30">{this.props && this.props.fields && this.props.fields.CONDITIONS && this.props.fields.CONDITIONS.title}</p>
          <div className="modal-content padding-top-0">
              <ConditionsContent />
          </div>
        </div>
      </div>
    );
  };
};

function mapStateToProps( general ) {
    const { fields } = general;
    return { fields };
}


export default connect(mapStateToProps, actions)(ModalConditions);
