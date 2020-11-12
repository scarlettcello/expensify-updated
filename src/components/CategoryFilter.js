import React from 'react'
import { connect } from 'react-redux';
import { Multiselect } from 'multiselect-react-dropdown';
import { setCategoryFilter } from '../actions/filters';

export class CategoryFilter extends React.Component {
  state = {
    options: [
      { id: 1, category: 'Beauty' },
      { id: 2, category: 'Clothes' },
      { id: 3, category: 'Communication' },
      { id: 4, category: 'Education' },
      { id: 5, category: 'Food' },
      { id: 6, category: 'Gift' },
      { id: 7, category: 'Housing' },
      { id: 8, category: 'Investment' },
      { id: 9, category: 'Leisure' },      
      { id: 10, category: 'Medical' },      
      { id: 11, category: 'Miscellaneous' },
      { id: 12, category: 'Tax' },
      { id: 13, category: 'Transportation' },
      { id: 14, category: 'Utility Bills'}
    ]
  };

  onSelect = (selectedList) => {
    this.props.setCategoryFilter(selectedList);
  }

  onRemove = (selectedList) => {
    this.props.setCategoryFilter(selectedList);
  }

  render() {
    return(
      <div className="content-container">          
        <div className="input-group">
          <Multiselect
            options={this.state.options}
            selectedValues={this.state.selectedValue}
            onSelect={this.onSelect}
            onRemove={this.onRemove}
            displayValue="category"
            placeholder="Filter by category"
            showCheckbox={true}
            closeIcon="circle"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.filters
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCategoryFilter: (categories) => dispatch(setCategoryFilter(categories))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilter);